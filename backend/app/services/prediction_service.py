import logging
import numpy as np
import pandas as pd
from sqlalchemy.ext.asyncio import AsyncSession

from app.config.field_order import FIELD_ORDER
from app.services.model_service import load_model
from app.schemas.predict import PredictionRequest, PredictionResponse
from app.models.prediction import Prediction

logger = logging.getLogger(__name__)

# ── Per-disease calibrated thresholds ─────────────────────────────────
RISK_THRESHOLDS = {
    "Diabetes": {"high": 0.55, "medium": 0.35},
    "Heart":    {"high": 0.65, "medium": 0.40},
    "Kidney":   {"high": 0.65, "medium": 0.40},
    "Liver":    {"high": 0.60, "medium": 0.38},
}

def get_risk_level(disease: str, prob: float) -> str:
    t = RISK_THRESHOLDS.get(disease, {"high": 0.70, "medium": 0.40})
    if prob >= t["high"]:
        return "High"
    elif prob >= t["medium"]:
        return "Medium"
    return "Low"

def get_risk_label(disease: str, risk: str) -> str:
    return {
        "High":   f"High {disease} Risk Detected",
        "Medium": f"Moderate {disease} Risk Detected",
        "Low":    f"Low {disease} Risk Detected",
    }.get(risk, f"{risk} Risk")

def get_clinical_insight(disease: str, risk: str) -> str:
    insights = {
        ("Diabetes", "High"):   "Glucose and BMI levels suggest high diabetes risk. Immediate consultation recommended.",
        ("Diabetes", "Medium"): "Some indicators are elevated. Monitor glucose levels and maintain healthy weight.",
        ("Diabetes", "Low"):    "Values appear within normal range. Continue healthy lifestyle.",
        ("Heart", "High"):      "Cardiac markers indicate elevated cardiovascular risk. Consult a cardiologist.",
        ("Heart", "Medium"):    "Some cardiac risk factors present. Regular monitoring advised.",
        ("Heart", "Low"):       "Cardiovascular indicators look healthy. Maintain current lifestyle.",
        ("Kidney", "High"):     "Renal markers suggest kidney dysfunction. Nephrology referral recommended.",
        ("Kidney", "Medium"):   "Some kidney function markers are borderline. Follow-up testing advised.",
        ("Kidney", "Low"):      "Kidney function indicators appear normal.",
        ("Liver", "High"):      "Liver enzyme levels suggest hepatic stress. Hepatology consultation recommended.",
        ("Liver", "Medium"):    "Some liver markers are elevated. Avoid alcohol and monitor enzyme levels.",
        ("Liver", "Low"):       "Liver function indicators appear within normal range.",
    }
    return insights.get(
        (disease, risk),
        "Please consult a qualified healthcare professional."
    )

def compute_top_shap(pipeline, input_df, feature_names, top_n=5):
    """
    Extract top SHAP factors from the saved pkl pipeline.
    Always uses pipeline's own clf and scaler — no retraining.
    Returns list of dicts with feature, value, impact, direction.
    """
    try:
        import shap

        clf    = pipeline.named_steps["clf"]
        scaler = pipeline.named_steps["scaler"]

        # Transform using the pkl's scaler
        X_scaled = scaler.transform(input_df)

        # Compute SHAP on pkl's classifier
        explainer   = shap.TreeExplainer(clf)
        shap_values = explainer.shap_values(X_scaled)

        # Normalise to 2D for class 1
        if isinstance(shap_values, list):
            sv = shap_values[1]
        elif isinstance(shap_values, np.ndarray) and shap_values.ndim == 3:
            sv = shap_values[:, :, 1]
        else:
            sv = shap_values

        # sv shape: (1, n_features) for single sample
        shap_row = sv[0]

        # Build sorted top factors
        indexed = sorted(
            enumerate(shap_row),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:top_n]

        top_factors = []
        raw_values  = input_df.iloc[0].to_dict()

        for idx, shap_val in indexed:
            fname = feature_names[idx]
            top_factors.append({
                "feature":    fname,
                "value":      raw_values.get(fname, "N/A"),
                "shap_value": round(float(shap_val), 4),
                "abs_impact": round(abs(float(shap_val)), 4),
                "impact":     "increases risk" if shap_val > 0 else "decreases risk",
                "direction":  "risk" if shap_val > 0 else "safety",
            })

        shap_dict = {
            feature_names[i]: round(float(shap_row[i]), 4)
            for i in range(len(feature_names))
        }

        return shap_dict, top_factors

    except Exception as e:
        logger.warning(f"SHAP computation failed: {e}")
        return None, None


async def run_prediction(
    request: PredictionRequest,
    db: AsyncSession,
    user_id,
) -> PredictionResponse:

    disease  = request.disease
    features = request.features

    # ── 1. Build ordered DataFrame ─────────────────────────────────
    ordered_fields = FIELD_ORDER[disease]
    input_df = pd.DataFrame(
        [{field: features[field] for field in ordered_fields}]
    )

    # ── 2. Load the full saved pkl pipeline ────────────────────────
    pipeline = load_model(disease)

    # ── 3. Predict using FULL pipeline (not extracted steps) ───────
    # ImbPipeline skips SMOTE at predict time automatically
    # Scaler and clf are applied in correct order
    proba      = pipeline.predict_proba(input_df)[0]
    confidence = round(float(proba[1]), 4)
    prediction = 1 if confidence >= 0.50 else 0

    logger.info(
        f"[{disease}] prob={confidence:.4f} "
        f"pred={prediction}"
    )

    # ── 4. Risk level via calibrated thresholds ────────────────────
    risk_level    = get_risk_level(disease, confidence)
    risk_label    = get_risk_label(disease, risk_level)
    clinical_text = get_clinical_insight(disease, risk_level)

    # ── 5. SHAP — extracted from pkl, no retraining ────────────────
    shap_dict, top_factors = compute_top_shap(
        pipeline, input_df, ordered_fields
    )

    # ── 6. Save to DB only if logged in ───────────────────────────
    prediction_id = None
    saved         = False

    if user_id is not None:
        try:
            record = Prediction(
                user_id     = user_id,
                disease     = disease,
                risk_level  = risk_level,
                probability = confidence,
                inputs      = features,
            )
            db.add(record)
            await db.commit()
            await db.refresh(record)
            prediction_id = str(record.id)
            saved         = True
            logger.info(f"Saved prediction {record.id}")
        except Exception as e:
            await db.rollback()
            logger.error(f"DB save failed: {e}")
    else:
        logger.info("Anonymous prediction — not saved")

    # ── 7. Return ──────────────────────────────────────────────────
    return PredictionResponse(
        disease            = disease,
        prediction         = prediction,
        prediction_label   = "Positive" if prediction == 1 else "Negative",
        risk_level         = risk_level,
        risk_label         = risk_label,
        confidence         = confidence,
        confidence_percent = f"{confidence * 100:.1f}%",
        clinical_insight   = clinical_text,
        input_features     = features,
        shap_values        = shap_dict,
        top_risk_factors   = top_factors,
        prediction_id      = prediction_id,
        saved              = saved,
    )