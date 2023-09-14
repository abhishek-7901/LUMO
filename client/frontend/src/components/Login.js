import React from 'react'
import '../styles/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async e=> {
    e.preventDefault()
    const user = {userName, password}
    const response = await fetch('http://localhost:9191/employee/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    console.log(data)
    console.log(data["Success"])
    if (data.login === true) {
      navigate('/dashboard')
    }
  }
  return (
    <div>
      {/* Login Card */}
      <div className="login-card">
        <div className="login-card-body">
          <h5 className="login-card-title">Login</h5>
          <form onSubmit={handleSubmit} autocomplete="on">
            <div className="form-group">
              <label htmlFor="userName">userName</label>
              <input type="text" name="userName" /*minlength="6" maxlength="12"*/ 
              onChange={e=> setUserName(e.target.value)} autofocus  required />
              <br></br>
              <label htmlFor="Password">Password</label>
              <input type="password" name="password" minlength="6" onChange={e=> setPassword(e.target.value)} required />
              <br></br>
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login