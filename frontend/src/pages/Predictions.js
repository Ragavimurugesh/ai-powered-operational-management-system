import React, { useState, useEffect } from 'react';
import { predictionAPI } from '../services/api';

function Predictions() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await predictionAPI.getAll();
      setPredictions(response.data);
    } catch (err) {
      setError('Failed to load predictions');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔮 Predictions</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Type</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Value</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Model</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((pred) => (
            <tr key={pred.prediction_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{pred.prediction_type}</td>
              <td style={{ padding: '10px' }}>{pred.predicted_value.toFixed(1)}</td>
              <td style={{ padding: '10px' }}>{pred.prediction_date}</td>
              <td style={{ padding: '10px' }}>{pred.model_used}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Predictions;