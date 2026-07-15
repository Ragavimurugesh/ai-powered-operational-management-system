import React, { useState, useEffect } from 'react';
import { operationAPI } from '../services/api';

function Operations() {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    setLoading(true);
    try {
      const response = await operationAPI.getAll();
      setOperations(response.data);
    } catch (err) {
      setError('Failed to load operations');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>⚙️ Operations</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Performance</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={op.operation_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{op.operation_name}</td>
              <td style={{ padding: '10px' }}>{op.workflow_status}</td>
              <td style={{ padding: '10px' }}>{op.performance_score.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Operations;