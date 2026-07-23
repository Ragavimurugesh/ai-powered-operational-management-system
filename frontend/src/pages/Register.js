import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register', {
        name, email, password, role
      });
      alert('Registration Successful! Please Login!');
      navigate('/');
    } catch (err) {
      setError('Registration failed! Email may already exist!');
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
        background: 'rgba(255,255,255,0.95)',
        padding: '50px 40px',
        borderRadius: '20px',
        width: '420px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        zIndex: 1,
      }}>
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
          <h1 style={{ color: '#0f3460', fontSize: '28px', fontWeight: 'bold', margin: '0 0 5px' }}>
            Create Account
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            Join OpsMind AI Today
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fff5f5', border: '1px solid #fed7d7',
            color: '#c53030', padding: '12px 15px',
            borderRadius: '10px', marginBottom: '20px',
            fontSize: '14px', textAlign: 'center',
          }}>
            ❌ {error}
          </div>
        )}

        {[
          { label: '👤 Full Name', value: name, setter: setName, type: 'text', placeholder: 'Enter your name' },
          { label: '📧 Email', value: email, setter: setEmail, type: 'email', placeholder: 'Enter your email' },
          { label: '🔒 Password', value: password, setter: setPassword, type: 'password', placeholder: 'Create password' },
        ].map((field, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block', color: '#555',
              fontSize: '13px', fontWeight: 'bold', marginBottom: '8px',
            }}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              style={{
                width: '100%', padding: '14px 15px',
                borderRadius: '10px', border: '2px solid #e2e8f0',
                fontSize: '14px', boxSizing: 'border-box', outline: 'none',
              }}
              onFocus={e => e.target.style.border = '2px solid #0f3460'}
              onBlur={e => e.target.style.border = '2px solid #e2e8f0'}
            />
          </div>
        ))}

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block', color: '#555',
            fontSize: '13px', fontWeight: 'bold', marginBottom: '8px',
          }}>
            🎭 Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%', padding: '14px 15px',
              borderRadius: '10px', border: '2px solid #e2e8f0',
              fontSize: '14px', boxSizing: 'border-box',
              background: 'white', outline: 'none',
            }}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #0f3460, #533483)',
            color: 'white', border: 'none',
            borderRadius: '10px', fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold', marginBottom: '20px',
            boxShadow: '0 5px 15px rgba(15,52,96,0.3)',
          }}
          onMouseEnter={e => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          {loading ? '⏳ Creating Account...' : '✅ Create Account'}
        </button>

        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', margin: 0 }}>
          Already have account?{' '}
          <span
            onClick={() => navigate('/')}
            style={{ color: '#0f3460', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;