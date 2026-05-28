import logging
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)


def compute_shap_values(
    pipeline,
    input_df: pd.DataFrame,
    feature_names: list[str]
) -> tuple[dict[str, float], list[dict]]:

    """
    Compute SHAP values for a single prediction.

    Tries TreeExplainer first for tree-based models.
    Falls back to KernelExplainer for unsupported models
    like SVM or Logistic Regression.
    """

    import shap

    # =====================================================
    # Extract final estimator + preprocess input
    # =====================================================

    final_estimator = pipeline
    transformed_input = input_df.copy()

    if hasattr(pipeline, "steps"):

        steps = pipeline.steps

        # Remove SMOTE during inference
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

    # =====================================================
    # TRY TREE EXPLAINER FIRST
    # =====================================================

    try:

        explainer = shap.TreeExplainer(final_estimator)

        shap_array = explainer.shap_values(transformed_input)

        # Binary classifier support
        if isinstance(shap_array, list):
            shap_array = shap_array[1]

        values = shap_array[0]

        logger.info("SHAP TreeExplainer used successfully")

    # =====================================================
    # FALLBACK TO KERNEL EXPLAINER
    # =====================================================

    except Exception as tree_error:

        logger.warning(
            f"TreeExplainer failed: {tree_error}"
        )

        logger.info(
            "Falling back to KernelExplainer"
        )

        try:

            predict_fn = (
                pipeline.predict_proba
                if hasattr(pipeline, "predict_proba")
                else pipeline.predict
            )

            # Create proper background dataset
            background_data = np.repeat(
                transformed_input.values,
                repeats=20,
                axis=0
            )

            explainer = shap.KernelExplainer(
                predict_fn,
                background_data
            )

            shap_array = explainer.shap_values(
                transformed_input.values,
                nsamples=100
            )

            if isinstance(shap_array, list):
                shap_array = shap_array[1]

            values = shap_array[0]

            logger.info(
                "KernelExplainer used successfully"
            )

        except Exception as kernel_error:

            logger.error(
                f"KernelExplainer failed: {kernel_error}"
            )

            raise ValueError(
                "SHAP explanation generation failed"
            )

    # =====================================================
    # ALIGN FEATURE NAMES
    # =====================================================

    n = min(len(feature_names), len(values))

    shap_dict = {
        feature_names[i]: round(float(values[i]), 6)
        for i in range(n)
    }

    # =====================================================
    # TOP 5 FEATURES
    # =====================================================

    sorted_features = sorted(
        shap_dict.items(),
        key=lambda x: abs(x[1]),
        reverse=True
    )

    top_risks = [
        {
            "feature": feat,
            "shap_value": val,
            "impact": (
                "increases risk"
                if val > 0
                else "decreases risk"
            ),
            "abs_impact": round(abs(val), 6),
        }
        for feat, val in sorted_features[:5]
    ]

    return shap_dict, top_risks