import logging
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)


def compute_shap_values(
    pipeline, input_df: pd.DataFrame, feature_names: list[str]
) -> tuple[dict[str, float], list[dict]]:
    """
    Compute SHAP values for a single prediction.

    Tries TreeExplainer first (fastest, works for tree-based models like
    RandomForest, XGBoost, LightGBM). Falls back to KernelExplainer for
    any sklearn-compatible model.

    Returns:
        shap_dict  — {feature_name: shap_value} for all features
        top_risks  — top 5 features sorted by absolute SHAP impact
    """
    import shap

    # If the pipeline has preprocessing steps, extract the final estimator
    # and transform the input through all steps except the last
    final_estimator = pipeline
    transformed_input = input_df.copy()

    if hasattr(pipeline, "steps"):
        # It's a sklearn Pipeline
        steps = pipeline.steps
        # Skip SMOTE during inference
        preprocess_steps = [
            (n, s)
            for n, s in steps
              if n not in ("smote",) and n != steps[-1][0]
       ]

        final_estimator = steps[-1][1]
        if preprocess_steps:
          from sklearn.pipeline import Pipeline as SKPipeline

          preprocessor = SKPipeline(preprocess_steps)
          transformed_input = preprocessor.transform(input_df)

          if isinstance(transformed_input, np.ndarray):
            transformed_input = pd.DataFrame(transformed_input)

    # --- Try TreeExplainer (fast, exact for tree models) ---
    try:
        explainer = shap.TreeExplainer(final_estimator)
        shap_array = explainer.shap_values(transformed_input)

        # shap_values may be a list [class0, class1] for classifiers
        if isinstance(shap_array, list):
            shap_array = shap_array[1]  # positive class

        values = shap_array[0]  # single row

    except Exception:
        # --- Fallback: KernelExplainer (model-agnostic, slower) ---
        logger.info("TreeExplainer failed, falling back to KernelExplainer")
        predict_fn = (
            pipeline.predict_proba
            if hasattr(pipeline, "predict_proba")
            else pipeline.predict
        )
        background = shap.maskers.Independent(transformed_input, max_samples=50)
        explainer = shap.KernelExplainer(predict_fn, background)
        shap_array = explainer.shap_values(transformed_input, nsamples=100)

        if isinstance(shap_array, list):
            shap_array = shap_array[1]
        values = shap_array[0]

    # Ensure feature_names aligns with values length
    n = min(len(feature_names), len(values))
    shap_dict = {feature_names[i]: round(float(values[i]), 6) for i in range(n)}

    # Top 5 risk factors by absolute SHAP impact
    sorted_features = sorted(shap_dict.items(), key=lambda x: abs(x[1]), reverse=True)
    top_risks = [
        {
            "feature": feat,
            "shap_value": val,
            "impact": "increases risk" if val > 0 else "decreases risk",
            "abs_impact": round(abs(val), 6),
        }
        for feat, val in sorted_features[:5]
    ]

    return shap_dict, top_risks