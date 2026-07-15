import React, { useState, useEffect } from 'react';
import { anomalyAPI } from '../services/api';

function AnomalyDetection() {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnomalies();
  }, []);

  const fetchAnomalies = async () => {
    setLoading(true);
    try {
      const response = await anomalyAPI.getAll();
      setAnomalies(response.data);
    } catch (err) {
      setError('Failed to load anomalies');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔍 Anomaly Detection</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Type</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Severity</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((anom) => (
            <tr key={anom.anomaly_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{anom.anomaly_type}</td>
              <td style={{ padding: '10px' }}>{anom.anomaly_description}</td>
              <td style={{ padding: '10px' }}>{anom.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnomalyDetection;