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
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Circles */}
      <div style={{
        position: 'absolute',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        top: '-50px', left: '-50px',
      }}></div>
      <div style={{
        position: 'absolute',
        width: '200px', height: '200px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        bottom: '50px', right: '50px',
      }}></div>
      <div style={{
        position: 'absolute',
        width: '150px', height: '150px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        top: '200px', right: '200px',
      }}></div>

      {/* Login Card */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        padding: '50px 40px',
        borderRadius: '20px',
        width: '420px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '70px', height: '70px',
            background: 'linear-gradient(135deg, #0f3460, #533483)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            fontSize: '30px',
            boxShadow: '0 10px 20px rgba(15,52,96,0.3)',
          }}>
            ⚙️
          </div>
          <h1 style={{
            color: '#0f3460', fontSize: '28px',
            fontWeight: 'bold', margin: '0 0 5px',
          }}>
            OpsMind AI
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            AI Powered Operational Management
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fff5f5',
            border: '1px solid #fed7d7',
            color: '#c53030',
            padding: '12px 15px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            ❌ {error}
          </div>
        )}

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block', color: '#555',
            fontSize: '13px', fontWeight: 'bold',
            marginBottom: '8px',
          }}>
            📧 Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 15px',
              borderRadius: '10px',
              border: '2px solid #e2e8f0',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border 0.3s',
            }}
            onFocus={e => e.target.style.border = '2px solid #0f3460'}
            onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block', color: '#555',
            fontSize: '13px', fontWeight: 'bold',
            marginBottom: '8px',
          }}>
            🔒 Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '14px 15px',
              borderRadius: '10px',
              border: '2px solid #e2e8f0',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border 0.3s',
            }}
            onFocus={e => e.target.style.border = '2px solid #0f3460'}
            onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginBottom: '20px',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          {loading ? '⏳ Logging in...' : '🚀 Login to OpsMind AI'}
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ padding: '0 10px', color: '#999', fontSize: '13px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        {/* Register Link */}
        <p style={{
          textAlign: 'center', color: '#666',
          fontSize: '14px', margin: 0,
        }}>
          Don't have account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color: '#0f3460', cursor: 'pointer',
              fontWeight: 'bold', textDecoration: 'underline',
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