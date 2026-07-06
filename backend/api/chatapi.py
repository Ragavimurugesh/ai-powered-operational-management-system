from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import AIAssistantLog
from pydantic import BaseModel

router = APIRouter()

class ChatQuery(BaseModel):
    user_id: int
    user_query: str

def get_ai_response(query):
    query = query.lower()
    if "health" in query:
        return "🟢 Health Score is 85%! Operations running efficiently!"
    elif "risk" in query:
        return "⚠️ 3 active risks detected! 1 Critical needs attention!"
    elif "report" in query:
        return "📊 24 Operations active, 18 Resources in use today!"
    elif "recommendation" in query:
        return "💡 Schedule maintenance for Machine A immediately!"
    elif "anomaly" in query:
        return "🔍 2 anomalies detected! Machine overload found!"
    elif "prediction" in query:
        return "🤖 AI predicts 3 day delay in Production Line A!"
    elif "hello" in query or "hi" in query:
        return "👋 Hello! I am OpsMind AI Assistant!"
    else:
        return "🤖 Ask me about health, risks, reports, predictions!"

@router.post("/chat")
def chat(query: ChatQuery, db: Session = Depends(get_db)):
    response = get_ai_response(query.user_query)
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