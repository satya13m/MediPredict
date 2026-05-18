class PredictionError(Exception):
    """Raised when the ML model fails to produce a prediction."""
    pass


class ModelNotFoundError(FileNotFoundError):
    """Raised when a .pkl model file is missing from ml_models/."""
    pass


class InvalidDiseaseError(ValueError):
    """Raised when the requested disease has no registered model."""
    pass


class FeatureMismatchError(ValueError):
    """Raised when the input features don't match the model's expected fields."""
    pass