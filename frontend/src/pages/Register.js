import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

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

    if (!name || !email || !password) {
      setError('All fields required!');
      setLoading(false);
      return;
    }

    try {
      await authAPI.register({ name, email, password, role });
      alert('✅ Registration Successful! Please Login!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed!');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <div style={{ background: 'white', padding: '50px 40px', borderRadius: '20px', width: '400px', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}>
        <h1 style={{ color: '#0f3460', textAlign: 'center', marginBottom: '30px' }}>Create Account ⚙️</h1>
        
        {error && <div style={{ background: '#ffebee', color: '#c53030', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>❌ {error}</div>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>👤 Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>📧 Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>🔒 Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>🎭 Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}>
            <option>Employee</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
        </div>

        <button onClick={handleRegister} disabled={loading} style={{ width: '100%', padding: '12px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Creating...' : '✅ Register'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Have account? <span onClick={() => navigate('/')} style={{ color: '#0f3460', cursor: 'pointer', fontWeight: 'bold' }}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;