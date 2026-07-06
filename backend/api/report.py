from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Report
from pydantic import BaseModel

router = APIRouter()

class ReportCreate(BaseModel):
    user_id: int
    report_title: str
    report_content: str

@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).all()

@router.post("/")
def create_report(report: ReportCreate, db: Session = Depends(get_db)):
    new_report = Report(**report.dict())
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.report_id == report_id).first()
    db.delete(report)
    db.commit()
    return {"message": "Deleted!"}