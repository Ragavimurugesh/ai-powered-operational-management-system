import React, { useState, useEffect } from 'react';
import { operationAPI, resourceAPI, healthAPI } from '../services/api';

function Dashboard() {
  const [operations, setOperations] = useState([]);
  const [resources, setResources] = useState([]);
  const [healthScores, setHealthScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [opsRes, resRes, healthRes] = await Promise.all([
        operationAPI.getAll(),
        resourceAPI.getAll(),
        healthAPI.getAll(),
      ]);
      setOperations(opsRes.data);
      setResources(resRes.data);
      setHealthScores(healthRes.data);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>📊 Dashboard</h1>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
          <h3>Operations: {operations.length}</h3>
        </div>
        <div style={{ background: '#f3e5f5', padding: '20px', borderRadius: '8px' }}>
          <h3>Resources: {resources.length}</h3>
        </div>
        <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px' }}>
          <h3>Health Scores: {healthScores.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;