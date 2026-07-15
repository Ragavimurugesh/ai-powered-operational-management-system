import React, { useState, useEffect } from 'react';
import { resourceAPI } from '../services/api';

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await resourceAPI.getAll();
      setResources(response.data);
    } catch (err) {
      setError('Failed to load resources');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>💾 Resources</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Type</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Utilization</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.resource_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{res.resource_name}</td>
              <td style={{ padding: '10px' }}>{res.resource_type}</td>
              <td style={{ padding: '10px' }}>{res.utilization_rate.toFixed(1)}%</td>
              <td style={{ padding: '10px' }}>{res.availability_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Resources;