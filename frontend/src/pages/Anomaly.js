import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Anomaly() {
  const navigate = useNavigate();
  const [anomalies, setAnomalies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAnomaly, setNewAnomaly] = useState({
    operation_id: 1, anomaly_type: '',
    anomaly_description: '', severity: 'Low'
  });
const API = 'https://ai-powered-operational-management-system-eq8j.onrender.com/api/anomaly';
useEffect(() => { fetchAnomalies(); }, []);

  const fetchAnomalies = async () => {
    try {
      const res = await axios.get(API + '/');
      setAnomalies(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API + '/', newAnomaly);
      fetchAnomalies();
      setShowForm(false);
    } catch (err) { console.log(err); }
  };

  const getSeverityColor = (severity) => {
    if (severity === 'High') return '#e74c3c';
    if (severity === 'Medium') return '#f39c12';
    return '#2ecc71';
  };

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🔮 Digital Twin', path: '/digitaltwin'}, 
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
            background: item.path === '/anomaly' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/anomaly' ? 'rgba(255,255,255,0.2)' : 'transparent'}
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
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>🔍 Anomaly Detection</h1>
            <p style={{ color: '#666', margin: 0 }}>Real time anomaly monitoring</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', padding: '12px 25px',
            borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>+ Add Anomaly</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'Total', value: anomalies.length, color: '#0f3460', icon: '🔍' },
            { label: 'High', value: anomalies.filter(a => a.severity === 'High').length, color: '#e74c3c', icon: '🔴' },
            { label: 'Medium', value: anomalies.filter(a => a.severity === 'Medium').length, color: '#f39c12', icon: '🟡' },
            { label: 'Low', value: anomalies.filter(a => a.severity === 'Low').length, color: '#2ecc71', icon: '🟢' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '20px', borderRadius: '12px',
              textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`, transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '25px' }}>{card.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: card.color }}>{card.value}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px', borderRadius: '12px',
            marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #0f3460',
          }}>
            <h3 style={{ marginBottom: '20px' }}>➕ Add New Anomaly</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Anomaly Type" value={newAnomaly.anomaly_type}
                onChange={(e) => setNewAnomaly({ ...newAnomaly, anomaly_type: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
              <select value={newAnomaly.severity}
                onChange={(e) => setNewAnomaly({ ...newAnomaly, severity: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <textarea placeholder="Anomaly Description" value={newAnomaly.anomaly_description}
                onChange={(e) => setNewAnomaly({ ...newAnomaly, anomaly_description: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', gridColumn: 'span 2', height: '80px' }}
              />
            </div>
            <button onClick={handleAdd} style={{
              marginTop: '15px', background: '#2ecc71', color: 'white',
              border: 'none', padding: '12px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>✅ Save Anomaly</button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {anomalies.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No anomalies detected!</div>
          ) : (
            anomalies.map((anomaly) => (
              <div key={anomaly.anomaly_id} style={{
                background: 'white', padding: '25px', borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                borderLeft: `5px solid ${getSeverityColor(anomaly.severity)}`,
                transition: 'transform 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold', color: '#1a1a2e', fontSize: '16px' }}>{anomaly.anomaly_type}</span>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                    background: getSeverityColor(anomaly.severity), color: 'white',
                  }}>{anomaly.severity}</span>
                </div>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>⚠️ {anomaly.anomaly_description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Anomaly;