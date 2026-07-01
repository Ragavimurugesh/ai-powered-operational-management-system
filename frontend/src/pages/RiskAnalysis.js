import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RiskAnalysis() {
  const navigate = useNavigate();
  const [risks, setRisks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRisk, setNewRisk] = useState({
    prediction_id: 1,
    risk_level: 'Low',
    risk_description: '',
    risk_score: 0
  });

  const API = 'http://127.0.0.1:8000/api/risks';

  useEffect(() => { fetchRisks(); }, []);

  const fetchRisks = async () => {
    try {
      const res = await axios.get(API + '/');
      setRisks(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API + '/', newRisk);
      fetchRisks();
      setShowForm(false);
    } catch (err) { console.log(err); }
  };

  const getRiskColor = (level) => {
    if (level === 'Critical') return '#7b0000';
    if (level === 'High') return '#e74c3c';
    if (level === 'Medium') return '#f39c12';
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
            background: item.path === '/risks' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '30px',
        }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>⚠️ Risk Analysis</h1>
            <p style={{ color: '#666', margin: 0 }}>Operational risk assessment</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold',
          }}>
            + Add Risk
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px', marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Risk</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <select
                value={newRisk.risk_level}
                onChange={(e) => setNewRisk({ ...newRisk, risk_level: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              <input
                type="number"
                placeholder="Risk Score"
                value={newRisk.risk_score}
                onChange={(e) => setNewRisk({ ...newRisk, risk_score: parseFloat(e.target.value) })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <textarea
                placeholder="Risk Description"
                value={newRisk.risk_description}
                onChange={(e) => setNewRisk({ ...newRisk, risk_description: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', gridColumn: 'span 2' }}
              />
            </div>
            <button onClick={handleAdd} style={{
              marginTop: '15px', background: '#2ecc71',
              color: 'white', border: 'none',
              padding: '10px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>
              ✅ Save Risk
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {risks.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No risks yet!
            </div>
          ) : (
            risks.map((risk) => (
              <div key={risk.risk_id} style={{
                background: 'white', padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                borderLeft: `5px solid ${getRiskColor(risk.risk_level)}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold', color: '#1a1a2e' }}>Risk #{risk.risk_id}</span>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: 'bold',
                    background: getRiskColor(risk.risk_level),
                    color: 'white',
                  }}>
                    {risk.risk_level}
                  </span>
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                  {risk.risk_description}
                </p>
                <div style={{ background: '#eee', borderRadius: '4px', height: '8px' }}>
                  <div style={{
                    width: `${risk.risk_score}%`, height: '8px',
                    background: getRiskColor(risk.risk_level),
                    borderRadius: '4px',
                  }}></div>
                </div>
                <p style={{ color: '#333', fontSize: '13px', marginTop: '5px' }}>
                  Score: {risk.risk_score}/100
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskAnalysis;