import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.prediction import Prediction
from app.schemas.history import (
    PredictionHistoryItem,
    PredictionHistoryResponse,
    PredictionStatsResponse,
)

router = APIRouter(prefix="/history", tags=["History"])


# ─── GET /history/ ────────────────────────────────────────────────────────────
@router.get(
    "/",
    response_model=PredictionHistoryResponse,
    summary="Get prediction history",
    description="Returns paginated prediction history for the logged-in user.",
)
async def get_history(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Results per page"),
    disease: str | None = Query(None, description="Filter by disease name"),
    risk_level: str | None = Query(None, description="Filter by risk level (Low/High)"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PredictionHistoryResponse:

    query = (
        select(Prediction)
        .where(Prediction.user_id == current_user.id)
        .order_by(desc(Prediction.created_at))
    )

    if disease:
        query = query.where(Prediction.disease == disease.capitalize())
    if risk_level:
        query = query.where(Prediction.risk_level == risk_level)

    # Total count
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar_one()

    # Paginated results
    offset = (page - 1) * page_size
    paginated = query.offset(offset).limit(page_size)
    rows = (await db.execute(paginated)).scalars().all()

    results = [
        PredictionHistoryItem(
            id=row.id,
            disease=row.disease,
            risk_level=row.risk_level,
            probability=row.probability,
            confidence_percent=f"{row.probability * 100:.1f}%",
            inputs=row.inputs,
            created_at=row.created_at,
        )
        for row in rows
    ]

    return PredictionHistoryResponse(
        total=total,
        page=page,
        page_size=page_size,
        results=results,
    )


# ─── GET /history/stats ───────────────────────────────────────────────────────
@router.get(
    "/stats",
    response_model=PredictionStatsResponse,
    summary="Get prediction statistics",
    description="Returns total predictions grouped by disease and risk level.",
)
async def get_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PredictionStatsResponse:

    # Total
    total = (
        await db.execute(
            select(func.count()).where(Prediction.user_id == current_user.id)
        )
    ).scalar_one()

    # By disease
    disease_rows = (
        await db.execute(
            select(Prediction.disease, func.count().label("count"))
            .where(Prediction.user_id == current_user.id)
            .group_by(Prediction.disease)
        )
    ).all()

    # By risk level
    risk_rows = (
        await db.execute(
            select(Prediction.risk_level, func.count().label("count"))
            .where(Prediction.user_id == current_user.id)
            .group_by(Prediction.risk_level)
        )
    ).all()

    return PredictionStatsResponse(
        total_predictions=total,
        by_disease={row.disease: row.count for row in disease_rows},
        by_risk_level={row.risk_level: row.count for row in risk_rows},
    )


# ─── GET /history/{prediction_id} ────────────────────────────────────────────
@router.get(
    "/{prediction_id}",
    response_model=PredictionHistoryItem,
    summary="Get a single prediction",
    description="Returns details of a specific prediction by ID.",
)
async def get_prediction(
    prediction_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PredictionHistoryItem:

    row = (
        await db.execute(
            select(Prediction).where(
                Prediction.id == prediction_id,
                Prediction.user_id == current_user.id,
            )
        )
    ).scalar_one_or_none()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction not found",
        )

    return PredictionHistoryItem(
        id=row.id,
        disease=row.disease,
        risk_level=row.risk_level,
        probability=row.probability,
        confidence_percent=f"{row.probability * 100:.1f}%",
        inputs=row.inputs,
        created_at=row.created_at,
    )


# ─── DELETE /history/{prediction_id} ─────────────────────────────────────────
@router.delete(
    "/{prediction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a prediction",
    description="Deletes a specific prediction record.",
)
async def delete_prediction(
    prediction_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:

    row = (
        await db.execute(
            select(Prediction).where(
                Prediction.id == prediction_id,
                Prediction.user_id == current_user.id,
            )
        )
    ).scalar_one_or_none()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction not found",
        )

    await db.delete(row)
    await db.commit()