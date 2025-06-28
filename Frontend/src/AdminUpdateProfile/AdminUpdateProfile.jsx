import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminUpdateProfile.css'; // External CSS

function AdminUpdateProfile() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const [name, setName] = useState(admin?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (email) formData.append('email', email);
    if (password) formData.append('password', password);
    if (image) formData.append('image', image);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admins/${admin._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      localStorage.setItem('admin', JSON.stringify(res.data));
      navigate('/aprofile');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="admin-update-wrapper">
      <div className="admin-update-card">
        <h2>Update Admin Profile</h2>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>New Email (optional)</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />

          <label>New Password (optional)</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />

          <label>Update Image (optional)</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit">Update changes</button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateProfile;
