from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Notification
from pydantic import BaseModel

router = APIRouter()

class NotifyCreate(BaseModel):
    user_id: int
    message: str

@router.get("/")
def get_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).all()

@router.post("/")
def create_notification(notify: NotifyCreate, db: Session = Depends(get_db)):
    new_notify = Notification(**notify.dict())
    db.add(new_notify)
    db.commit()
    db.refresh(new_notify)
    return new_notify

@router.put("/{notification_id}")
def mark_read(notification_id: int, db: Session = Depends(get_db)):
    notify = db.query(Notification).filter(
        Notification.notification_id == notification_id).first()
    notify.is_read = True
    db.commit()
    return {"message": "Marked as read!"}