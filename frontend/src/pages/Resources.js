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

  const API = 'https://ai-powered-operational-management-system-eq8j.onrender.com/api/resources';
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
    { name: '🧠 ML Risk Predictor', path: '/mlpredict' },
    { name: '🤖 AI Predictions', path: '/predictions' },
    { name: '⚠️ Risk Analysis', path: '/risks' },
    { name: '💡 Recommendations', path: '/recommendations' },
    { name: '🔍 Anomaly Detection', path: '/anomaly' },
    { name: '💚 Health Score', path: '/health' },
    { name: '📋 Reports', path: '/reports' },
    { name: '🔔 Notifications', path: '/notifications' },
    { name: '🧠 AI Assistant', path: '/assistant' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px',
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>⚙️ OpsMind AI</h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
            background: item.path === '/resources' ? 'rgba(255,255,255,0.2)' : 'transparent',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/resources' ? 'rgba(255,255,255,0.2)' : 'transparent'}
          >
            {item.name}
          </div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>🚪 Logout</div>
      </div>

      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>📦 Resources</h1>
            <p style={{ color: '#666', margin: 0 }}>Manage all resources</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', padding: '12px 25px',
            borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >+ Add Resource</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'Total Resources', value: resources.length, color: '#0f3460', icon: '📦' },
            { label: 'Available', value: resources.filter(r => r.availability_status === 'Available').length, color: '#2ecc71', icon: '✅' },
            { label: 'In Use', value: resources.filter(r => r.availability_status === 'InUse').length, color: '#f39c12', icon: '⚡' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '25px', borderRadius: '12px',
              textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`, transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '30px' }}>{card.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>{card.value}</div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px', borderRadius: '12px',
            marginBottom: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #0f3460',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>➕ Add New Resource</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Resource Name" value={newRes.resource_name}
                onChange={(e) => setNewRes({ ...newRes, resource_name: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
              <input placeholder="Resource Type" value={newRes.resource_type}
                onChange={(e) => setNewRes({ ...newRes, resource_type: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
              <input type="number" placeholder="Utilization Rate %" value={newRes.utilization_rate}
                onChange={(e) => setNewRes({ ...newRes, utilization_rate: parseFloat(e.target.value) })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
              />
              <select value={newRes.availability_status}
                onChange={(e) => setNewRes({ ...newRes, availability_status: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              >
                <option value="Available">Available</option>
                <option value="InUse">In Use</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <button onClick={handleAdd} disabled={loading} style={{
              marginTop: '15px', background: '#2ecc71', color: 'white',
              border: 'none', padding: '12px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>
              {loading ? '⏳ Saving...' : '✅ Save Resource'}
            </button>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #0f3460, #533483)', color: 'white' }}>
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
                <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No resources yet!</td></tr>
              ) : (
                resources.map((res, index) => (
                  <tr key={res.resource_id} style={{
                    background: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #eee', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e8f4fd'}
                  onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? '#f8f9fa' : 'white'}
                  >
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#0f3460' }}>#{res.resource_id}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{res.resource_name}</td>
                    <td style={{ padding: '15px' }}>{res.resource_type}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', background: '#eee', borderRadius: '3px' }}>
                          <div style={{
                            width: `${res.utilization_rate}%`, height: '6px',
                            background: res.utilization_rate > 70 ? '#e74c3c' : '#2ecc71',
                            borderRadius: '3px',
                          }}></div>
                        </div>
                        <span style={{ fontWeight: 'bold' }}>{res.utilization_rate}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                        background: res.availability_status === 'Available' ? '#d4edda' : res.availability_status === 'InUse' ? '#fff3cd' : '#f8d7da',
                        color: res.availability_status === 'Available' ? '#155724' : res.availability_status === 'InUse' ? '#856404' : '#721c24',
                      }}>{res.availability_status}</span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button onClick={() => handleDelete(res.resource_id)} style={{
                        background: '#e74c3c', color: 'white', border: 'none',
                        padding: '6px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                      }}>🗑️ Delete</button>
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