import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Resources from './pages/Resources';
import Predictions from './pages/Predictions';
import RiskAnalysis from './pages/RiskAnalysis';
import Recommendations from './pages/Recommendations';
import AnomalyDetection from './pages/AnomalyDetection';
import HealthScore from './pages/HealthScore';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import AIAssistant from './pages/AIAssistant';
import DigitalTwin from './pages/DigitalTwin';
import MLRiskPredictor from './pages/MLRiskPredictor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/risk-analysis" element={<RiskAnalysis />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/anomaly-detection" element={<AnomalyDetection />} />
        <Route path="/health-score" element={<HealthScore />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/digital-twin" element={<DigitalTwin />} />
        <Route path="/ml-risk-predictor" element={<MLRiskPredictor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;