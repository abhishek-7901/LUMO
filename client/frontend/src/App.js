import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/User/UserDashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ApplyLoan from './components/User/ApplyLoan';
import ViewLoan from './components/User/ViewLoan';
import ViewItem from './components/User/ViewItem';
import Protected from './components/Protected';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminCustomerData from './components/Admin/AdminCustomerData';
import AdminLoanCard from './components/Admin/AdminLoanCard';
import AdminItemData from './components/Admin/AdminItemData';
import AdminProtected from './components/AdminProtected';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/employee/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='/employee/applyLoan' element={<Protected><ApplyLoan /></Protected>} />
          <Route path='/employee/viewLoan' element={<Protected><ViewLoan /></Protected>} />
          <Route path='/employee/viewItem' element={<Protected><ViewItem /></Protected>} />
          <Route path='/admin/dashboard' element={<AdminProtected><AdminDashboard /></AdminProtected>} />
          <Route path='/admin/customerData' element={<AdminProtected><AdminCustomerData /></AdminProtected>} />
          <Route path='/admin/loanCard' element={<AdminProtected><AdminLoanCard /></AdminProtected>} />
          <Route path='/admin/itemData' element={<AdminProtected><AdminItemData /></AdminProtected>} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
