import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';

function AdminProfile() {
  const adminData = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();

  if (!adminData) {
    return <h2 className="adminprofile-error">No admin data found. Please login.</h2>;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/alogin');
  };

  const goToUpdate = () => {
    navigate('/aupdate');
  };

  return (
    <div className="adminprofile-wrapper">
      <div className="adminprofile-card">
        <h2 className="adminprofile-heading">Welcome, {adminData.name}</h2>

        <img
          src={`http://localhost:5000/${adminData.image}`}
          alt="Admin"
          className="adminprofile-image"
        />

        <div className="adminprofile-buttons">
          <button onClick={goToUpdate} className="adminprofile-btn update">Update Profile</button>
          <button onClick={handleLogout} className="adminprofile-btn logout">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
