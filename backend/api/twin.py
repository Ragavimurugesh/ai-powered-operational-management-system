from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import DigitalTwin
from pydantic import BaseModel

router = APIRouter()

class TwinCreate(BaseModel):
    operation_id: int
    simulation_name: str
    scenario_data: str
    simulation_result: str

@router.get("/")
def get_twins(db: Session = Depends(get_db)):
    return db.query(DigitalTwin).all()

@router.post("/")
def create_twin(twin: TwinCreate, db: Session = Depends(get_db)):
    new_twin = DigitalTwin(**twin.dict())
    db.add(new_twin)
    db.commit()
    db.refresh(new_twin)
    return new_twin