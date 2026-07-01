import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Recommendation() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRec, setNewRec] = useState({
    risk_id: 1,
    recommendation_text: '',
    priority: 'Medium',
    generated_date: ''
  });

  const API = 'http://127.0.0.1:8000/api/recommendations';

  useEffect(() => { fetchRecommendations(); }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(API + '/');
      setRecommendations(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API + '/', newRec);
      fetchRecommendations();
      setShowForm(false);
    } catch (err) { console.log(err); }
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
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '30px',
        }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>💡 Recommendations</h1>
            <p style={{ color: '#666', margin: 0 }}>AI generated recommendations</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold',
          }}>
            + Add Recommendation
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px', marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Recommendation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <select
                value={newRec.priority}
                onChange={(e) => setNewRec({ ...newRec, priority: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                value={newRec.generated_date}
                onChange={(e) => setNewRec({ ...newRec, generated_date: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <textarea
                placeholder="Recommendation Text"
                value={newRec.recommendation_text}
                onChange={(e) => setNewRec({ ...newRec, recommendation_text: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', gridColumn: 'span 2' }}
              />
            </div>
            <button onClick={handleAdd} style={{
              marginTop: '15px', background: '#2ecc71',
              color: 'white', border: 'none',
              padding: '10px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>
              ✅ Save Recommendation
            </button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {recommendations.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No recommendations yet!
            </div>
          ) : (
            recommendations.map((rec) => (
              <div key={rec.recommendation_id} style={{
                background: 'white', padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                borderLeft: `5px solid ${rec.priority === 'High' ? '#e74c3c' : rec.priority === 'Medium' ? '#f39c12' : '#2ecc71'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: 'bold',
                    background: rec.priority === 'High' ? '#f8d7da' : rec.priority === 'Medium' ? '#fff3cd' : '#d4edda',
                    color: rec.priority === 'High' ? '#721c24' : rec.priority === 'Medium' ? '#856404' : '#155724',
                  }}>
                    {rec.priority} Priority
                  </span>
                  <span style={{ color: '#999', fontSize: '12px' }}>{rec.generated_date}</span>
                </div>
                <p style={{ color: '#333', fontSize: '14px' }}>💡 {rec.recommendation_text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;