import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Predictions() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPred, setNewPred] = useState({
    operation_id: 1, prediction_type: '',
    predicted_value: 0, prediction_date: '', model_used: ''
  });

  const API = 'http://127.0.0.1:8000/api/predictions';
  useEffect(() => { fetchPredictions(); }, []);

  const fetchPredictions = async () => {
    try {
      const res = await axios.get(API + '/');
      setPredictions(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API + '/', newPred);
      fetchPredictions();
      setShowForm(false);
    } catch (err) { console.log(err); }
  };

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🔮 Digital Twin', path: '/digitaltwin' },
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
            background: item.path === '/predictions' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/predictions' ? 'rgba(255,255,255,0.2)' : 'transparent'}
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
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>🤖 AI Predictions</h1>
            <p style={{ color: '#666', margin: 0 }}>AI powered predictions</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', padding: '12px 25px',
            borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>+ Add Prediction</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'Total Predictions', value: predictions.length, color: '#0f3460', icon: '🤖' },
            { label: 'This Week', value: predictions.length, color: '#3498db', icon: '📅' },
            { label: 'Accuracy Rate', value: '94%', color: '#2ecc71', icon: '🎯' },
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

        {showForm && (
          <div style={{
            background: 'white', padding: '25px', borderRadius: '12px',
            marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #0f3460',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>➕ Add New Prediction</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Prediction Type" value={newPred.prediction_type}
                onChange={(e) => setNewPred({ ...newPred, prediction_type: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
              <input type="number" placeholder="Predicted Value" value={newPred.predicted_value}
                onChange={(e) => setNewPred({ ...newPred, predicted_value: parseFloat(e.target.value) })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
              />
              <input type="date" value={newPred.prediction_date}
                onChange={(e) => setNewPred({ ...newPred, prediction_date: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              />
              <input placeholder="Model Used" value={newPred.model_used}
                onChange={(e) => setNewPred({ ...newPred, model_used: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
            </div>
            <button onClick={handleAdd} style={{
              marginTop: '15px', background: '#2ecc71', color: 'white',
              border: 'none', padding: '12px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>✅ Save Prediction</button>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #0f3460, #533483)', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Predicted Value</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Model Used</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No predictions yet!</td></tr>
              ) : (
                predictions.map((pred, index) => (
                  <tr key={pred.prediction_id} style={{
                    background: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #eee', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e8f4fd'}
                  onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? '#f8f9fa' : 'white'}
                  >
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#0f3460' }}>#{pred.prediction_id}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{pred.prediction_type}</td>
                    <td style={{ padding: '15px' }}>{pred.predicted_value}</td>
                    <td style={{ padding: '15px' }}>{pred.model_used}</td>
                    <td style={{ padding: '15px' }}>{pred.prediction_date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Predictions;