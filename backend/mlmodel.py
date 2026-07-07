import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Sample training data
X_train = np.array([
    [90, 10, 5],   # high utilization, high score, few anomalies
    [20, 80, 1],   # low utilization, low score, few anomalies
    [70, 50, 3],   # medium everything
    [95, 5, 10],   # very high utilization, very low score, many anomalies
    [30, 70, 2],   # low utilization, high score
    [85, 20, 7],   # high utilization, low score, many anomalies
    [45, 60, 2],   # medium utilization, good score
    [75, 35, 5],   # high utilization, medium score
])

# Labels: 0=Low, 1=Medium, 2=High, 3=Critical
y_train = np.array([2, 0, 1, 3, 0, 2, 0, 1])

# Train model
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X_train, y_train)

risk_labels = ['Low', 'Medium', 'High', 'Critical']

def predict_risk(utilization_rate, performance_score, anomaly_count):
    features = np.array([[utilization_rate, performance_score, anomaly_count]])
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]
    risk_level = risk_labels[prediction]
    confidence = round(max(probability) * 100, 2)
    return {
        "risk_level": risk_level,
        "confidence": confidence,
        "recommendation": get_recommendation(risk_level)
    }

def get_recommendation(risk_level):
    recommendations = {
        "Low": "✅ Operations running smoothly. Continue monitoring.",
        "Medium": "⚠️ Monitor closely. Consider optimization.",
        "High": "🔴 Immediate attention required! Review operations.",
        "Critical": "🚨 CRITICAL! Stop operations and investigate immediately!"
    }
    return recommendations[risk_level]