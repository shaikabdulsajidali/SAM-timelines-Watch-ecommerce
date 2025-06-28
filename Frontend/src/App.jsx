import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import AdminSignup from './AdminSignup/AdminSignup';
import AdminLogin from './AdminLogin/AdminLogin';
import AdminProfile from './AdminProfile/AdminProfile';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import AdminUpdateProfile from './AdminUpdateProfile/AdminUpdateProfile';
import AdminHome from './AdminHome/AdminHome';
import AddAdmin from './AddAdmin/AddAdmin';
import AddUser from './AddUser/AddUser';
import ManageProducts from './ManageProducts/ManageProducts';         
import Invoice from './Invoice/Invoice';
import Hero from './Hero/Hero'
import ViewAdmins from './ViewAdmins/ViewAdmins';
import ViewUsers from './ViewUsers/ViewUsers';
import ViewOrders from './ViewOrders/ViewOrders';


function App() {
  return (
    <Router>
      

      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/hero' element={<Hero/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/asignup" element={<AdminSignup />} />
        <Route path="/alogin" element={<AdminLogin />} />
        <Route path="/aprofile" element={<AdminProfile />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/aupdate" element={<AdminUpdateProfile />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/products" element={<ManageProducts />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path='/view-admins' element={<ViewAdmins/>}/>
        <Route path='/view-users' element={<ViewUsers/>}/>
    
        
        
        <Route path='/vieworders' element={<ViewOrders/>}/>
      </Routes>
    </Router>
  );
}

export default App;
