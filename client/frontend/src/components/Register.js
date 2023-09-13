import React from 'react'

const Register = () => {
  return (
    <div>
      {/* Register Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Register</h5>
          <form>
            <div className="form-group">
              Email: <input type="text" name="email" />
              <br></br>
            Username: <input type="text" name="username" />
            <br></br>
            Password:  <input type="password" name="password" />
            <br></br>
            <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register