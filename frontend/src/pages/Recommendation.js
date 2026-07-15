import React, { useState, useEffect } from 'react';
import { recommendationAPI } from '../services/api';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await recommendationAPI.getAll();
      setRecommendations(response.data);
    } catch (err) {
      setError('Failed to load recommendations');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>💡 Recommendations</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Text</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Priority</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec) => (
            <tr key={rec.recommendation_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{rec.recommendation_text}</td>
              <td style={{ padding: '10px' }}>{rec.priority}</td>
              <td style={{ padding: '10px' }}>{rec.generated_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recommendations;