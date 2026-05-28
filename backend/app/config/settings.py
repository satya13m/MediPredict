from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10080

    FRONTEND_URL: str = "http://localhost:3000"
    ENVIRONMENT: str = "development"

    # ADD THIS
    ALLOWED_ORIGINS: str = ""

    # ADD THIS
    def get_allowed_origins(self):
        return [
            origin.strip()
            for origin in self.ALLOWED_ORIGINS.split(",")
            if origin.strip()
        ]

    ML_MODELS_DIR: Path = BASE_DIR / "ml_models"

    class Config:
        env_file = BASE_DIR / ".env"
        env_file_encoding = "utf-8"

settings = Settings()