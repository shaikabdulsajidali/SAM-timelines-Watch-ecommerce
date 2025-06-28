import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box-wrapper">
        <div className="login-image"></div>

        <div className="login-box">
          <h2 className="login-heading">Login into account</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/signup" className="forgot-password">Forget Password?</a>
            </div>
            <button type="submit" className="login-button">LOGIN</button>
          </form>

          <p className="register-link">
            Don’t have an account? <a href="/signup">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
