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
    "Diabetes": {"extreme": 0.80, "high": 0.60, "medium": 0.35},
    "Heart":    {"extreme": 0.75, "high": 0.55, "medium": 0.30},
    "Kidney":   {"extreme": 0.80, "high": 0.55, "medium": 0.30},
    "Liver":    {"extreme": 0.75, "high": 0.50, "medium": 0.28},
}

def get_risk_level(disease: str, prob: float) -> str:
    t = RISK_THRESHOLDS.get(disease, {"extreme": 0.80, "high": 0.60, "medium": 0.35})
    if prob >= t["extreme"]:
        return "Extreme"
    elif prob >= t["high"]:
        return "High"
    elif prob >= t["medium"]:
        return "Medium"
    return "Low"

def get_risk_label(disease: str, risk: str) -> str:
    return {
        "Extreme": f"Extreme {disease} Risk — Urgent Evaluation Advised",
        "High":    f"High {disease} Risk Detected",
        "Medium":  f"Moderate {disease} Risk Detected",
        "Low":     f"Low {disease} Risk Detected",
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

        clf = pipeline.named_steps.get("clf")
        scaler = pipeline.named_steps.get("scaler")

        if clf is None or scaler is None:
            logger.debug("Pipeline missing 'clf' or 'scaler' steps for SHAP.")
            return {}, []

        # Transform using the pkl's scaler
        X_scaled = scaler.transform(input_df)
        logger.debug(f"Scaled input (first row): {X_scaled[0].tolist()}")

        clf_name = type(clf).__name__
        logger.debug(f"Computing SHAP-like contributions for classifier: {clf_name}")

        # If classifier is linear (has coef_), compute per-feature contribution directly
        if hasattr(clf, "coef_"):
            try:
                coef = np.array(clf.coef_)
                # Handle multi-class vs binary shapes
                # Heart model uses inverted class interpretation
                if len(feature_names) == 11:
                 coef_vec = -coef.flatten()
                else:
                  if coef.ndim == 2 and coef.shape[0] > 1:
                   coef_vec = coef[1] if coef.shape[0] > 1 else coef[0]
                  else:
                   coef_vec = coef.flatten()

                # contribution = coef * x (on scaled inputs)
                contrib = X_scaled[0] * coef_vec
                shap_row = np.array(contrib, dtype=float)
                logger.debug(f"Linear model contributions: {shap_row}")

                # Build top factors
                indexed = sorted(
                    enumerate(shap_row),
                    key=lambda x: abs(x[1]),
                    reverse=True
                )[:top_n]

                top_factors = []
                raw_values = input_df.iloc[0].to_dict()
                for idx, val in indexed:
                    fname = feature_names[idx]
                    top_factors.append({
                        "feature": fname,
                        "value": raw_values.get(fname, "N/A"),
                        "shap_value": round(float(val), 6),
                        "abs_impact": round(abs(float(val)), 6),
                        "impact": "increases risk" if val > 0 else "decreases risk",
                        "direction": "risk" if val > 0 else "safety",
                    })

                shap_dict = {feature_names[i]: round(float(shap_row[i]), 6) for i in range(len(feature_names))}
                logger.debug(f"Computed linear SHAP-like dict: {shap_dict}")
                return shap_dict, top_factors
            except Exception as e:
                logger.warning(f"Linear contribution computation failed: {e}")

        # Otherwise try explainers (tree, linear explainer, kernel)
        explainer = None
        shap_values = None
        try:
            explainer = shap.TreeExplainer(clf)
            shap_values = explainer.shap_values(X_scaled)
        except Exception:
            try:
                explainer = shap.LinearExplainer(clf, X_scaled)
                shap_values = explainer.shap_values(X_scaled)
            except Exception:
                try:
                    background = np.zeros((1, X_scaled.shape[1]))
                    explainer = shap.KernelExplainer(clf.predict_proba, background)
                    shap_values = explainer.shap_values(X_scaled)
                except Exception as e:
                    logger.warning(f"SHAP explainers all failed for {clf_name}: {e}")
                    return {}, []

        # Normalise to 2D for class 1
        if isinstance(shap_values, list):
            sv = shap_values[1]
        elif isinstance(shap_values, np.ndarray) and shap_values.ndim == 3:
            sv = shap_values[:, :, 1]
        else:
            sv = shap_values

        # sv shape: (1, n_features) for single sample
        shap_row = sv[0]
        logger.debug(f"Raw SHAP row: {shap_row}")

        # Build sorted top factors
        indexed = sorted(
            enumerate(shap_row),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:top_n]

        top_factors = []
        raw_values = input_df.iloc[0].to_dict()

        for idx, shap_val in indexed:
            fname = feature_names[idx]
            top_factors.append({
                "feature": fname,
                "value": raw_values.get(fname, "N/A"),
                "shap_value": round(float(shap_val), 6),
                "abs_impact": round(abs(float(shap_val)), 6),
                "impact": "increases risk" if shap_val > 0 else "decreases risk",
                "direction": "risk" if shap_val > 0 else "safety",
            })

        shap_dict = {feature_names[i]: round(float(shap_row[i]), 6) for i in range(len(feature_names))}
        logger.debug(f"Computed SHAP dict (rounded): {shap_dict}")
        return shap_dict, top_factors

    except Exception as e:
        logger.warning(f"SHAP computation failed unexpectedly: {e}")
        return {}, []


async def run_prediction(
    request: PredictionRequest,
    db: AsyncSession,
    user_id,
) -> PredictionResponse:

    disease  = request.disease
    features = request.features

    # ── 1. Build ordered DataFrame ─────────────────────────────────
    ordered_fields = FIELD_ORDER[disease]
    
    # Validate incoming features contain all required fields
    missing = [f for f in ordered_fields if f not in features]
    if missing:
        logger.error(f"Missing required features for {disease}: {missing}")
        raise ValueError(f"Missing required features: {missing}")

    input_df = pd.DataFrame(
        [{field: features[field] for field in ordered_fields}]
    )
    
    ordered_features = [
    features[field]
    for field in ordered_fields
    ]
    print("\n========== DEBUG ==========")
    print("Disease:", disease)
    print("Expected fields:", ordered_fields)
    print("Incoming features:", features)
    print("Ordered vector:", ordered_features)
    print("Feature count:", len(ordered_features))
    print("===========================\n")
    logger.info(f"Input dataframe for {disease}: {input_df.to_dict(orient='records')}")
    logger.debug(f"Input dtypes: {input_df.dtypes.to_dict()}")

    # Coerce to numeric where possible and catch NaNs
    input_df = input_df.apply(pd.to_numeric, errors='coerce')
    input_df = input_df.apply(pd.to_numeric, errors='coerce')
    if input_df.isnull().any().any():
        nulls = input_df.isnull().sum()
        logger.error(f"NaN values found after coercion: {nulls.to_dict()}")
        raise ValueError(f"Invalid feature types or missing numeric values: {nulls.to_dict()}")

    # ── 2. Load the full saved pkl pipeline ────────────────────────
    pipeline = load_model(disease)
    try:
        clf_name = type(pipeline.named_steps.get("clf")).__name__
        logger.info(f"Loaded pipeline classifier: {clf_name}")
    except Exception:
        logger.debug("Could not determine classifier name for pipeline")

    # Inspect pipeline components for debugging
    try:
        ns = pipeline.named_steps
        logger.debug(f"Pipeline named_steps: {list(ns.keys())}")
        if 'scaler' in ns:
            scaler = ns['scaler']
            means = getattr(scaler, 'mean_', None)
            scales = getattr(scaler, 'scale_', None) or getattr(scaler, 'var_', None)
            logger.debug(f"Scaler mean_ (first 5): {None if means is None else means[:5]}")
            logger.debug(f"Scaler scale_/var_ (first 5): {None if scales is None else scales[:5]}")
        if 'clf' in ns:
            clf = ns['clf']
            coef = getattr(clf, 'coef_', None)
            fi = getattr(clf, 'feature_importances_', None)
            if coef is not None:
                logger.debug(f"Classifier coef_ shape: {coef.shape}; first values: {coef.flatten()[:10]}")
            if fi is not None:
                logger.debug(f"Classifier feature_importances_ (first 10): {fi[:10]}")
    except Exception as e:
        logger.debug(f"Pipeline inspection failed: {e}")

    # ── 3. Predict using FULL pipeline (not extracted steps) ───────
    # ImbPipeline skips SMOTE at predict time automatically
    # Scaler and clf are applied in correct order
    # ── 3. Predict using FULL pipeline (not extracted steps) ───────
# ImbPipeline skips SMOTE at predict time automatically
# Scaler and clf are applied in correct order

    proba = pipeline.predict_proba(input_df)[0]

    print("Classes:", pipeline.named_steps["clf"].classes_)
    print("Probabilities:", proba)

    # Heart model probability fix
    if disease == "Heart":
      confidence = round(float(proba[0]), 4)
    else:
      confidence = round(float(proba[1]), 4)

    prediction = 1 if confidence >= 0.50 else 0

    logger.info(f"Classifier predict_proba output: {proba}")
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