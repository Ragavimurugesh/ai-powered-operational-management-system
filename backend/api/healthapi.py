from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import HealthScore
from pydantic import BaseModel

router = APIRouter()

class HealthCreate(BaseModel):
    operation_id: int
    efficiency_score: float
    productivity_score: float
    overall_score: float

@router.get("/")
def get_health(db: Session = Depends(get_db)):
    return db.query(HealthScore).all()

@router.post("/")
def create_health(health: HealthCreate, db: Session = Depends(get_db)):
    new_health = HealthScore(**health.dict())
    db.add(new_health)
    db.commit()
    db.refresh(new_health)
    return new_health