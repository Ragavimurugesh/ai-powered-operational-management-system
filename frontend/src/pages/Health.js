import React, { useState, useEffect } from 'react';
import { healthAPI } from '../services/api';

function HealthScore() {
  const [healthScores, setHealthScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHealthScores();
  }, []);

  const fetchHealthScores = async () => {
    setLoading(true);
    try {
      const response = await healthAPI.getAll();
      setHealthScores(response.data);
    } catch (err) {
      setError('Failed to load health scores');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>❤️ Health Score</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Operation ID</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Efficiency</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Productivity</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Overall</th>
          </tr>
        </thead>
        <tbody>
          {healthScores.map((score) => (
            <tr key={score.score_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{score.operation_id}</td>
              <td style={{ padding: '10px' }}>{score.efficiency_score.toFixed(1)}</td>
              <td style={{ padding: '10px' }}>{score.productivity_score.toFixed(1)}</td>
              <td style={{ padding: '10px' }}>{score.overall_score.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HealthScore;