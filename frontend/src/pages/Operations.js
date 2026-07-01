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

  const API = 'http://127.0.0.1:8000/api/operations';

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      const res = await axios.get(API + '/');
      setOperations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await axios.post(API + '/', newOp);
      fetchOperations();
      setShowForm(false);
      setNewOp({
        operation_name: '',
        workflow_status: 'Pending',
        start_date: '',
        end_date: '',
        performance_score: 0,
        user_id: 1
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API + '/' + id);
      fetchOperations();
    } catch (err) {
      console.log(err);
    }
  };

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
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
            background: item.path === '/operations' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>
              ⚙️ Operations
            </h1>
            <p style={{ color: '#666', margin: 0 }}>Manage all operations</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none',
            padding: '12px 25px', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold',
          }}>
            + Add Operation
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px', marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>
              Add New Operation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                placeholder="Operation Name"
                value={newOp.operation_name}
                onChange={(e) => setNewOp({ ...newOp, operation_name: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <select
                value={newOp.workflow_status}
                onChange={(e) => setNewOp({ ...newOp, workflow_status: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="date"
                value={newOp.start_date}
                onChange={(e) => setNewOp({ ...newOp, start_date: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                type="date"
                value={newOp.end_date}
                onChange={(e) => setNewOp({ ...newOp, end_date: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                type="number"
                placeholder="Performance Score"
                value={newOp.performance_score}
                onChange={(e) => setNewOp({ ...newOp, performance_score: parseFloat(e.target.value) })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>
            <button onClick={handleAdd} disabled={loading} style={{
              marginTop: '15px',
              background: loading ? '#ccc' : '#2ecc71',
              color: 'white', border: 'none',
              padding: '10px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>
              {loading ? 'Saving...' : '✅ Save Operation'}
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
                  <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    No operations yet! Add one above!
                  </td>
                </tr>
              ) : (
                operations.map((op, index) => (
                  <tr key={op.operation_id} style={{
                    background: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #eee',
                  }}>
                    <td style={{ padding: '15px' }}>{op.operation_id}</td>
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
                    <td style={{ padding: '15px', color: '#0f3460', fontWeight: 'bold' }}>
                      {op.performance_score}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button onClick={() => handleDelete(op.operation_id)} style={{
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

export default Operations;