from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import RiskAnalysis
from pydantic import BaseModel

router = APIRouter()

class RiskCreate(BaseModel):
    prediction_id: int
    risk_level: str
    risk_description: str
    risk_score: float

@router.get("/")
def get_risks(db: Session = Depends(get_db)):
    return db.query(RiskAnalysis).all()

@router.post("/")
def create_risk(risk: RiskCreate, db: Session = Depends(get_db)):
    new_risk = RiskAnalysis(**risk.dict())
    db.add(new_risk)
    db.commit()
    db.refresh(new_risk)
    return new_risk