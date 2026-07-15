import React, { useState } from 'react';
import { assistantAPI } from '../services/api';

function AIAssistant() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))?.user_id || 1;

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await assistantAPI.chat({
        user_id: userId,
        message: message
      });
      
      setConversation([...conversation, { type: 'user', text: message }, { type: 'assistant', text: response.data.response }]);
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🤖 AI Assistant</h1>
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', height: '400px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ddd' }}>
        {conversation.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '10px', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            <div style={{ background: msg.type === 'user' ? '#0f3460' : '#e3f2fd', color: msg.type === 'user' ? 'white' : 'black', padding: '10px', borderRadius: '8px', display: 'inline-block', maxWidth: '70%' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} disabled={loading} style={{ padding: '10px 20px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;