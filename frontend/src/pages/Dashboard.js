import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  operationAPI, resourceAPI, healthAPI, 
  riskAPI, anomalyAPI, recommendationAPI, notificationAPI 
} from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [operations, setOperations] = useState([]);
  const [resources, setResources] = useState([]);
  const [healthScores, setHealthScores] = useState([]);
  const [risks, setRisks] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{"name": "Admin User", "email": "admin@opsmind.com", "role": "Admin"}');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [opsRes, resRes, healthRes, riskRes, anoRes, recRes, notifyRes] = await Promise.allSettled([
        operationAPI.getAll(),
        resourceAPI.getAll(),
        healthAPI.getAll(),
        riskAPI.getAll(),
        anomalyAPI.getAll(),
        recommendationAPI.getAll(),
        notificationAPI.getAll(),
      ]);

      if (opsRes.status === 'fulfilled') setOperations(opsRes.value.data);
      if (resRes.status === 'fulfilled') setResources(resRes.value.data);
      if (healthRes.status === 'fulfilled') setHealthScores(healthRes.value.data);
      if (riskRes.status === 'fulfilled') setRisks(riskRes.value.data);
      if (anoRes.status === 'fulfilled') setAnomalies(anoRes.value.data);
      if (recRes.status === 'fulfilled') setRecommendations(recRes.value.data);
      if (notifyRes.status === 'fulfilled') setNotifications(notifyRes.value.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const sidebarItems = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⚙️ Operations', path: '/operations' },
    { name: '📦 Resources', path: '/resources' },
    { name: '🔮 Digital Twin', path: '/digitaltwin' },
    { name: '🤖 AI Predictions', path: '/predictions' },
    { name: '🧪 Custom ML Predict', path: '/mlpredict' },
    { name: '⚠️ Risk Analysis', path: '/risks' },
    { name: '💡 Recommendations', path: '/recommendations' },
    { name: '🔍 Anomaly Detection', path: '/anomaly' },
    { name: '💚 Health Score', path: '/health' },
    { name: '📋 Reports', path: '/reports' },
    { name: '🔔 Notifications', path: '/notifications' },
    { name: '🧠 AI Assistant', path: '/assistant' },
  ];

  // Calculated Stats
  const completedOps = operations.filter(o => o.workflow_status === 'Completed').length;
  const inProgressOps = operations.filter(o => o.workflow_status === 'InProgress').length;
  const pendingOps = operations.filter(o => o.workflow_status === 'Pending').length;
  
  const avgUtilization = resources.length 
    ? (resources.reduce((acc, r) => acc + (r.utilization_rate || 0), 0) / resources.length).toFixed(1)
    : 0;

  const highRisks = risks.filter(r => r.risk_level === 'High' || r.risk_level === 'Critical').length;
  
  const avgHealth = healthScores.length
    ? (healthScores.reduce((acc, h) => acc + (h.overall_score || 0), 0) / healthScores.length).toFixed(1)
    : 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{
        width: '260px',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{
            width: '42px', height: '42px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', boxShadow: '0 4px 14px rgba(59,130,246,0.4)'
          }}>
            ⚙️
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#ffffff' }}>OpsMind AI</h2>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Predictive Intelligence</span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto' }}>
          {sidebarItems.map((item, index) => {
            const isActive = item.path === '/dashboard';
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  background: isActive ? 'linear-gradient(90deg, #2563eb, #3b82f6)' : 'transparent',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        {/* User Card & Logout */}
        <div style={{
          marginTop: '20px',
          padding: '14px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{currentUser.name}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{currentUser.role || 'Manager'}</div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: 'rgba(239,68,68,0.2)',
              color: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0', color: '#f8fafc' }}>
              Operational Executive Overview 📊
            </h1>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
              Real-time analytics, predictive risk monitoring, and autonomous AI recommendations
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/assistant')}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🧠 Ask AI Assistant
            </button>
            <button
              onClick={() => navigate('/operations')}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
              }}
            >
              + New Operation
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '14px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', borderRadius: '10px', color: '#fca5a5', marginBottom: '20px' }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '16px' }}>
            ⚡ Loading operational intelligence telemetry...
          </div>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              
              {/* Operations Card */}
              <div 
                onClick={() => navigate('/operations')}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Active Operations</span>
                  <span style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>⚙️ Total</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                  {operations.length}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#4ade80' }}>✓ {completedOps} Done</span>
                  <span style={{ color: '#60a5fa' }}>▶ {inProgressOps} Active</span>
                  <span style={{ color: '#facc15' }}>⏳ {pendingOps} Wait</span>
                </div>
              </div>

              {/* Resource Utilization */}
              <div 
                onClick={() => navigate('/resources')}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Avg Resource Load</span>
                  <span style={{ background: 'rgba(168,85,247,0.2)', color: '#c084fc', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>📦 {resources.length} Allocated</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                  {avgUtilization}%
                </div>
                <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(avgUtilization, 100)}%`, background: 'linear-gradient(90deg, #a855f7, #ec4899)', height: '100%' }}></div>
                </div>
              </div>

              {/* Health Score */}
              <div 
                onClick={() => navigate('/health')}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Org Health Index</span>
                  <span style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>💚 Optimal</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                  {avgHealth} <span style={{ fontSize: '16px', color: '#94a3b8' }}>/ 100</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4ade80' }}>
                  Based on efficiency & productivity metrics
                </div>
              </div>

              {/* High Risk & Anomalies */}
              <div 
                onClick={() => navigate('/risks')}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Risk & Anomalies</span>
                  <span style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>⚠️ Warning</span>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: highRisks > 0 ? '#f87171' : '#ffffff', marginBottom: '8px' }}>
                  {highRisks} <span style={{ fontSize: '14px', color: '#94a3b8' }}>High Risks</span>
                </div>
                <div style={{ fontSize: '12px', color: '#f87171' }}>
                  🔍 {anomalies.length} Detected Anomalies
                </div>
              </div>

            </div>

            {/* Quick Feature Navigation Grid */}
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#e2e8f0' }}>
              🚀 Core Operational Intelligence Modules
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              
              <div 
                onClick={() => navigate('/digitaltwin')}
                style={{
                  background: 'linear-gradient(135deg, rgba(30,58,138,0.4), rgba(15,23,42,0.8))',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔮 Digital Twin Simulation</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 14px 0' }}>
                  Simulate complex workflow changes, test process variations, and predict outcomes before deployment.
                </p>
                <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: '600' }}>Launch Simulation →</span>
              </div>

              <div 
                onClick={() => navigate('/mlpredict')}
                style={{
                  background: 'linear-gradient(135deg, rgba(88,28,135,0.4), rgba(15,23,42,0.8))',
                  border: '1px solid rgba(168,85,247,0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🧪 Custom ML Predictor</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 14px 0' }}>
                  Input custom operational metrics and run scikit-learn ML models to forecast risk levels & performance.
                </p>
                <span style={{ fontSize: '12px', color: '#c084fc', fontWeight: '600' }}>Run Predictive Model →</span>
              </div>

              <div 
                onClick={() => navigate('/recommendations')}
                style={{
                  background: 'linear-gradient(135deg, rgba(6,78,59,0.4), rgba(15,23,42,0.8))',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>💡 Autonomous Recommendations</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 14px 0' }}>
                  AI-driven actionable recommendations for cost optimization and resource bottleneck resolution.
                </p>
                <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600' }}>View ({recommendations.length}) Suggestions →</span>
              </div>

            </div>

            {/* Bottom 2 Column Layout: Recent Operations & System Notifications */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
              
              {/* Active Operations Table */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#f8fafc' }}>
                    ⚙️ Recent Operations
                  </h3>
                  <button 
                    onClick={() => navigate('/operations')}
                    style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '12px' }}
                  >
                    View All
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {operations.slice(0, 5).map((op) => (
                    <div 
                      key={op.operation_id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: 'rgba(15,23,42,0.6)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>{op.operation_name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Start: {op.start_date} | End: {op.end_date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '11px',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontWeight: '600',
                          background: op.workflow_status === 'Completed' ? 'rgba(34,197,94,0.2)' : op.workflow_status === 'InProgress' ? 'rgba(59,130,246,0.2)' : 'rgba(234,179,8,0.2)',
                          color: op.workflow_status === 'Completed' ? '#4ade80' : op.workflow_status === 'InProgress' ? '#60a5fa' : '#facc15'
                        }}>
                          {op.workflow_status}
                        </span>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Score: {op.performance_score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent System Notifications */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#f8fafc' }}>
                    🔔 Operational Alerts & Notifications
                  </h3>
                  <button 
                    onClick={() => navigate('/notifications')}
                    style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '12px' }}
                  >
                    View All ({notifications.length})
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {notifications.slice(0, 5).map((n) => (
                    <div 
                      key={n.notification_id}
                      style={{
                        padding: '12px',
                        background: 'rgba(15,23,42,0.6)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>
                        {n.message.includes('warning') || n.message.includes('Risk') ? '⚠️' : n.message.includes('Anomaly') ? '🔍' : 'ℹ️'}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', color: '#e2e8f0' }}>{n.message}</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Recent'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default Dashboard;