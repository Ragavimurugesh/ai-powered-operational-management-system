import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Resources() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newRes, setNewRes] = useState({
    operation_id: 1,
    resource_name: '',
    resource_type: '',
    utilization_rate: 0,
    availability_status: 'Available'
  });

  const API = 'http://127.0.0.1:8000/api/resources';

  useEffect(() => { fetchResources(); }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get(API + '/');
      setResources(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await axios.post(API + '/', newRes);
      fetchResources();
      setShowForm(false);
    } catch (err) { console.log(err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API + '/' + id);
      fetchResources();
    } catch (err) { console.log(err); }
  };

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🔮 Digital Twin', path: '/digitaltwin' },
{ name: '📋 Reports', path: '/reports' },
{ name: '🔔 Notifications', path: '/notifications' },
    { name: '🤖 AI Predictions', path: '/predictions' },
    { name: '⚠️ Risk Analysis', path: '/risks' },
    { name: '💡 Recommendations', path: '/recommendations' },
    { name: '🔍 Anomaly Detection', path: '/anomaly' },
    { name: '💚 Health Score', path: '/health' },
    { name: '🧠 AI Assistant', path: '/assistant' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px',
        display: 'flex', flexDirection: 'column',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          ⚙️ OpsMind AI
        </h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
            background: item.path === '/resources' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}>
            {item.name}
          </div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px',
          borderRadius: '8px', cursor: 'pointer',
          fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>
          🚪 Logout
        </div>
      </div>

      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '30px',
        }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>📦 Resources</h1>
            <p style={{ color: '#666', margin: 0 }}>Manage all resources</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold',
          }}>
            + Add Resource
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px', marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Add New Resource</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                placeholder="Resource Name"
                value={newRes.resource_name}
                onChange={(e) => setNewRes({ ...newRes, resource_name: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                placeholder="Resource Type"
                value={newRes.resource_type}
                onChange={(e) => setNewRes({ ...newRes, resource_type: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                type="number"
                placeholder="Utilization Rate %"
                value={newRes.utilization_rate}
                onChange={(e) => setNewRes({ ...newRes, utilization_rate: parseFloat(e.target.value) })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <select
                value={newRes.availability_status}
                onChange={(e) => setNewRes({ ...newRes, availability_status: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="Available">Available</option>
                <option value="InUse">In Use</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <button onClick={handleAdd} disabled={loading} style={{
              marginTop: '15px', background: loading ? '#ccc' : '#2ecc71',
              color: 'white', border: 'none',
              padding: '10px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>
              {loading ? 'Saving...' : '✅ Save Resource'}
            </button>
          </div>
        )}

        <div style={{
          background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f3460', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Resource Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Utilization</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No resources yet! Add one above!
                  </td>
                </tr>
              ) : (
                resources.map((res, index) => (
                  <tr key={res.resource_id} style={{
                    background: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #eee',
                  }}>
                    <td style={{ padding: '15px' }}>{res.resource_id}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{res.resource_name}</td>
                    <td style={{ padding: '15px' }}>{res.resource_type}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '100px', height: '8px', background: '#eee', borderRadius: '4px' }}>
                          <div style={{
                            width: `${res.utilization_rate}%`, height: '8px',
                            background: res.utilization_rate > 70 ? '#e74c3c' : '#2ecc71',
                            borderRadius: '4px',
                          }}></div>
                        </div>
                        {res.utilization_rate}%
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '5px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: 'bold',
                        background: res.availability_status === 'Available' ? '#d4edda' :
                          res.availability_status === 'InUse' ? '#fff3cd' : '#f8d7da',
                        color: res.availability_status === 'Available' ? '#155724' :
                          res.availability_status === 'InUse' ? '#856404' : '#721c24',
                      }}>
                        {res.availability_status}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button onClick={() => handleDelete(res.resource_id)} style={{
                        background: '#e74c3c', color: 'white',
                        border: 'none', padding: '6px 15px',
                        borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                      }}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Resources;