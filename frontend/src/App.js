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
        <Route path="/risks" element={<RiskAnalysis />} />
        <Route path="/recommendations" element={<Recommendation />} />
        <Route path="/anomaly" element={<Anomaly />} />
        <Route path="/health" element={<Health />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/digitaltwin" element={<DigitalTwin />} />
        <Route path="/mlpredict" element={<MLPredict />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;