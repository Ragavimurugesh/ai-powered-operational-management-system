import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Assistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am OpsMind AI Assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    try {
      const res = await axios.post(
  'https://ai-powered-operational-management-system-eq8j.onrender.com/api/assistant/chat',
  {
    user_id: 1,
    user_query: input
  }
);
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I could not process that!' }]);
    }
    setInput('');
    setLoading(false);
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
        width: '250px', background: 'linear-gradient(180deg, #1a1a2e, #0f3460)',
        color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>⚙️ OpsMind AI</h2>
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} style={{
            padding: '12px 15px', marginBottom: '8px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s',
            background: item.path === '/assistant' ? 'rgba(255,255,255,0.2)' : 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = item.path === '/assistant' ? 'rgba(255,255,255,0.2)' : 'transparent'}
          >{item.name}</div>
        ))}
        <div onClick={() => navigate('/')} style={{
          marginTop: 'auto', padding: '12px 15px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '14px', background: '#e74c3c', textAlign: 'center',
        }}>🚪 Logout</div>
      </div>

      <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '28px', marginBottom: '5px' }}>🧠 AI Assistant</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Ask anything about your operations</p>

        {/* Quick Questions */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {['Health Score', 'Risk Alerts', 'Operations Report', 'Recommendations'].map((q, i) => (
            <button key={i} onClick={() => setInput(q)} style={{
              padding: '8px 15px', borderRadius: '20px',
              border: '2px solid #0f3460', background: 'white',
              color: '#0f3460', cursor: 'pointer', fontSize: '13px',
              fontWeight: 'bold', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = '#0f3460'; e.target.style.color = 'white'; }}
            onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.color = '#0f3460'; }}
            >{q}</button>
          ))}
        </div>

        {/* Chat Box */}
        <div style={{
          flex: 1, background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          padding: '20px', overflowY: 'auto', marginBottom: '15px',
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '15px',
            }}>
              {msg.sender === 'ai' && (
                <div style={{
                  width: '35px', height: '35px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0f3460, #533483)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: '10px', fontSize: '16px', flexShrink: 0,
                }}>🤖</div>
              )}
              <div style={{
                maxWidth: '60%', padding: '12px 18px', borderRadius: '15px',
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #0f3460, #533483)' : '#f0f2f5',
                color: msg.sender === 'user' ? 'white' : '#333',
                fontSize: '14px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', marginBottom: '15px' }}>
              <div style={{
                width: '35px', height: '35px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #0f3460, #533483)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: '10px', fontSize: '16px',
              }}>🤖</div>
              <div style={{
                padding: '12px 18px', borderRadius: '15px',
                background: '#f0f2f5', color: '#333', fontSize: '14px',
              }}>
                ⏳ Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about health, risks, operations..."
            style={{
              flex: 1, padding: '14px', borderRadius: '10px',
              border: '2px solid #e2e8f0', fontSize: '14px', outline: 'none',
            }}
            onFocus={e => e.target.style.border = '2px solid #0f3460'}
            onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
          />
          <button onClick={handleSend} disabled={loading} style={{
            padding: '14px 25px',
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none', borderRadius: '10px',
            cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}>Send 📤</button>
        </div>
      </div>
    </div>
  );
}

export default Assistant;