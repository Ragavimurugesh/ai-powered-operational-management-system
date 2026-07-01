import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Predictions() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([
    { id: 1, operation: 'Production Line A', type: 'Delay Prediction', value: '3 Days Delay', date: '2026-06-29', model: 'Random Forest', risk: 'High' },
    { id: 2, operation: 'Supply Chain B', type: 'Productivity', value: '92% Efficiency', date: '2026-06-29', model: 'Linear Regression', risk: 'Low' },
    { id: 3, operation: 'Quality Control C', type: 'Failure Detection', value: '15% Failure Risk', date: '2026-06-29', model: 'Neural Network', risk: 'Medium' },
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
            background: item.path === '/predictions' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
          🤖 AI Predictions
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          AI powered operational predictions
        </p>

        {/* Summary Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {[
            { label: 'Total Predictions', value: '12', icon: '🤖', color: '#3498db' },
            { label: 'High Risk', value: '3', icon: '🔴', color: '#e74c3c' },
            { label: 'Accuracy Rate', value: '94%', icon: '🎯', color: '#2ecc71' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '25px', borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`,
            }}>
              <div style={{ fontSize: '30px' }}>{card.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Predictions Table */}
        <div style={{
          background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f3460', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Operation</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Predicted Value</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Model Used</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Risk Level</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => (
                <tr key={pred.id} style={{
                  background: index % 2 === 0 ? '#f8f9fa' : 'white',
                  borderBottom: '1px solid #eee',
                }}>
                  <td style={{ padding: '15px' }}>{pred.id}</td>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{pred.operation}</td>
                  <td style={{ padding: '15px' }}>{pred.type}</td>
                  <td style={{ padding: '15px' }}>{pred.value}</td>
                  <td style={{ padding: '15px' }}>{pred.model}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '5px 12px', borderRadius: '20px',
                      fontSize: '12px', fontWeight: 'bold',
                      background: pred.risk === 'High' ? '#f8d7da' :
                        pred.risk === 'Medium' ? '#fff3cd' : '#d4edda',
                      color: pred.risk === 'High' ? '#721c24' :
                        pred.risk === 'Medium' ? '#856404' : '#155724',
                    }}>
                      {pred.risk}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>{pred.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Predictions;