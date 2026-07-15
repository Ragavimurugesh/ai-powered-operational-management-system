import React, { useState } from 'react';
import { mlAPI } from '../services/api';

function MLRiskPredictor() {
  const [formData, setFormData] = useState({
    efficiency: '',
    utilization: '',
    performance: '',
    cost: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await mlAPI.predict(formData);
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to make prediction');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🤖 ML Risk Predictor</h1>
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Efficiency Score:</label>
          <input type="number" name="efficiency" value={formData.efficiency} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Utilization Rate:</label>
          <input type="number" name="utilization" value={formData.utilization} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Performance Score:</label>
          <input type="number" name="performance" value={formData.performance} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Cost:</label>
          <input type="number" name="cost" value={formData.cost} onChange={handleChange} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <button onClick={handlePredict} disabled={loading} style={{ width: '100%', padding: '10px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Predicting...' : 'Predict Risk'}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      {prediction && (
        <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px', border: '2px solid #4caf50' }}>
          <h2>Prediction Result</h2>
          <p><strong>Risk Level:</strong> {prediction.risk_level}</p>
          <p><strong>Risk Score:</strong> {prediction.risk_score?.toFixed(2)}</p>
          <p><strong>Recommendation:</strong> {prediction.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default MLRiskPredictor;