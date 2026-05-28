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
    
    ALLOWED_ORIGINS: str = ""
    ML_MODELS_DIR: Path = BASE_DIR / "ml_models"

    # Moving the method processing cleanly below the configuration fields
    def get_allowed_origins(self) -> list[str]:
        if not self.ALLOWED_ORIGINS:
            return []
        return [
            origin.strip()
            for origin in self.ALLOWED_ORIGINS.split(",")
            if origin.strip()
        ]

    class Config:
        env_file = BASE_DIR / ".env"
        env_file_encoding = "utf-8"
        # Prevents pydantic from treating functions as data fields
        arbitrary_types_allowed = True 

settings = Settings()