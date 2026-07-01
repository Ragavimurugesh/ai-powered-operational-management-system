from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Recommendation
from pydantic import BaseModel

router = APIRouter()

class RecCreate(BaseModel):
    risk_id: int
    recommendation_text: str
    priority: str
    generated_date: str

@router.get("/")
def get_recommendations(db: Session = Depends(get_db)):
    return db.query(Recommendation).all()

@router.post("/")
def create_recommendation(rec: RecCreate, db: Session = Depends(get_db)):
    new_rec = Recommendation(**rec.dict())
    db.add(new_rec)
    db.commit()
    db.refresh(new_rec)
    return new_rec