import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Anomaly() {
  const navigate = useNavigate();
  const [anomalies, setAnomalies] = useState([
    { id: 1, operation: 'Production Line A', type: 'Resource Misuse', description: 'Machine running at 150% capacity', severity: 'High', time: '10:30 AM', status: 'Active' },
    { id: 2, operation: 'Supply Chain B', type: 'Workflow Deviation', description: 'Delivery delayed by 3 days', severity: 'Medium', time: '11:45 AM', status: 'Active' },
    { id: 3, operation: 'Quality Control C', type: 'Unusual Activity', description: 'Rejection rate increased by 25%', severity: 'High', time: '12:00 PM', status: 'Resolved' },
    { id: 4, operation: 'HR Department', type: 'Resource Misuse', description: 'Unauthorized system access detected', severity: 'Critical', time: '09:15 AM', status: 'Active' },
    { id: 5, operation: 'Finance', type: 'Workflow Deviation', description: 'Budget exceeded by 10%', severity: 'Low', time: '08:00 AM', status: 'Resolved' },
  ]);

  const handleResolve = (id) => {
    setAnomalies(anomalies.map(a =>
      a.id === id ? { ...a, status: a.status === 'Active' ? 'Resolved' : 'Active' } : a
    ));
  };

  const getSeverityColor = (severity) => {
    if (severity === 'Critical') return '#7b0000';
    if (severity === 'High') return '#e74c3c';
    if (severity === 'Medium') return '#f39c12';
    return '#2ecc71';
  };

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
            padding: '12px 15px', marginBottom: '8px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
            background: item.path === '/anomaly' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}>
            {item.name}
          </div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px',
          borderRadius: '8px', cursor: 'pointer',
          fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>
          🚪 Logout
        </div>
      </div>

      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '28px', marginBottom: '5px' }}>
          🔍 Anomaly Detection
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Real time anomaly monitoring
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {[
            { label: 'Total Anomalies', value: anomalies.length, color: '#0f3460' },
            { label: 'Active', value: anomalies.filter(a => a.status === 'Active').length, color: '#e74c3c' },
            { label: 'Resolved', value: anomalies.filter(a => a.status === 'Resolved').length, color: '#2ecc71' },
            { label: 'Critical', value: anomalies.filter(a => a.severity === 'Critical').length, color: '#7b0000' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '20px',
              borderRadius: '12px', textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`,
            }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {anomalies.map((anomaly) => (
            <div key={anomaly.id} style={{
              background: 'white', padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${getSeverityColor(anomaly.severity)}`,
              opacity: anomaly.status === 'Resolved' ? 0.7 : 1,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '10px',
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: 'bold',
                    background: getSeverityColor(anomaly.severity),
                    color: 'white',
                  }}>
                    {anomaly.severity}
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                    {anomaly.type}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#999', fontSize: '12px' }}>{anomaly.time}</span>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: 'bold',
                    background: anomaly.status === 'Active' ? '#f8d7da' : '#d4edda',
                    color: anomaly.status === 'Active' ? '#721c24' : '#155724',
                  }}>
                    {anomaly.status}
                  </span>
                </div>
              </div>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>
                🏢 Operation: <strong>{anomaly.operation}</strong>
              </p>
              <p style={{ color: '#333', fontSize: '14px', marginBottom: '15px' }}>
                ⚠️ {anomaly.description}
              </p>
              <button onClick={() => handleResolve(anomaly.id)} style={{
                padding: '8px 20px', borderRadius: '8px',
                border: 'none', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '13px',
                background: anomaly.status === 'Active' ? '#0f3460' : '#d4edda',
                color: anomaly.status === 'Active' ? 'white' : '#155724',
              }}>
                {anomaly.status === 'Active' ? '✅ Mark Resolved' : '🔄 Reopen'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Anomaly;