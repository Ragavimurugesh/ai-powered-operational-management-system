import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Operations() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newOp, setNewOp] = useState({
    operation_name: '',
    workflow_status: 'Pending',
    start_date: '',
    end_date: '',
    performance_score: 0,
    user_id: 1
  });

  const API = 'https://ai-powered-operational-management-system-eq8j.onrender.com/api/operations';
  useEffect(() => { fetchOperations(); }, []);

  const fetchOperations = async () => {
    try {
      const res = await axios.get(API + '/');
      setOperations(res.data);
    } catch (err) { console.log(err); }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await axios.post(API + '/', newOp);
      fetchOperations();
      setShowForm(false);
      setNewOp({ operation_name: '', workflow_status: 'Pending', start_date: '', end_date: '', performance_score: 0, user_id: 1 });
    } catch (err) { console.log(err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API + '/' + id);
      fetchOperations();
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
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          ⚙️ OpsMind AI
        </h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
            background: item.path === '/operations' ? 'rgba(255,255,255,0.2)' : 'transparent',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/operations' ? 'rgba(255,255,255,0.2)' : 'transparent'}
          >
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

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '30px',
        }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>⚙️ Operations</h1>
            <p style={{ color: '#666', margin: 0 }}>Manage all operations</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '10px',
            cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            + Add Operation
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {[
            { label: 'Total Operations', value: operations.length, color: '#0f3460', icon: '⚙️' },
            { label: 'Completed', value: operations.filter(o => o.workflow_status === 'Completed').length, color: '#2ecc71', icon: '✅' },
            { label: 'Pending', value: operations.filter(o => o.workflow_status === 'Pending').length, color: '#e74c3c', icon: '⏳' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'white', padding: '25px',
              borderRadius: '12px', textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`,
              transition: 'transform 0.3s',
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

        {/* Add Form */}
        {showForm && (
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px', marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #0f3460',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>➕ Add New Operation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                placeholder="Operation Name"
                value={newOp.operation_name}
                onChange={(e) => setNewOp({ ...newOp, operation_name: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
              <select
                value={newOp.workflow_status}
                onChange={(e) => setNewOp({ ...newOp, workflow_status: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="date"
                value={newOp.start_date}
                onChange={(e) => setNewOp({ ...newOp, start_date: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              />
              <input
                type="date"
                value={newOp.end_date}
                onChange={(e) => setNewOp({ ...newOp, end_date: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              />
              <input
                type="number"
                placeholder="Performance Score"
                value={newOp.performance_score}
                onChange={(e) => setNewOp({ ...newOp, performance_score: parseFloat(e.target.value) })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              />
            </div>
            <button onClick={handleAdd} disabled={loading} style={{
              marginTop: '15px', background: '#2ecc71',
              color: 'white', border: 'none',
              padding: '12px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 5px 15px rgba(46,204,113,0.3)',
            }}>
              {loading ? '⏳ Saving...' : '✅ Save Operation'}
            </button>
          </div>
        )}

        {/* Table */}
        <div style={{
          background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #0f3460, #533483)', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Operation Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Start Date</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>End Date</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Score</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {operations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
                    No operations yet! Click + Add Operation above!
                  </td>
                </tr>
              ) : (
                operations.map((op, index) => (
                  <tr key={op.operation_id} style={{
                    background: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #eee',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e8f4fd'}
                  onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? '#f8f9fa' : 'white'}
                  >
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#0f3460' }}>#{op.operation_id}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{op.operation_name}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '5px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: 'bold',
                        background: op.workflow_status === 'Completed' ? '#d4edda' :
                          op.workflow_status === 'InProgress' ? '#fff3cd' : '#f8d7da',
                        color: op.workflow_status === 'Completed' ? '#155724' :
                          op.workflow_status === 'InProgress' ? '#856404' : '#721c24',
                      }}>
                        {op.workflow_status}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>{op.start_date}</td>
                    <td style={{ padding: '15px' }}>{op.end_date}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', background: '#eee', borderRadius: '3px' }}>
                          <div style={{
                            width: `${op.performance_score}%`, height: '6px',
                            background: op.performance_score > 70 ? '#2ecc71' : '#e74c3c',
                            borderRadius: '3px',
                          }}></div>
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#0f3460' }}>{op.performance_score}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button onClick={() => handleDelete(op.operation_id)} style={{
                        background: '#e74c3c', color: 'white',
                        border: 'none', padding: '6px 15px',
                        borderRadius: '6px', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 'bold',
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

export default Operations;