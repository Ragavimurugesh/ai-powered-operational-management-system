from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Resource
from pydantic import BaseModel

router = APIRouter()

class ResourceCreate(BaseModel):
    operation_id: int
    resource_name: str
    resource_type: str
    utilization_rate: float
    availability_status: str

@router.get("/")
def get_resources(db: Session = Depends(get_db)):
    return db.query(Resource).all()

@router.post("/")
def create_resource(res: ResourceCreate, db: Session = Depends(get_db)):
    new_res = Resource(**res.dict())
    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    return new_res

@router.delete("/{resource_id}")
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    res = db.query(Resource).filter(Resource.resource_id == resource_id).first()
    db.delete(res)
    db.commit()
    return {"message": "Deleted!"}