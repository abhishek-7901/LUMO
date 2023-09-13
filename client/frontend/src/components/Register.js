import React from 'react'

const Register = () => {
  return (
    <div>
      {/* Register Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Register</h5>
          {/* Need to implement minimum length for each field, 
          and email regex for the email field, 
          also have to take password twice, and match the both of them "like confirm password"  */}
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