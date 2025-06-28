import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => setError('Failed to fetch users.'));
  }, []);

  return (
<div className="view-users-container">
  <h2 className="view-users-title">All Registered Users</h2>
  {error && <p className="view-users-error">{error}</p>}
  <div className="view-users-grid">
    {users.map(user => (
      <div key={user._id} className="view-users-card">
        <img src={`http://localhost:5000/${user.image}`} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default ViewUsers;
