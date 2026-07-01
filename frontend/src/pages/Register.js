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
        name: name,
        email: email,
        password: password,
        role: role
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
        }}>Create Your Account</p>

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
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box',
            background: 'white',
          }}
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
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
            marginBottom: '15px',
          }}
        >
          {loading ? 'Registering...' : 'Create Account'}
        </button>

        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '14px',
        }}>
          Already have account?{' '}
          <span
            onClick={() => navigate('/')}
            style={{
              color: '#0f3460',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;