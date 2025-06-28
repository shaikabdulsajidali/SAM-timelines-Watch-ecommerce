import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAdmins.css';

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admins')
      .then(res => setAdmins(res.data))
      .catch(err => setError('Failed to fetch admins.'));
  }, []);

  return (
    <div className="view-container">
      <h2 className="view-title">All Registered Admins</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="view-grid">
        {admins.map(admin => (
          <div key={admin._id} className="view-card">
            <img src={`http://localhost:5000/${admin.image}`} alt={admin.name} />
            <h3>{admin.name}</h3>
            <p>{admin.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAdmins;
