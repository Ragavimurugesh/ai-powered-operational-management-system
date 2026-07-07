from fastapi import APIRouter
from pydantic import BaseModel
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from mlmodel import predict_risk

router = APIRouter()

class PredictionInput(BaseModel):
    utilization_rate: float
    performance_score: float
    anomaly_count: int

@router.post("/predict")
def ml_predict(data: PredictionInput):
    result = predict_risk(
        data.utilization_rate,
        data.performance_score,
        data.anomaly_count
    )
    return result

@router.get("/info")
def model_info():
    return {
        "model": "Random Forest Classifier",
        "features": ["utilization_rate", "performance_score", "anomaly_count"],
        "output": "risk_level",
        "accuracy": "94%"
    }