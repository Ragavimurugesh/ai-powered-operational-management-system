import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MLPredict() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    utilization_rate: 50,
    performance_score: 50,
    anomaly_count: 2
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
     const res = await axios.post("https://ai-powered-operational-management-system-eq8j.onrender.com/api/ml/predict", input);
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
            background: item.path === '/mlpredict' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/mlpredict' ? 'rgba(255,255,255,0.2)' : 'transparent'}
          >{item.name}</div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>🚪 Logout</div>
      </div>

      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '28px', marginBottom: '5px' }}>
          🧠 ML Risk Predictor
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          AI powered risk prediction using Random Forest ML Model
        </p>

        {/* Model Info */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {[
            { label: 'ML Algorithm', value: 'Random Forest', icon: '🌲', color: '#0f3460' },
            { label: 'Model Accuracy', value: '94%', icon: '🎯', color: '#2ecc71' },
            { label: 'Features Used', value: '3 Features', icon: '📊', color: '#533483' },
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
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: card.color }}>{card.value}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <div style={{
          background: 'white', padding: '30px', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '2px solid #0f3460', marginBottom: '25px',
        }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>📥 Enter Operation Data</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#555', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                📦 Utilization Rate (%)
              </label>
              <input
                type="range" min="0" max="100"
                value={input.utilization_rate}
                onChange={(e) => setInput({ ...input, utilization_rate: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3460', fontSize: '18px' }}>
                {input.utilization_rate}%
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#555', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                ⚡ Performance Score
              </label>
              <input
                type="range" min="0" max="100"
                value={input.performance_score}
                onChange={(e) => setInput({ ...input, performance_score: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3460', fontSize: '18px' }}>
                {input.performance_score}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#555', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                🔍 Anomaly Count
              </label>
              <input
                type="range" min="0" max="20"
                value={input.anomaly_count}
                onChange={(e) => setInput({ ...input, anomaly_count: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3460', fontSize: '18px' }}>
                {input.anomaly_count}
              </div>
            </div>
          </div>

          <button onClick={handlePredict} disabled={loading} style={{
            width: '100%', padding: '15px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold', fontSize: '16px',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>
            {loading ? '⏳ Predicting...' : '🧠 Predict Risk Level'}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{
            background: 'white', padding: '30px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            borderLeft: `8px solid ${getRiskColor(result.risk_level)}`,
          }}>
            <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>📊 ML Prediction Result</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{
                background: '#f8f9fa', padding: '20px', borderRadius: '10px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Risk Level</div>
                <div style={{
                  fontSize: '32px', fontWeight: 'bold',
                  color: getRiskColor(result.risk_level),
                }}>
                  {result.risk_level}
                </div>
              </div>
              <div style={{
                background: '#f8f9fa', padding: '20px', borderRadius: '10px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Model Confidence</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f3460' }}>
                  {result.confidence}%
                </div>
              </div>
            </div>
            <div style={{
              background: '#f8f9fa', padding: '20px', borderRadius: '10px',
              borderLeft: `4px solid ${getRiskColor(result.risk_level)}`,
            }}>
              <strong>🤖 AI Recommendation:</strong>
              <p style={{ margin: '10px 0 0', color: '#333', fontSize: '15px' }}>
                {result.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MLPredict;