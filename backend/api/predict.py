from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Prediction
from pydantic import BaseModel

router = APIRouter()

class PredictionCreate(BaseModel):
    operation_id: int
    prediction_type: str
    predicted_value: float
    prediction_date: str
    model_used: str

@router.get("/")
def get_predictions(db: Session = Depends(get_db)):
    return db.query(Prediction).all()

@router.post("/")
def create_prediction(pred: PredictionCreate, db: Session = Depends(get_db)):
    new_pred = Prediction(**pred.dict())
    db.add(new_pred)
    db.commit()
    db.refresh(new_pred)
    return new_pred