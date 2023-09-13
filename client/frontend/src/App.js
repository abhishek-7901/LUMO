import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <div className="App">
      

          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
          </Routes>
      
      </div>
    </Router>
  );
}

export default App;
