import React from 'react'
import '../styles/Login.css'
const Login = () => {
  return (
    <div>
      {/* Login Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form>
            <div className="form-group">
              <label for="Username">Username</label>
           <input type="text" name="username" />
            <br></br>
            <label for="Password">Password</label>
              <input type="password" name="password" />
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