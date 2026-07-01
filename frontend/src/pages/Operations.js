import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Operations() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [operations, setOperations] = useState([
    { id: 1, name: 'Supply Chain Management', status: 'InProgress', start: '2026-06-01', end: '2026-06-30', score: 85 },
    { id: 2, name: 'HR Recruitment Process', status: 'Completed', start: '2026-05-01', end: '2026-05-30', score: 92 },
    { id: 3, name: 'IT Infrastructure Setup', status: 'Pending', start: '2026-06-15', end: '2026-07-15', score: 60 },
    { id: 4, name: 'Marketing Campaign', status: 'InProgress', start: '2026-06-10', end: '2026-06-25', score: 78 },
  ]);

  const [newOp, setNewOp] = useState({
    name: '', status: 'Pending', start: '', end: '', score: 0
  });

  const handleAdd = () => {
    setOperations([...operations, { id: operations.length + 1, ...newOp }]);
    setShowForm(false);
    setNewOp({ name: '', status: 'Pending', start: '', end: '', score: 0 });
  };

  const handleDelete = (id) => {
    setOperations(operations.filter(op => op.id !== id));
  };

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#2ecc71';
    if (status === 'InProgress') return '#3498db';
    return '#f39c12';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>

      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          ⚙️ OpsMind AI
        </h2>
        {[
          { name: '📊 Dashboard', path: '/dashboard' },
          { name: '⚙️ Operations', path: '/operations' },
          { name: '📦 Resources', path: '/resources' },
          { name: '🤖 AI Predictions', path: '/predictions' },
          { name: '⚠️ Risk Analysis', path: '/risks' },
          { name: '💡 Recommendations', path: '/recommendations' },
          { name: '🔍 Anomaly Detection', path: '/anomaly' },
          { name: '💚 Health Score', path: '/health' },
          { name: '🧠 AI Assistant', path: '/assistant' },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            style={{
              padding: '12px 15px',
              marginBottom: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              background: item.path === '/operations' ? 'rgba(255,255,255,0.2)' : 'transparent',
            }}
          >
            {item.name}
          </div>
        ))}
        <div
          onClick={() => navigate('/')}
          style={{
            marginTop: 'auto',
            padding: '12px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            background: '#e74c3c',
            textAlign: 'center',
          }}
        >
          🚪 Logout
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>
              ⚙️ Operations
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              Manage all operational activities
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'linear-gradient(135deg, #0f3460, #533483)',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            + Add Operation
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginBottom: '25px',
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>
              Add New Operation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                placeholder="Operation Name"
                value={newOp.name}
                onChange={(e) => setNewOp({ ...newOp, name: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <select
                value={newOp.status}
                onChange={(e) => setNewOp({ ...newOp, status: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="date"
                value={newOp.start}
                onChange={(e) => setNewOp({ ...newOp, start: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input
                type="date"
                value={newOp.end}
                onChange={(e) => setNewOp({ ...newOp, end: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>
            <button
              onClick={handleAdd}
              style={{
                marginTop: '15px',
                background: '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Save Operation
            </button>
          </div>
        )}

        {/* Operations Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a1a2e', color: 'white' }}>
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
              {operations.map((op, index) => (
                <tr key={op.id} style={{
                  background: index % 2 === 0 ? '#f9f9f9' : 'white',
                  borderBottom: '1px solid #eee',
                }}>
                  <td style={{ padding: '15px' }}>{op.id}</td>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{op.name}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      background: getStatusColor(op.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                    }}>
                      {op.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>{op.start}</td>
                  <td style={{ padding: '15px' }}>{op.end}</td>
                  <td style={{ padding: '15px' }}>{op.score}%</td>
                  <td style={{ padding: '15px' }}>
                    <button
                      onClick={() => handleDelete(op.id)}
                      style={{
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '6px 15px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Operations;