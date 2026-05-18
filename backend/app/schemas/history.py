import uuid
from datetime import datetime
from pydantic import BaseModel


class PredictionHistoryItem(BaseModel):
    id: uuid.UUID
    disease: str
    risk_level: str
    probability: float
    confidence_percent: str
    inputs: dict
    created_at: datetime

    model_config = {"from_attributes": True}

    @property
    def confidence_percent(self) -> str:
        return f"{self.probability * 100:.1f}%"


class PredictionHistoryResponse(BaseModel):
    total: int
    page: int
    page_size: int
    results: list[PredictionHistoryItem]


class PredictionStatsResponse(BaseModel):
    total_predictions: int
    by_disease: dict[str, int]
    by_risk_level: dict[str, int]