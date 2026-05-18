from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_optional_user
from app.models.user import User
from app.schemas.predict import PredictionRequest, PredictionResponse
from app.services.prediction_service import run_prediction

router = APIRouter(prefix="/predict", tags=["Predictions"])


@router.post(
    "/",
    response_model=PredictionResponse,
    summary="Run a disease prediction",
    description=(
        "Prediction works without login. "
        "If logged in, result is saved to history."
    ),
)
async def predict(
    request: PredictionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
) -> PredictionResponse:
    try:
        user_id = current_user.id if current_user else None

        return await run_prediction(
            request = request,
            db      = db,
            user_id = user_id,
        )

    except FileNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e),
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction failed: {str(e)}",
        )


@router.get(
    "/diseases",
    summary="List all supported diseases and their features",
)
async def list_diseases() -> dict:
    from app.config.field_order import FIELD_ORDER
    return {
        "diseases": [
            {
                "name":          disease,
                "features":      fields,
                "feature_count": len(fields),
            }
            for disease, fields in FIELD_ORDER.items()
        ]
    }


@router.get(
    "/fields/{disease}",
    summary="Get required input fields for a specific disease",
)
async def get_fields(disease: str) -> dict:
    from app.config.field_order import FIELD_ORDER, VALID_DISEASES

    disease = disease.capitalize()

    if disease not in VALID_DISEASES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Disease '{disease}' not found. "
                   f"Valid options: {VALID_DISEASES}",
        )

    return {
        "disease":       disease,
        "fields":        FIELD_ORDER[disease],
        "feature_count": len(FIELD_ORDER[disease]),
    }