import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddAdmin.css'; 

const AddAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      await axios.post('http://localhost:5000/api/admins/signup', formData);
      setMessage('🎉 Admin added successfully!');
      navigate('/aupdate2');
      setForm({ name: '', email: '', password: '', image: null });
    } catch (err) {
      setMessage('❌ Failed to add admin.');
    }
  };

  return (
    <div className='add-admin-container-main'>
      <div className="add-admin-container">
        <h2 className="add-admin-title">Add New Admin</h2>
        <form className="add-admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
          
          <label className="add-admin-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter admin name"
            className="add-admin-input"
            required
          />

          <label className="add-admin-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="add-admin-input"
            required
          />

          <label className="add-admin-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create password"
            className="add-admin-input"
            required
          />

          <label className="add-admin-label">Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="add-admin-input"
            required
          />

          <button type="submit" className="add-admin-button">Add Admin</button>
        </form>

        {message && <p className="add-admin-message">{message}</p>}
      </div>
    </div>
  );
};

export default AddAdmin;
