import React, { useState } from 'react';
import './UpdateProfile.css';

function UpdateProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (email) formData.append('email', email);
    if (password) formData.append('password', password);
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        body: formData,
      });

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('❌ Something went wrong!');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="update-wrapper">
      <div className="update-glass-card">
        <h2 className="title">Update Profile</h2>
        <p className="subtitle">Keep your details up-to-date</p>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-img" />
          </div>
        )}

        <form onSubmit={handleUpdate} encType="multipart/form-data" className="update-form">
          <div className="form-group">
            <label><i className="fas fa-user"></i> Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-envelope"></i> New Email</label>
            <input
              type="email"
              placeholder="Enter new email (optional)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-lock"></i> New Password</label>
            <input
              type="password"
              placeholder="Enter new password (optional)"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><i className="fas fa-image"></i> Profile Picture</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <button type="submit" className="update-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
