import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  

  const pieData = [
    { name: 'Completed', value: 8 },
    { name: 'In Progress', value: 12 },
    { name: 'Pending', value: 4 },
  ];

  const barData = [
    { name: 'Machine A', utilization: 75 },
    { name: 'Team B', utilization: 90 },
    { name: 'Server C', utilization: 45 },
    { name: 'Vehicle D', utilization: 60 },
  ];

  const lineData = [
    { name: 'Mon', score: 75 },
    { name: 'Tue', score: 80 },
    { name: 'Wed', score: 78 },
    { name: 'Thu', score: 85 },
    { name: 'Fri', score: 88 },
    { name: 'Sat', score: 82 },
    { name: 'Sun', score: 90 },
  ];

  const COLORS = ['#2ecc71', '#3498db', '#e74c3c'];

  const cards = [
    { title: 'Total Operations', value: '24', icon: '⚙️', color: '#0f3460' },
    { title: 'Active Resources', value: '18', icon: '📦', color: '#533483' },
    { title: 'Health Score', value: '85%', icon: '💚', color: '#2ecc71' },
    { title: 'Risk Alerts', value: '3', icon: '⚠️', color: '#e74c3c' },
    { title: 'Predictions', value: '12', icon: '🤖', color: '#3498db' },
    { title: 'Recommendations', value: '7', icon: '💡', color: '#f39c12' },
  ];

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
            background: item.path === '/dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.target.style.background = item.path === '/dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent'}
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
            <h1 style={{ color: '#1a1a2e', fontSize: '28px', margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome to OpsMind AI
            </p>
          </div>
          <div style={{
            background: '#0f3460', color: 'white',
            padding: '10px 20px', borderRadius: '25px', fontSize: '14px',
          }}>
            👤 Admin
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', marginBottom: '30px',
        }}>
          {cards.map((card, index) => (
            <div key={index} style={{
              background: 'white', padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${card.color}`,
              transition: 'transform 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>{card.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: card.color }}>
                {card.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{card.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '20px', marginBottom: '30px',
        }}>
          {/* Pie Chart */}
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>
              📊 Operations Status
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div style={{
            background: 'white', padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>
              📦 Resource Utilization
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#0f3460" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div style={{
          background: 'white', padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '30px',
        }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>
            💚 Health Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2ecc71"
                strokeWidth={3}
                dot={{ fill: '#2ecc71', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: 'white', padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px' }}>
            📋 Recent Activities
          </h3>
          {[
            { activity: 'New Operation Added', time: '2 mins ago', status: 'success' },
            { activity: 'Risk Alert Generated', time: '15 mins ago', status: 'warning' },
            { activity: 'AI Prediction Complete', time: '1 hour ago', status: 'success' },
            { activity: 'Anomaly Detected', time: '2 hours ago', status: 'danger' },
            { activity: 'Health Score Updated', time: '3 hours ago', status: 'success' },
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '12px 0',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: item.status === 'success' ? '#2ecc71' :
                    item.status === 'warning' ? '#f39c12' : '#e74c3c',
                }}></div>
                <span style={{ color: '#333', fontSize: '14px' }}>
                  {item.activity}
                </span>
              </div>
              <span style={{ color: '#999', fontSize: '12px' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;