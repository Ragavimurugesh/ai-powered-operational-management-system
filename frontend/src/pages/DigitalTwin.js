import React, { useState, useEffect } from 'react';
import { twinAPI } from '../services/api';

function DigitalTwin() {
  const [twins, setTwins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTwins();
  }, []);

  const fetchTwins = async () => {
    setLoading(true);
    try {
      const response = await twinAPI.getAll();
      setTwins(response.data);
    } catch (err) {
      setError('Failed to load digital twins');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🌐 Digital Twin</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <div style={{ marginTop: '20px' }}>
        {twins.map((twin) => (
          <div key={twin.twin_id} style={{ background: '#f9f9f9', padding: '15px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3>{twin.simulation_name}</h3>
            <p><strong>Operation ID:</strong> {twin.operation_id}</p>
            <p><strong>Scenario Data:</strong> {twin.scenario_data}</p>
            <p><strong>Result:</strong> {twin.simulation_result}</p>
            <small>Created: {twin.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DigitalTwin;