import React from 'react'
import '../styles/Login.css'
import { useState } from 'react'
const Login = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
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
  }
  return (
    <div>
      {/* Login Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="employeeId">employeeId</label>
              <input type="text" name="employeeId" onChange={e=> setEmployeeId(e.target.value)} />
              <br></br>
              <label for="Password">Password</label>
              <input type="password" name="password" onChange={e=> setPassword(e.target.value)} />
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