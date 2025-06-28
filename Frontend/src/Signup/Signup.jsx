import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setForm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('image', form.image);

    try {
      await axios.post('http://localhost:5000/api/users/signup', data);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert('Signup failed! Maybe email is already used.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-image"></div>

        <div className="signup-box">
          <h2 className="signup-heading">Create Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="signup-input"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="signup-input"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="signup-input"
              onChange={handleChange}
              required
            />
            <input
              type="file"
              className="signup-file"
              onChange={handleImage}
              required
            />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <p className="signup-login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
