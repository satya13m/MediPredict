from pydantic import BaseModel, model_validator
from typing import Any
from app.config.field_order import FIELD_ORDER, VALID_DISEASES


class PredictionRequest(BaseModel):
    disease: str
    features: dict[str, Any]

    @model_validator(mode="after")
    def validate_disease_and_features(self) -> "PredictionRequest":
        disease = self.disease.capitalize()

        if disease not in VALID_DISEASES:
            raise ValueError(
                f"Invalid disease '{self.disease}'. "
                f"Must be one of: {VALID_DISEASES}"
            )
        self.disease = disease

        expected = FIELD_ORDER[disease]
        missing  = [f for f in expected if f not in self.features]
        extra    = [f for f in self.features if f not in expected]

        if missing:
            raise ValueError(
                f"Missing features for {disease}: {missing}"
            )
        if extra:
            raise ValueError(
                f"Unexpected features for {disease}: {extra}"
            )

        return self


class PredictionResponse(BaseModel):
    disease:            str
    prediction:         int
    prediction_label:   str
    risk_level:         str
    risk_label:         str
    confidence:         float
    confidence_percent: str
    input_features:     dict[str, Any]
    shap_values:        dict[str, float]      | None = None
    top_risk_factors:   list[dict[str, Any]]  | None = None
    prediction_id:      str                   | None = None
    saved:              bool                         = False