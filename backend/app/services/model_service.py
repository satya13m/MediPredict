import joblib
import logging
from pathlib import Path

logger   = logging.getLogger(__name__)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODELS_DIR = BASE_DIR / "ml_models"

_models: dict = {}

def load_all_models():
    diseases = ["Diabetes", "Heart", "Kidney", "Liver"]
    print(f"\n{'='*50}")
    print(f"  Loading models from: {MODELS_DIR}")
    print(f"{'='*50}")

    for disease in diseases:
        path = MODELS_DIR / f"{disease}_best_pipeline.pkl"
        if not path.exists():
            print(f"  ❌ {disease}: NOT FOUND — {path}")
            continue
        try:
            _models[disease] = joblib.load(path)
            clf_name = type(
                _models[disease].named_steps["clf"]
            ).__name__
            print(f"  ✅ {disease}: {clf_name}")
        except Exception as e:
            print(f"  ❌ {disease}: FAILED — {e}")

    print(f"{'='*50}\n")

def load_model(disease: str):
    if disease not in _models:
        raise FileNotFoundError(
            f"Model for '{disease}' not loaded. "
            f"Check that {disease}_best_pipeline.pkl "
            f"exists in {MODELS_DIR}"
        )
    return _models[disease]

def get_loaded_diseases() -> list[str]:
    return list(_models.keys())