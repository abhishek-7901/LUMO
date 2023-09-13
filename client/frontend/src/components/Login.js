import React from 'react'
import '../styles/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async e=> {
    e.preventDefault()
    const user = {employeeId, password}
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
    if (data["Success"] === "Login Successful") {
      navigate('/dashboard')
    }
  }
  return (
    <div>
      {/* Login Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="employeeId">employeeId</label>
              <input type="text" name="employeeId" onChange={e=> setEmployeeId(e.target.value)} required />
              <br></br>
              <label htmlFor="Password">Password</label>
              <input type="password" name="password" onChange={e=> setPassword(e.target.value)} required />
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