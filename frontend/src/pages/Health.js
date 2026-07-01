import React from 'react';
import { useNavigate } from 'react-router-dom';

function Health() {
  const navigate = useNavigate();

  const operations = [
    { id: 1, name: 'Production Line A', efficiency: 85, productivity: 78, overall: 82 },
    { id: 2, name: 'Supply Chain B', efficiency: 92, productivity: 88, overall: 90 },
    { id: 3, name: 'Quality Control C', efficiency: 70, productivity: 65, overall: 68 },
    { id: 4, name: 'HR Department', efficiency: 95, productivity: 90, overall: 93 },
  ];

  const overallHealth = 85;

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

  const getColor = (score) => {
    if (score >= 85) return '#2ecc71';
    if (score >= 70) return '#f39c12';
    return '#e74c3c';
  };

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
            background: item.path === '/health' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
        <h1 style={{ color: '#1a1a2e', fontSize: '28px', marginBottom: '5px' }}>
          💚 Operational Health Score
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Overall organizational health
        </p>

        {/* Overall Score Circle */}
        <div style={{
          background: 'white', padding: '40px',
          borderRadius: '12px', textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '30px',
        }}>
          <div style={{
            width: '180px', height: '180px',
            borderRadius: '50%', margin: '0 auto',
            background: `conic-gradient(${getColor(overallHealth)} ${overallHealth * 3.6}deg, #eee 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '140px', height: '140px',
              borderRadius: '50%', background: 'white',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: '40px', fontWeight: 'bold', color: getColor(overallHealth) }}>
                {overallHealth}%
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>Overall Health</div>
            </div>
          </div>
        </div>

        {/* Operation Wise Score */}
        <div style={{
          background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f3460', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Operation</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Efficiency Score</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Productivity Score</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Overall Score</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((op, index) => (
                <tr key={op.id} style={{
                  background: index % 2 === 0 ? '#f8f9fa' : 'white',
                  borderBottom: '1px solid #eee',
                }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{op.name}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '100px', height: '8px', background: '#eee', borderRadius: '4px' }}>
                        <div style={{
                          width: `${op.efficiency}%`, height: '8px',
                          background: getColor(op.efficiency), borderRadius: '4px',
                        }}></div>
                      </div>
                      {op.efficiency}%
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '100px', height: '8px', background: '#eee', borderRadius: '4px' }}>
                        <div style={{
                          width: `${op.productivity}%`, height: '8px',
                          background: getColor(op.productivity), borderRadius: '4px',
                        }}></div>
                      </div>
                      {op.productivity}%
                    </div>
                  </td>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: getColor(op.overall) }}>
                    {op.overall}%
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

export default Health;