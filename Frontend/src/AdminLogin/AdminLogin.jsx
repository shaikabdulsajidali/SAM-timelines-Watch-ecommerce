import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; 

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admins/login', { email, password });
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      navigate('/adminhome', { state: { admin: res.data.admin } });
    } catch {
      alert('Login failed!');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2 className="admin-login-title">Admin Login</h2>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="admin-login-input"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="admin-login-input"
        />
        <button type="submit" className="admin-login-button">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
