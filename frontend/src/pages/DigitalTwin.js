import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DigitalTwin() {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [simulations, setSimulations] = useState([
    { id: 1, name: 'Production Optimization', status: 'Completed', outcome: 'Positive', improvement: '25%' },
    { id: 2, name: 'Resource Reallocation', status: 'Running', outcome: 'Pending', improvement: 'TBD' },
    { id: 3, name: 'Workflow Restructure', status: 'Completed', outcome: 'Positive', improvement: '18%' },
  ]);

  const handleSimulate = () => {
    if (!scenario) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const outcomes = [
        { outcome: 'Positive', improvement: '22%', risk: 'Low', recommendation: 'Proceed with implementation!' },
        { outcome: 'Neutral', improvement: '8%', risk: 'Medium', recommendation: 'Review before proceeding!' },
        { outcome: 'Negative', improvement: '-5%', risk: 'High', recommendation: 'Do not implement this scenario!' },
      ];
      const random = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResult(random);
      setSimulations(prev => [...prev, {
        id: prev.length + 1,
        name: scenario,
        status: 'Completed',
        outcome: random.outcome,
        improvement: random.improvement,
      }]);
      setLoading(false);
    }, 2000);
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
        overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          ⚙️ OpsMind AI
        </h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px',
            borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
            background: item.path === '/digitaltwin' ? 'rgba(255,255,255,0.2)' : 'transparent',
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
          🔮 Digital Twin Simulation
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Simulate operational scenarios before implementation
        </p>

        {/* Simulation Input */}
        <div style={{
          background: 'white', padding: '25px',
          borderRadius: '12px', marginBottom: '25px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '15px' }}>
            🧪 Run New Simulation
          </h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
            Enter a scenario to simulate and AI will predict the outcome!
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input
              placeholder="Enter scenario (e.g. Add 10 more workers to Production Line A)"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              style={{
                flex: 1, padding: '12px',
                borderRadius: '8px', border: '1px solid #ddd',
                fontSize: '14px',
              }}
            />
            <button onClick={handleSimulate} disabled={loading} style={{
              padding: '12px 25px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #0f3460, #533483)',
              color: 'white', border: 'none',
              borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold', whiteSpace: 'nowrap',
            }}>
              {loading ? '⏳ Simulating...' : '▶️ Run Simulation'}
            </button>
          </div>
        </div>

        {/* Simulation Result */}
        {result && (
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px', marginBottom: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            borderLeft: `5px solid ${result.outcome === 'Positive' ? '#2ecc71' : result.outcome === 'Neutral' ? '#f39c12' : '#e74c3c'}`,
          }}>
            <h3 style={{ color: '#1a1a2e', marginBottom: '15px' }}>
              📊 Simulation Result
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '15px' }}>
              <div style={{
                background: '#f8f9fa', padding: '15px',
                borderRadius: '8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: result.outcome === 'Positive' ? '#2ecc71' : result.outcome === 'Neutral' ? '#f39c12' : '#e74c3c' }}>
                  {result.outcome}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>Outcome</div>
              </div>
              <div style={{
                background: '#f8f9fa', padding: '15px',
                borderRadius: '8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f3460' }}>
                  {result.improvement}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>Improvement</div>
              </div>
              <div style={{
                background: '#f8f9fa', padding: '15px',
                borderRadius: '8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: result.risk === 'Low' ? '#2ecc71' : result.risk === 'Medium' ? '#f39c12' : '#e74c3c' }}>
                  {result.risk}
                </div>
                <div style={{ color: '#666', fontSize: '13px' }}>Risk Level</div>
              </div>
            </div>
            <div style={{
              background: '#f8f9fa', padding: '15px',
              borderRadius: '8px',
            }}>
              <strong>🤖 AI Recommendation: </strong>{result.recommendation}
            </div>
          </div>
        )}

        {/* Previous Simulations */}
        <div style={{
          background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden',
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <h3 style={{ color: '#1a1a2e', margin: 0 }}>📋 Previous Simulations</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f3460', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Scenario</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Outcome</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Improvement</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((sim, index) => (
                <tr key={sim.id} style={{
                  background: index % 2 === 0 ? '#f8f9fa' : 'white',
                  borderBottom: '1px solid #eee',
                }}>
                  <td style={{ padding: '15px' }}>{sim.id}</td>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{sim.name}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px',
                      fontSize: '12px', fontWeight: 'bold',
                      background: sim.status === 'Completed' ? '#d4edda' : '#fff3cd',
                      color: sim.status === 'Completed' ? '#155724' : '#856404',
                    }}>
                      {sim.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px',
                      fontSize: '12px', fontWeight: 'bold',
                      background: sim.outcome === 'Positive' ? '#d4edda' : sim.outcome === 'Neutral' ? '#fff3cd' : sim.outcome === 'Negative' ? '#f8d7da' : '#e2e3e5',
                      color: sim.outcome === 'Positive' ? '#155724' : sim.outcome === 'Neutral' ? '#856404' : sim.outcome === 'Negative' ? '#721c24' : '#383d41',
                    }}>
                      {sim.outcome}
                    </span>
                  </td>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#0f3460' }}>
                    {sim.improvement}
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

export default DigitalTwin;