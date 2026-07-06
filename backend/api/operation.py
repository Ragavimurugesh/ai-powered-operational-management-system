from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Operation
from pydantic import BaseModel

router = APIRouter()

class OperationCreate(BaseModel):
    operation_name: str
    workflow_status: str
    start_date: str
    end_date: str
    performance_score: float
    user_id: int

@router.get("/")
def get_operations(db: Session = Depends(get_db)):
    return db.query(Operation).all()

@router.post("/")
def create_operation(op: OperationCreate, db: Session = Depends(get_db)):
    new_op = Operation(**op.dict())
    db.add(new_op)
    db.commit()
    db.refresh(new_op)
    return new_op

@router.delete("/{operation_id}")
def delete_operation(operation_id: int, db: Session = Depends(get_db)):
    op = db.query(Operation).filter(Operation.operation_id == operation_id).first()
    db.delete(op)
    db.commit()
    return {"message": "Deleted!"}