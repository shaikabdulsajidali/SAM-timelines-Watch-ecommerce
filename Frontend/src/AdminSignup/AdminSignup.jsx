import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminSignup.css'; 

function AdminSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', image: null });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = e => setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('image', form.image);

    try {
      await axios.post('http://localhost:5000/api/admins/signup', data);
      alert('Admin signup successful!');
      navigate('/alogin');
    } catch {
      alert('Signup failed!');
    }
  };

  return (
    <div className="admin-signup-container">
      <form className="admin-signup-form" onSubmit={handleSubmit}>
        <h2 className="admin-signup-title">Admin Signup</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="admin-signup-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="admin-signup-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="admin-signup-input"
        />
        <input
          type="file"
          onChange={handleImage}
          required
          className="admin-signup-file"
        />
        <button type="submit" className="admin-signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignup;
