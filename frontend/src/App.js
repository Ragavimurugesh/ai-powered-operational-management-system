import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Resources from './pages/Resources';
import Predictions from './pages/Predictions';
import RiskAnalysis from './pages/RiskAnalysis';
import Recommendation from './pages/Recommendation';
import Anomaly from './pages/Anomaly';
import Health from './pages/Health';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Assistant from './pages/Assistant';
import DigitalTwin from './pages/DigitalTwin';
import MLPredict from './pages/MLPredict';

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
        <Route path="/recommendations" element={<Recommendation />} />
        <Route path="/anomaly-detection" element={<Anomaly />} />
        <Route path="/health-score" element={<Health />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/ai-assistant" element={<Assistant />} />
        <Route path="/digital-twin" element={<DigitalTwin />} />
        <Route path="/ml-risk-predictor" element={<MLPredict />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;