import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, message: '⚠️ Critical Risk Alert: Machine A overload detected!', type: 'danger', time: '10 mins ago', read: false },
    { id: 2, message: '🤖 AI Prediction: Production delay expected in 3 days', type: 'warning', time: '30 mins ago', read: false },
    { id: 3, message: '✅ Operation Supply Chain B completed successfully!', type: 'success', time: '1 hour ago', read: true },
    { id: 4, message: '🔍 Anomaly detected in Quality Control department', type: 'warning', time: '2 hours ago', read: false },
    { id: 5, message: '💡 New recommendation generated for resource optimization', type: 'info', time: '3 hours ago', read: true },
  ]);

  const markRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const deleteNotification = (id) => setNotifications(notifications.filter(n => n.id !== id));

  const getTypeColor = (type) => {
    if (type === 'danger') return '#e74c3c';
    if (type === 'warning') return '#f39c12';
    if (type === 'success') return '#2ecc71';
    return '#3498db';
  };

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🔮 Digital Twin', path: '/digitaltwin' },
    { name: '🧠 ML Risk Predictor', path: '/mlpredict' },
    { name: '🤖 AI Predictions', path: '/predictions' },
    { name: '⚠️ Risk Analysis', path: '/risks' },
    { name: '💡 Recommendations', path: '/recommendations' },
    { name: '🔍 Anomaly Detection', path: '/anomaly' },
    { name: '💚 Health Score', path: '/health' },
    { name: '📋 Reports', path: '/reports' },
    { name: '🔔 Notifications', path: '/notifications' },
    { name: '🧠 AI Assistant', path: '/assistant' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>
      <div style={{
        width: '250px', background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>⚙️ OpsMind AI</h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s',
            background: item.path === '/notifications' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/notifications' ? 'rgba(255,255,255,0.2)' : 'transparent'}
          >{item.name}</div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>🚪 Logout</div>
      </div>

      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>🔔 Notifications</h1>
            <p style={{ color: '#666', margin: 0 }}>System alerts and notifications</p>
          </div>
          <button onClick={markAllRead} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', padding: '12px 25px',
            borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>✅ Mark All Read</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'Total', value: notifications.length, color: '#0f3460', icon: '🔔' },
            { label: 'Unread', value: notifications.filter(n => !n.read).length, color: '#e74c3c', icon: '📌' },
            { label: 'Read', value: notifications.filter(n => n.read).length, color: '#2ecc71', icon: '✅' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '25px', borderRadius: '12px',
              textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`, transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '30px' }}>{card.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>{card.value}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((notif) => (
            <div key={notif.id} style={{
              background: notif.read ? 'white' : '#f8f9ff',
              padding: '20px 25px', borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${getTypeColor(notif.type)}`,
              opacity: notif.read ? 0.8 : 1,
              transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <p style={{
                    color: '#333', fontSize: '14px', margin: '0 0 5px',
                    fontWeight: notif.read ? 'normal' : 'bold',
                  }}>{notif.message}</p>
                  <span style={{ color: '#999', fontSize: '12px' }}>{notif.time}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginLeft: '15px' }}>
                  {!notif.read && (
                    <button onClick={() => markRead(notif.id)} style={{
                      background: '#0f3460', color: 'white', border: 'none',
                      padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                    }}>Mark Read</button>
                  )}
                  <button onClick={() => deleteNotification(notif.id)} style={{
                    background: '#e74c3c', color: 'white', border: 'none',
                    padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                  }}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;