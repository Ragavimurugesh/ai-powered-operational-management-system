import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Assistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am OpsMind AI Assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      let response = "I'm analyzing your operational data...";
      
      if (input.toLowerCase().includes('health')) {
        response = "Current Operational Health Score is 85%. Operations are running efficiently!";
      } else if (input.toLowerCase().includes('risk')) {
        response = "There are 3 active risk alerts. 1 Critical risk needs immediate attention!";
      } else if (input.toLowerCase().includes('report')) {
        response = "Here's your summary: 24 Operations active, 18 Resources in use, 12 AI Predictions made today.";
      } else if (input.toLowerCase().includes('recommendation')) {
        response = "Top recommendation: Schedule preventive maintenance for Machine A immediately!";
      } else {
        response = "I can help you with Health Score, Risk Analysis, Reports, and Recommendations. What would you like to know?";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 800);

    setInput('');
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
            background: item.path === '/assistant' ? 'rgba(255,255,255,0.2)' : 'transparent',
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

      <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '28px', marginBottom: '5px' }}>
          🧠 AI Assistant
        </h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Ask anything about your operations
        </p>

        {/* Chat Box */}
        <div style={{
          flex: 1, background: 'white', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          padding: '20px', display: 'flex', flexDirection: 'column',
          overflowY: 'auto', marginBottom: '15px',
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '15px',
            }}>
              <div style={{
                maxWidth: '60%',
                padding: '12px 18px',
                borderRadius: '15px',
                background: msg.sender === 'user' 
                  ? 'linear-gradient(135deg, #0f3460, #533483)' 
                  : '#f0f2f5',
                color: msg.sender === 'user' ? 'white' : '#333',
                fontSize: '14px',
              }}>
                {msg.sender === 'ai' && '🤖 '}
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about health score, risks, reports..."
            style={{
              flex: 1, padding: '14px',
              borderRadius: '10px', border: '1px solid #ddd',
              fontSize: '14px',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: '14px 25px',
              background: 'linear-gradient(135deg, #0f3460, #533483)',
              color: 'white', border: 'none',
              borderRadius: '10px', cursor: 'pointer',
              fontWeight: 'bold', fontSize: '14px',
            }}
          >
            Send 📤
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assistant;