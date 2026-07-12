from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'api'))

from database import engine
import models


app = FastAPI(title="OpsMind AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "OpsMind AI Backend Running!"}

import login, operation, resource, predict, riskapi, recapi, anoapi, healthapi, chatapi, twin, report, notify, mlapi
app.include_router(login.router, prefix="/api/auth", tags=["Auth"])
app.include_router(operation.router, prefix="/api/operations", tags=["Operations"])
app.include_router(resource.router, prefix="/api/resources", tags=["Resources"])
app.include_router(predict.router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(riskapi.router, prefix="/api/risks", tags=["Risks"])
app.include_router(mlapi.router, prefix="/api/ml", tags=["ML Model"])
app.include_router(recapi.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(anoapi.router, prefix="/api/anomaly", tags=["Anomaly"])
app.include_router(healthapi.router, prefix="/api/health", tags=["Health"])
app.include_router(chatapi.router, prefix="/api/assistant", tags=["Assistant"])
app.include_router(twin.router, prefix="/api/twin", tags=["DigitalTwin"])
app.include_router(report.router, prefix="/api/reports", tags=["Reports"])
app.include_router(notify.router, prefix="/api/notifications", tags=["Notifications"])