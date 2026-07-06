import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    { title: 'Total Operations', value: '24', icon: '⚙️', color: '#0f3460' },
    { title: 'Active Resources', value: '18', icon: '📦', color: '#533483' },
    { title: 'Health Score', value: '85%', icon: '💚', color: '#2ecc71' },
    { title: 'Risk Alerts', value: '3', icon: '⚠️', color: '#e74c3c' },
    { title: 'Predictions Made', value: '12', icon: '🤖', color: '#3498db' },
    { title: 'Recommendations', value: '7', icon: '💡', color: '#f39c12' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>

      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          ⚙️ OpsMind AI
        </h2>

        {[
          { name: '📊 Dashboard', path: '/dashboard' },
          { name: '⚙️ Operations', path: '/operations' },
          { name: '📦 Resources', path: '/resources' },
          { name: '🔮 Digital Twin', path: '/digitaltwin' },
          { name: '📋 Reports', path: '/reports' },
          { name: '🔔 Notifications', path: '/notifications' },
          { name: '🤖 AI Predictions', path: '/predictions' },
          { name: '⚠️ Risk Analysis', path: '/risks' },
          { name: '💡 Recommendations', path: '/recommendations' },
          { name: '🔍 Anomaly Detection', path: '/anomaly' },
          { name: '💚 Health Score', path: '/health' },
          { name: '🧠 AI Assistant', path: '/assistant' },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            style={{
              padding: '12px 15px',
              marginBottom: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              background: item.path === '/dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
              transition: 'background 0.3s',
            }}
          >
            {item.name}
          </div>
        ))}

        <div
          onClick={() => navigate('/')}
          style={{
            marginTop: 'auto',
            padding: '12px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            background: '#e74c3c',
            textAlign: 'center',
          }}
        >
          🚪 Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome to OpsMind AI
            </p>
          </div>
          <div style={{
            background: '#0f3460',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            fontSize: '14px',
          }}>
            👤 Admin
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '30px',
        }}>
          {cards.map((card, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`,
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>
                {card.icon}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                {card.title}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>
            📋 Recent Activities
          </h3>
          {[
            { activity: 'New Operation Added', time: '2 mins ago', status: 'success' },
            { activity: 'Risk Alert Generated', time: '15 mins ago', status: 'warning' },
            { activity: 'AI Prediction Complete', time: '1 hour ago', status: 'success' },
            { activity: 'Anomaly Detected', time: '2 hours ago', status: 'danger' },
            { activity: 'Health Score Updated', time: '3 hours ago', status: 'success' },
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: item.status === 'success' ? '#2ecc71' :
                    item.status === 'warning' ? '#f39c12' : '#e74c3c',
                }}></div>
                <span style={{ color: '#333', fontSize: '14px' }}>
                  {item.activity}
                </span>
              </div>
              <span style={{ color: '#999', fontSize: '12px' }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;