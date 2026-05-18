import logging
import pandas as pd
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.field_order import FIELD_ORDER
from app.services.model_service import load_model
from app.services.shap_service import compute_shap_values
from app.schemas.predict import PredictionRequest, PredictionResponse
from app.models.prediction import Prediction

logger = logging.getLogger(__name__)

# ── Per-disease calibrated thresholds ────────────────────────────────
# These are tuned based on actual model probability distributions
# Diabetes GB model clusters 0.35–0.65, rarely exceeds 0.70
# Liver RF model is biased high due to 416:167 class imbalance
RISK_THRESHOLDS = {
    "Diabetes": {"high": 0.55, "medium": 0.35},
    "Heart":    {"high": 0.65, "medium": 0.40},
    "Kidney":   {"high": 0.65, "medium": 0.40},
    "Liver":    {"high": 0.60, "medium": 0.38},
}

def get_risk_level(disease: str, prob: float) -> str:
    thresholds = RISK_THRESHOLDS.get(
        disease, {"high": 0.70, "medium": 0.40}
    )
    if prob >= thresholds["high"]:
        return "High"
    elif prob >= thresholds["medium"]:
        return "Medium"
    else:
        return "Low"

def get_risk_label(disease: str, risk_level: str) -> str:
    labels = {
        "High":   f"High {disease} Risk Detected",
        "Medium": f"Moderate {disease} Risk Detected",
        "Low":    f"Low {disease} Risk Detected",
    }
    return labels.get(risk_level, f"{risk_level} Risk")

async def run_prediction(
    request: PredictionRequest,
    db: AsyncSession,
    user_id,
) -> PredictionResponse:

    disease  = request.disease
    features = request.features

    # ── 1. Build ordered DataFrame ────────────────────────────────────
    ordered_fields = FIELD_ORDER[disease]

    # Validate all required fields present
    missing = [f for f in ordered_fields if f not in features]
    if missing:
        raise ValueError(f"Missing required fields for {disease}: {missing}")

    input_df = pd.DataFrame(
        [{field: features[field] for field in ordered_fields}]
    )

    # ── 2. Load cached model ──────────────────────────────────────────
    model = load_model(disease)

    # ── 3. Get probability (NOT binary predict) ───────────────────────
    # Always use predict_proba for confidence — never rely on predict()
    # predict() uses 0.5 threshold internally which is wrong for
    # imbalanced datasets like Liver (416:167 ratio)
    if hasattr(model, "predict_proba"):
        proba      = model.predict_proba(input_df)[0]
        confidence = round(float(proba[1]), 4)
        prediction = 1 if confidence >= 0.5 else 0
    else:
        # Fallback for models without predict_proba (rare)
        prediction = int(model.predict(input_df)[0])
        confidence = 1.0 if prediction == 1 else 0.0

    # ── 4. Risk level from calibrated per-disease thresholds ──────────
    risk_level = get_risk_level(disease, confidence)
    risk_label = get_risk_label(disease, risk_level)

    logger.info(
        f"Prediction: disease={disease} "
        f"prob={confidence:.4f} "
        f"risk={risk_level}"
    )

    # ── 5. SHAP (optional — never block prediction if it fails) ───────
    shap_vals: dict[str, float] | None       = None
    top_risk_factors: list[dict] | None      = None
    try:
        shap_vals, top_risk_factors = compute_shap_values(
            model, input_df, ordered_fields
        )
    except Exception as e:
        logger.warning(f"SHAP failed for {disease}: {e}")

    # ── 6. Save to DB (only if user is logged in) ─────────────────────
    prediction_id = None
    if user_id is not None:
        try:
            record = Prediction(
                user_id    = user_id,
                disease    = disease,
                risk_level = risk_level,
                probability= confidence,
                inputs     = features,
            )
            db.add(record)
            await db.commit()
            await db.refresh(record)
            prediction_id = str(record.id)
            logger.info(
                f"Saved prediction {record.id} for user {user_id}"
            )
        except Exception as e:
            await db.rollback()
            logger.error(f"Failed to save prediction: {e}")
    else:
        logger.info(
            f"Anonymous prediction — not saved to DB"
        )

    # ── 7. Return response ────────────────────────────────────────────
    return PredictionResponse(
        disease              = disease,
        prediction           = prediction,
        prediction_label     = "Positive" if prediction == 1 else "Negative",
        risk_level           = risk_level,
        risk_label           = risk_label,
        confidence           = confidence,
        confidence_percent   = f"{confidence * 100:.1f}%",
        input_features       = features,
        shap_values          = shap_vals,
        top_risk_factors     = top_risk_factors,
        prediction_id        = prediction_id,
        saved                = prediction_id is not None,
    )