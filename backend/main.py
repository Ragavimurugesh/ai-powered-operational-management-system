from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from api import login, operation, resource, prediction, riskapi, mlapi, recommendation, anomaly, health, assistant, twin, report, notification

# Create app
app = FastAPI(title="OpsMind AI API")

# ADD CORS FIRST - Before anything else!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
try:
    models.Base.metadata.create_all(bind=engine)
except:
    pass

# Include routers
app.include_router(login.router, prefix="/api/auth")
app.include_router(operation.router, prefix="/api/operations")
app.include_router(resource.router, prefix="/api/resources")
app.include_router(prediction.router, prefix="/api/predictions")
app.include_router(riskapi.router, prefix="/api/risks")
app.include_router(mlapi.router, prefix="/api/ml")
app.include_router(recommendation.router, prefix="/api/recommendations")
app.include_router(anomaly.router, prefix="/api/anomaly")
app.include_router(health.router, prefix="/api/health")
app.include_router(assistant.router, prefix="/api/assistant")
app.include_router(twin.router, prefix="/api/twin")
app.include_router(report.router, prefix="/api/reports")
app.include_router(notification.router, prefix="/api/notifications")

@app.get("/")
def read_root():
    return {"message": "OpsMind AI Backend Running!"}