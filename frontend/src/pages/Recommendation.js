import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Recommendation() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([
    { id: 1, risk: 'Machine Failure Risk', text: 'Schedule preventive maintenance for Machine A immediately', priority: 'High', date: '2026-06-29', status: 'Pending' },
    { id: 2, risk: 'Resource Overload', text: 'Redistribute workload across available servers', priority: 'High', date: '2026-06-29', status: 'Pending' },
    { id: 3, risk: 'Quality Control', text: 'Increase quality inspection frequency by 30%', priority: 'Medium', date: '2026-06-29', status: 'Completed' },
    { id: 4, risk: 'Supply Chain', text: 'Optimize delivery routes to reduce cost', priority: 'Low', date: '2026-06-29', status: 'Completed' },
    { id: 5, risk: 'Staff Productivity', text: 'Provide additional training for Team B', priority: 'Medium', date: '2026-06-29', status: 'Pending' },
  ]);

  const handleStatusChange = (id) => {
    setRecommendations(recommendations.map(rec =>
      rec.id === id ? { ...rec, status: rec.status === 'Pending' ? 'Completed' : 'Pending' } : rec
    ));
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
            background: item.path === '/recommendations' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
          💡 Recommendations
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          AI generated recommendations
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {[
            { label: 'Total', value: recommendations.length, color: '#0f3460' },
            { label: 'Pending', value: recommendations.filter(r => r.status === 'Pending').length, color: '#f39c12' },
            { label: 'Completed', value: recommendations.filter(r => r.status === 'Completed').length, color: '#2ecc71' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '25px',
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
          {recommendations.map((rec) => (
            <div key={rec.id} style={{
              background: 'white', padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${
                rec.priority === 'High' ? '#e74c3c' :
                rec.priority === 'Medium' ? '#f39c12' : '#2ecc71'}`,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '10px',
              }}>
                <span style={{
                  padding: '4px 10px', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 'bold',
                  background: rec.priority === 'High' ? '#f8d7da' :
                    rec.priority === 'Medium' ? '#fff3cd' : '#d4edda',
                  color: rec.priority === 'High' ? '#721c24' :
                    rec.priority === 'Medium' ? '#856404' : '#155724',
                }}>
                  {rec.priority} Priority
                </span>
                <span style={{ color: '#999', fontSize: '12px' }}>{rec.date}</span>
              </div>

              <p style={{ color: '#666', fontSize: '13px', marginBottom: '5px' }}>
                Risk: {rec.risk}
              </p>
              <p style={{ color: '#333', fontSize: '14px', marginBottom: '15px' }}>
                💡 {rec.text}
              </p>

              <button onClick={() => handleStatusChange(rec.id)} style={{
                padding: '8px 20px', borderRadius: '8px',
                border: 'none', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '13px',
                background: rec.status === 'Completed' ? '#d4edda' : '#0f3460',
                color: rec.status === 'Completed' ? '#155724' : 'white',
              }}>
                {rec.status === 'Completed' ? '✅ Completed' : '🔄 Mark Complete'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;