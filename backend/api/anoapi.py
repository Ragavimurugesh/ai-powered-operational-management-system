from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import AnomalyDetection
from pydantic import BaseModel

router = APIRouter()

class AnomalyCreate(BaseModel):
    operation_id: int
    anomaly_type: str
    anomaly_description: str
    severity: str

@router.get("/")
def get_anomalies(db: Session = Depends(get_db)):
    return db.query(AnomalyDetection).all()

@router.post("/")
def create_anomaly(anomaly: AnomalyCreate, db: Session = Depends(get_db)):
    new_anomaly = AnomalyDetection(**anomaly.dict())
    db.add(new_anomaly)
    db.commit()
    db.refresh(new_anomaly)
    return new_anomaly