from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import AIAssistantLog
from pydantic import BaseModel

router = APIRouter()

class ChatQuery(BaseModel):
    user_id: int
    user_query: str

@router.post("/chat")
def chat(query: ChatQuery, db: Session = Depends(get_db)):
    response = "Analyzing your operational data..."

    if "health" in query.user_query.lower():
        response = "Health Score is 85%!"
    elif "risk" in query.user_query.lower():
        response = "3 active risks detected!"
    elif "report" in query.user_query.lower():
        response = "24 Operations, 18 Resources today!"
    elif "recommendation" in query.user_query.lower():
        response = "Schedule maintenance for Machine A!"

    log = AIAssistantLog(
        user_id=query.user_id,
        user_query=query.user_query,
        ai_response=response
    )
    db.add(log)
    db.commit()
    return {"response": response}

@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    return db.query(AIAssistantLog).all()