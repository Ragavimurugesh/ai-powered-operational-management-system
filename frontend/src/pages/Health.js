import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Health() {
  const navigate = useNavigate();
  const [healthScores, setHealthScores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newHealth, setNewHealth] = useState({
    operation_id: 1, efficiency_score: 0,
    productivity_score: 0, overall_score: 0
  });

  const API = "https://ai-powered-operational-management-system-eq8j.onrender.com/api/health";
  useEffect(() => { fetchHealth(); }, []);

  const fetchHealth = async () => {
    try {
      const res = await axios.get(API + '/');
      setHealthScores(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API + '/', newHealth);
      fetchHealth();
      setShowForm(false);
    } catch (err) { console.log(err); }
  };

  const getColor = (score) => {
    if (score >= 85) return '#2ecc71';
    if (score >= 70) return '#f39c12';
    return '#e74c3c';
  };

  const overallHealth = healthScores.length > 0
    ? Math.round(healthScores.reduce((sum, h) => sum + h.overall_score, 0) / healthScores.length)
    : 0;

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
            background: item.path === '/health' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/health' ? 'rgba(255,255,255,0.2)' : 'transparent'}
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
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>💚 Health Score</h1>
            <p style={{ color: '#666', margin: 0 }}>Operational health monitoring</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', padding: '12px 25px',
            borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>+ Add Score</button>
        </div>

        {/* Overall Score */}
        <div style={{
          background: 'white', padding: '40px', borderRadius: '12px',
          textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '30px',
        }}>
          <div style={{
            width: '180px', height: '180px', borderRadius: '50%',
            margin: '0 auto',
            background: `conic-gradient(${getColor(overallHealth)} ${overallHealth * 3.6}deg, #eee 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '140px', height: '140px', borderRadius: '50%', background: 'white',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: '40px', fontWeight: 'bold', color: getColor(overallHealth) }}>
                {overallHealth}%
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>Overall Health</div>
            </div>
          </div>
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px', borderRadius: '12px',
            marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #0f3460',
          }}>
            <h3 style={{ marginBottom: '20px' }}>➕ Add Health Score</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <input type="number" placeholder="Efficiency Score" value={newHealth.efficiency_score}
                onChange={(e) => setNewHealth({ ...newHealth, efficiency_score: parseFloat(e.target.value) })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
              />
              <input type="number" placeholder="Productivity Score" value={newHealth.productivity_score}
                onChange={(e) => setNewHealth({ ...newHealth, productivity_score: parseFloat(e.target.value) })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
              />
              <input type="number" placeholder="Overall Score" value={newHealth.overall_score}
                onChange={(e) => setNewHealth({ ...newHealth, overall_score: parseFloat(e.target.value) })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
              />
            </div>
            <button onClick={handleAdd} style={{
              marginTop: '15px', background: '#2ecc71', color: 'white',
              border: 'none', padding: '12px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>✅ Save Score</button>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #0f3460, #533483)', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Efficiency</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Productivity</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Overall</th>
              </tr>
            </thead>
            <tbody>
              {healthScores.length === 0 ? (
                <tr><td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No health scores yet!</td></tr>
              ) : (
                healthScores.map((h, index) => (
                  <tr key={h.score_id} style={{
                    background: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #eee', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e8f4fd'}
                  onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? '#f8f9fa' : 'white'}
                  >
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#0f3460' }}>#{h.score_id}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', background: '#eee', borderRadius: '3px' }}>
                          <div style={{ width: `${h.efficiency_score}%`, height: '6px', background: getColor(h.efficiency_score), borderRadius: '3px' }}></div>
                        </div>
                        {h.efficiency_score}%
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', background: '#eee', borderRadius: '3px' }}>
                          <div style={{ width: `${h.productivity_score}%`, height: '6px', background: getColor(h.productivity_score), borderRadius: '3px' }}></div>
                        </div>
                        {h.productivity_score}%
                      </div>
                    </td>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: getColor(h.overall_score) }}>{h.overall_score}%</td>
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

export default Health;