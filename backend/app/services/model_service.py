import joblib
import logging
from pathlib import Path
from functools import lru_cache
from app.config.settings import settings
from app.config.field_order import VALID_DISEASES
import warnings
from sklearn.exceptions import InconsistentVersionWarning

warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

logger = logging.getLogger(__name__)


@lru_cache(maxsize=None)
def load_model(disease: str):
    """
    Load and cache a disease pipeline from disk.
    Models are loaded once at first call and reused on subsequent requests.
    """
    if disease not in VALID_DISEASES:
        raise ValueError(f"Unknown disease: {disease}")

    model_path: Path = settings.ML_MODELS_DIR / f"{disease}_best_pipeline.pkl"

    if not model_path.exists():
        raise FileNotFoundError(
            f"Model file not found: {model_path}. "
            f"Expected at {settings.ML_MODELS_DIR}/{disease}_best_pipeline.pkl"
        )

    logger.info(f"Loading model for disease: {disease} from {model_path}")
    with open(model_path, "rb") as f:
        model = joblib.load(f)

    logger.info(f"Model loaded successfully for: {disease}")
    return model


def get_all_models() -> dict:
    """Load all models at startup for pre-warming the cache."""
    models = {}
    for disease in VALID_DISEASES:
        try:
            models[disease] = load_model(disease)
            logger.info(f"Pre-loaded model: {disease}")
        except FileNotFoundError as e:
            logger.warning(f"Could not pre-load model for {disease}: {e}")
    return models