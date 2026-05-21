from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.config.settings import settings
from app.core.database import engine
from app.models.base import Base
from app.models.user import User
from app.models.prediction import Prediction
from app.routes import auth
from app.routes import auth, predict                    
from app.services.model_service import load_all_models

from app.routes import auth, predict, history

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("\n" + "="*50)
    print("  MediPredict Backend Starting...")
    print("="*50)

    # Create all tables in Postgres
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("  ✅ Database tables created / verified")

    # Test DB connection
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT 1"))
        print("  ✅ Postgres connection successful")

    load_all_models()                                    
    print("  ✅ ML models pre-loaded into cache")        

    print("  ✅ Backend ready")
    print("="*50 + "\n")

    yield

    await engine.dispose()
    print("  Backend shutting down...")

app = FastAPI(
    title="MediPredict API",
    version="1.0.0",
    description="Multi-Modal Disease Prediction API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(predict.router) 
app.include_router(history.router)

@app.get("/")
async def root():
    return {"message": "MediPredict API Running 🚀"}

@app.get("/health")
async def health():
    return {"status": "OK", "environment": settings.ENVIRONMENT}