import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RiskAnalysis() {
  const navigate = useNavigate();
  const [risks, setRisks] = useState([
    { id: 1, prediction: 'Delay Prediction', level: 'High', description: 'Production line may stop due to machine failure', score: 85 },
    { id: 2, prediction: 'Productivity', level: 'Low', description: 'Supply chain running smoothly', score: 20 },
    { id: 3, prediction: 'Failure Detection', level: 'Medium', description: 'Quality control needs attention', score: 55 },
    { id: 4, prediction: 'Resource Usage', level: 'Critical', description: 'Server overload detected', score: 95 },
  ]);

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🤖 AI Predictions', path: '/predictions' },
    { name: '⚠️ Risk Analysis', path: '/risks' },
    { name: '💡 Recommendations', path: '/recommendations' },
    { name: '🔍 Anomaly Detection', path: '/anomaly' },
    { name: '💚 Health Score', path: '/health' },
    { name: '🧠 AI Assistant', path: '/assistant' },
  ];

  const getRiskColor = (level) => {
    if (level === 'Critical') return '#7b0000';
    if (level === 'High') return '#e74c3c';
    if (level === 'Medium') return '#f39c12';
    return '#2ecc71';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px',
        display: 'flex', flexDirection: 'column',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          ⚙️ OpsMind AI
        </h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px',
            background: item.path === '/risks' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}>
            {item.name}
          </div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>
          🚪 Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '28px', marginBottom: '5px' }}>
          ⚠️ Risk Analysis
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Operational risk assessment
        </p>

        {/* Summary Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {[
            { label: 'Critical', value: '1', color: '#7b0000' },
            { label: 'High', value: '1', color: '#e74c3c' },
            { label: 'Medium', value: '1', color: '#f39c12' },
            { label: 'Low', value: '1', color: '#2ecc71' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '25px', borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.label} Risk</div>
            </div>
          ))}
        </div>

        {/* Risk Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {risks.map((risk) => (
            <div key={risk.id} style={{
              background: 'white', padding: '25px', borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${getRiskColor(risk.level)}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ color: '#1a1a2e', margin: 0 }}>{risk.prediction}</h3>
                <span style={{
                  padding: '5px 12px', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 'bold',
                  background: getRiskColor(risk.level),
                  color: 'white',
                }}>
                  {risk.level}
                </span>
              </div>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                {risk.description}
              </p>
              <div style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>
                Risk Score: <strong>{risk.score}/100</strong>
              </div>
              <div style={{ background: '#eee', borderRadius: '4px', height: '8px' }}>
                <div style={{
                  width: `${risk.score}%`, height: '8px',
                  background: getRiskColor(risk.level),
                  borderRadius: '4px',
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RiskAnalysis;