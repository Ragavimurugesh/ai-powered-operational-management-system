from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, Enum
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "Users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    role = Column(Enum('Admin', 'Manager', 'Employee'))
    created_at = Column(DateTime, server_default=func.now())

class Operation(Base):
    __tablename__ = "Operations"
    operation_id = Column(Integer, primary_key=True, index=True)
    operation_name = Column(String(200))
    workflow_status = Column(Enum('Pending', 'InProgress', 'Completed'))
    start_date = Column(String(50))
    end_date = Column(String(50))
    performance_score = Column(Float)
    user_id = Column(Integer)

class Resource(Base):
    __tablename__ = "Resources"
    resource_id = Column(Integer, primary_key=True, index=True)
    operation_id = Column(Integer)
    resource_name = Column(String(200))
    resource_type = Column(String(100))
    utilization_rate = Column(Float)
    availability_status = Column(Enum('Available', 'InUse', 'Unavailable'))

class Prediction(Base):
    __tablename__ = "Predictions"
    prediction_id = Column(Integer, primary_key=True, index=True)
    operation_id = Column(Integer)
    prediction_type = Column(String(100))
    predicted_value = Column(Float)
    prediction_date = Column(String(50))
    model_used = Column(String(100))

class RiskAnalysis(Base):
    __tablename__ = "Risk_Analysis"
    risk_id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer)
    risk_level = Column(Enum('Low', 'Medium', 'High', 'Critical'))
    risk_description = Column(Text)
    risk_score = Column(Float)

class Recommendation(Base):
    __tablename__ = "Recommendations"
    recommendation_id = Column(Integer, primary_key=True, index=True)
    risk_id = Column(Integer)
    recommendation_text = Column(Text)
    priority = Column(Enum('Low', 'Medium', 'High'))
    generated_date = Column(String(50))

class AnomalyDetection(Base):
    __tablename__ = "Anomaly_Detection"
    anomaly_id = Column(Integer, primary_key=True, index=True)
    operation_id = Column(Integer)
    anomaly_type = Column(String(100))
    anomaly_description = Column(Text)
    severity = Column(Enum('Low', 'Medium', 'High'))
    detected_at = Column(DateTime, server_default=func.now())

class HealthScore(Base):
    __tablename__ = "Health_Score"
    score_id = Column(Integer, primary_key=True, index=True)
    operation_id = Column(Integer)
    efficiency_score = Column(Float)
    productivity_score = Column(Float)
    overall_score = Column(Float)

class AIAssistantLog(Base):
    __tablename__ = "AI_Assistant_Logs"
    log_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    user_query = Column(Text)
    ai_response = Column(Text)
    created_at = Column(DateTime, server_default=func.now())