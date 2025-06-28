import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

function AdminHome() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const navigate = useNavigate();

  if (!admin) {
    return <h2 className="adminhome-error">Please login as admin to continue.</h2>;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/alogin');
  };

  const handleUpdate = () => {
    navigate('/aupdate');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/images/logo1.png" alt="SAM Logo" className="sidebar-logo" />
          <h2 className="brand-name">SAM Timelines</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/add-user')}>➕ Add User</button>
          <button onClick={() => navigate('/add-admin')}>👤 Add Admin</button>
          <button onClick={() => navigate('/view-users')}>📄 View Users</button>
          <button onClick={() => navigate('/view-admins')}>📁 View Admins</button>
          <button onClick={() => navigate('/products')}>📦 Manage Products</button>
          <button onClick={() => navigate('/vieworders')}>🧾 View Orders</button>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        <header className="topbar">
          <h1>Admin Dashboard</h1>
          <div className="topbar-actions">
            <button className="update-btn" onClick={handleUpdate}>Update Profile</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {/* Admin Info */}
        <section className="admin-profile">
          <img src={`http://localhost:5000/${admin.image}`} alt="Admin" className="admin-img" />
          <h2>{admin.name}</h2>
        </section>

        {/* Dashboard Cards */}
        <section className="dashboard-grid">
          <div className="dashboard-box" onClick={() => navigate('/add-user')}>Add New User</div>
          <div className="dashboard-box" onClick={() => navigate('/add-admin')}>Add New Admin</div>
          <div className="dashboard-box" onClick={() => navigate('/view-users')}>View All Users</div>
          <div className="dashboard-box" onClick={() => navigate('/view-admins')}>View All Admins</div>
          <div className="dashboard-box" onClick={() => navigate('/products')}>Manage Products</div>
          <div className="dashboard-box" onClick={() => navigate('/vieworders')}>View All Orders</div>
        </section>
      </main>
    </div>
  );
}

export default AdminHome;
