import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react';
import Navbar from './components/Navbar';
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
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
