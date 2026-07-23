# ⚙️ OpsMind AI

### **AI Powered Operational Management System with Predictive Intelligence & Autonomous Decision Support**

![OpsMind AI Banner](https://img.shields.io/badge/OpsMind-AI--Powered-blue?style=for-the-badge&logo=cpu)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react)
![Python](https://img.shields.io/badge/ML-Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite)

---

## 📌 Problem Statement

Organizations today face critical operational bottlenecks: delays in processes, resource wastage, lack of real-time operational visibility, and inability to anticipate operational risks. Traditional management software only monitors and records static activities without offering intelligent predictive recommendations.

**OpsMind AI** bridges this gap by combining **Artificial Intelligence**, **Predictive Analytics**, **Digital Twin Simulation**, and **Autonomous Decision Support** to deliver proactive operational control, risk mitigation, and intelligent resource allocation.

---

## ✨ Key Features & Innovations

- 🔮 **Digital Twin Simulation**: Virtual operational environment to test resource allocation, simulate process changes, and preview future outcomes prior to execution.
- 🤖 **AI Predictive Analytics & ML**: Machine learning models predicting operational delays, cost overruns, performance scores, and completion probabilities.
- ⚠️ **Automated Risk Analysis**: Real-time evaluation of risk levels (Low, Medium, High, Critical) with early warning alerts.
- 💡 **Autonomous Decision Support**: Contextual, AI-driven recommendations for workflow optimization, load balancing, and preventive maintenance.
- 🔍 **Anomaly Detection Engine**: Real-time identification of resource bottlenecks, CPU/memory usage spikes, and schedule deviations.
- 💚 **Operational Health Index**: Dynamic 0–100 scoring dashboard based on organizational efficiency and productivity metrics.
- 🧠 **Generative AI Assistant**: Interactive AI chatbot providing real-time query resolution and operational insights.
- 🔔 **Alerts & Notification System**: Event-driven notification system keeping managers informed of system warnings.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Axios, Modern Dark CSS Glassmorphism |
| **Backend** | Python 3.11, FastAPI, Uvicorn, Pydantic |
| **Machine Learning** | Scikit-Learn, NumPy, Pandas |
| **Database** | SQLite, SQLAlchemy ORM |
| **Authentication** | Passlib, Custom Security Middleware |

---

## 🗄️ Database Architecture (12 Tables)

| Table | Description |
| :--- | :--- |
| `Users` | User credentials, roles (Admin, Manager, Employee), and authentication metadata |
| `Operations` | Operational workflows, statuses (Pending, InProgress, Completed), and performance scores |
| `Resources` | Computing, storage, and networking resources with utilization metrics |
| `Digital_Twin` | Simulation scenarios, parameters, and outcome predictions |
| `Predictions` | Machine Learning model predictions and target metrics |
| `Risk_Analysis` | Computed risk assessments, risk scores, and severity classifications |
| `Recommendations` | AI-generated action items and priority rankings |
| `Anomaly_Detection` | Operational anomaly logs, anomaly types, and severity triggers |
| `Health_Score` | Efficiency scores, productivity metrics, and composite health scores |
| `Reports` | Generated executive summaries and analytics reports |
| `Notifications` | System alerts, unread counters, and warnings |
| `AI_Assistant_Logs` | Historical interactive query logs between users and AI Assistant |

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- **Python 3.9+**
- **Node.js 16+** & **npm**

---

### 1. Clone the Repository
```bash
git clone https://github.com/Ragavimurugesh/ai-powered-operational-management-system.git
cd ai-powered-operational-management-system
```

---

### 2. Backend Setup & Seeding

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r Requirements.txt

# Populate sample database with realistic operational data
python seed_data.py

# Launch FastAPI server
python main.py
```
> 📍 Backend will run at: `http://127.0.0.1:8000`  
> 📑 Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install node modules
npm install

# Start React development server
npm start
```
> 📍 Frontend Web App will run at: `http://localhost:3000`

---

## 🔑 Default Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@opsmind.com` | `admin123` |
| **Manager** | `john@opsmind.com` | `pass123` |
| **Employee** | `sarah@opsmind.com` | `pass123` |

---

## 📡 Core API Endpoints

- `POST /api/auth/login` - Authenticate user
- `GET /api/operations/` - Fetch operational workflows
- `GET /api/resources/` - Fetch resource utilization
- `POST /api/ml/predict` - Run custom Machine Learning prediction
- `GET /api/risks/` - Fetch risk assessment logs
- `GET /api/recommendations/` - Fetch AI recommendation items
- `GET /api/anomaly/` - Fetch detected anomalies
- `GET /api/health/` - Fetch operational health scores
- `POST /api/assistant/chat` - Interact with AI Assistant
- `GET /api/twin/` - Fetch Digital Twin simulations

---

## 📜 License

This project is open-source under the **MIT License**.
