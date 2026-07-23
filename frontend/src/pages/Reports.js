import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([
    { id: 1, title: 'Monthly Operations Report', content: 'All operations performed well this month with 85% efficiency', date: '2026-07-01', type: 'Operations' },
    { id: 2, title: 'Risk Assessment Report', content: '3 critical risks identified and resolved successfully', date: '2026-07-01', type: 'Risk' },
    { id: 3, title: 'Resource Utilization Report', content: 'Resources utilized at 78% capacity this month', date: '2026-07-01', type: 'Resource' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newReport, setNewReport] = useState({ title: '', content: '', type: 'Operations' });

  const handleAdd = () => {
    const today = new Date().toISOString().split('T')[0];
    setReports([...reports, { id: reports.length + 1, ...newReport, date: today }]);
    setShowForm(false);
    setNewReport({ title: '', content: '', type: 'Operations' });
  };

  const handleDelete = (id) => setReports(reports.filter(r => r.id !== id));

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🔮 Digital Twin', path: '/digitaltwin' },
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
        width: '250px', background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>⚙️ OpsMind AI</h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s',
            background: item.path === '/reports' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/reports' ? 'rgba(255,255,255,0.2)' : 'transparent'}
          >{item.name}</div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>🚪 Logout</div>
      </div>

      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>📋 Reports</h1>
            <p style={{ color: '#666', margin: 0 }}>Generate and view reports</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', padding: '12px 25px',
            borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>+ Generate Report</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {[
            { label: 'Total Reports', value: reports.length, color: '#0f3460', icon: '📋' },
            { label: 'Operations', value: reports.filter(r => r.type === 'Operations').length, color: '#2ecc71', icon: '⚙️' },
            { label: 'Risk Reports', value: reports.filter(r => r.type === 'Risk').length, color: '#e74c3c', icon: '⚠️' },
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
            <h3 style={{ marginBottom: '20px' }}>➕ Generate New Report</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Report Title" value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', outline: 'none' }}
                onFocus={e => e.target.style.border = '2px solid #0f3460'}
                onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
              />
              <select value={newReport.type}
                onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
              >
                <option value="Operations">Operations</option>
                <option value="Risk">Risk</option>
                <option value="Resource">Resource</option>
                <option value="Health">Health</option>
              </select>
              <textarea placeholder="Report Content" value={newReport.content}
                onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid #e2e8f0', gridColumn: 'span 2', height: '80px' }}
              />
            </div>
            <button onClick={handleAdd} style={{
              marginTop: '15px', background: '#2ecc71', color: 'white',
              border: 'none', padding: '12px 25px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
            }}>✅ Save Report</button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reports.map((report) => (
            <div key={report.id} style={{
              background: 'white', padding: '25px', borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: '5px solid #0f3460', transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <h3 style={{ color: '#1a1a2e', margin: 0 }}>{report.title}</h3>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px',
                    fontWeight: 'bold', background: '#e8f4fd', color: '#0f3460',
                  }}>{report.type}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#999', fontSize: '12px' }}>{report.date}</span>
                  <button onClick={() => handleDelete(report.id)} style={{
                    background: '#e74c3c', color: 'white', border: 'none',
                    padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                  }}>🗑️</button>
                </div>
              </div>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>📄 {report.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;