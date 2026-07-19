import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function Login() {
  const [email, setEmail] = useState('admin@opsmind.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.user_id);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed!');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <div style={{ background: 'white', padding: '50px 40px', borderRadius: '20px', width: '400px', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}>
        <h1 style={{ color: '#0f3460', textAlign: 'center', marginBottom: '30px' }}>OpsMind AI 🤖</h1>
        
        {error && <div style={{ background: '#ffebee', color: '#c53030', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>❌ {error}</div>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>📧 Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>🔒 Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>

        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '12px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Logging in...' : '✅ Login'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Don't have account? <span onClick={() => navigate('/register')} style={{ color: '#0f3460', cursor: 'pointer', fontWeight: 'bold' }}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;