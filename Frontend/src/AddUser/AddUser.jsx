import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddUser.css'; 

function AddUser() {
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
      await axios.post('http://localhost:5000/api/users/signup', formData);
      navigate('/aupdate2');
      setMessage('User added successfully!');
      setForm({ name: '', email: '', password: '', image: null });
    } catch (err) {
      setMessage('Failed to add user.');
    }
  };

  return (
    <div className='add-user-container-main'>
    <div className="add-user-container">
      <h2 className="add-user-title">Add New User</h2>
      <form className="add-user-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          className="add-user-input" 
          name="name" 
          placeholder="Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="add-user-input" 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="add-user-input" 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="add-user-input" 
          name="image" 
          type="file" 
          onChange={handleChange} 
          required 
        />
        <button className="add-user-button" type="submit">Add User</button>
      </form>
      {message && <p className="add-user-message">{message}</p>}
    </div>
    </div>
  );
}

export default AddUser;
