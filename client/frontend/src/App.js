import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ApplyLoan from './components/ApplyLoan';
import ViewLoan from './components/ViewLoan';
import ViewItem from './components/ViewItem';
function App() {
  // const [token, setToken] = useState()
  // if (!token) {
  //   return <LoginPage setToken={setToken} />
  // }
  return (
    <Router>
      <div className="App">


        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/applyLoan' element={<ApplyLoan />} />
          <Route path='/viewLoan' element={<ViewLoan />} />
          <Route path='/viewItem' element={<ViewItem />} />
          <Route path='*' element={<h1>Not Found</h1>} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
