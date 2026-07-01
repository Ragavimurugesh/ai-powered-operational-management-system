import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: email,
        password: password
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Welcome ' + response.data.name + '!');
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        width: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#0f3460',
          fontSize: '28px',
          marginBottom: '5px',
        }}>⚙️ OpsMind AI</h1>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '13px',
        }}>AI Powered Operational Management</p>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Logging in...' : 'Login to OpsMind AI'}
        </button>

        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '14px',
          marginTop: '15px',
        }}>
          No account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color: '#0f3460',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;