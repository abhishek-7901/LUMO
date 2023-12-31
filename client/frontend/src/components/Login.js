import React, { useEffect } from 'react'
import '../styles/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = () => {
  const [userName, setUserName] = useState('') //userName->variabe, setter function 
  const [password, setPassword] = useState('') //state->changes rerendered
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessmMg] = useState('');
  const navigate = useNavigate()
  const user = { userName, password }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9191/employee/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const json = await response.json()
    console.log(json);

    // console.log("USERBODY"+userBody.name)
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('pass', user.password);
      localStorage.setItem('user', json["EmployeeDetails"].name);
      localStorage.setItem('role', json["EmployeeDetails"].role);
      localStorage.setItem('empId', json["EmployeeDetails"].employeeId);
      localStorage.setItem('department', json["EmployeeDetails"].department);
      localStorage.setItem('designation', json["EmployeeDetails"].designation);
      console.log(localStorage.getItem('empId'))
      setErrorMsg('')
      setSuccessmMg('Login Successful')
      setTimeout(() => {
        navigate('/employee/dashboard')
      }, 2000);

    }
    else {
      setErrorMsg('Invalid Credentials');
    }
  }
  useEffect(() => {
    document.title = 'Login'
  }, [])
  
  const handleUsernameChange = (argu) => {  //arrow function, handle.. holds value of function
    // console.log(argu)  //print
    setUserName(argu.target.value)
  }
  return (
    <div className="bgfull">
      <div className='login-body'>
        {/* Login Card */}
        <div className="login-card container" style={{ marginTop: '10vh' }}>
          <div className="login-card-body">
            <h5 className="login-card-title " style={{ paddingTop: '15px' }}>Login</h5>
            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="form-group">

                <label style={{ paddingBottom: '5px' }} htmlFor="userName">Username</label>
                <input type="text" name="userName" className='login-input' style={{ textAlign: 'center' }}
                  onChange={handleUsernameChange} autoFocus required />
                <br></br>

                <label htmlFor="Password">Password</label>
                <input type="password" name="password" style={{ textAlign: 'center' }} className='login-input' onChange={e => setPassword(e.target.value)} required /> {/*type, name ->arg*/}
                <br></br>

                <Link to='/admin/login' style={{ textDecoration: "none", display: "block", marginBottom: '5px' }}>Are you an Admin?</Link>

                <input type="submit" value="Login" className='login-input-btn'/>
                {errorMsg && <p className='error-message' style={{ color: 'red' }}>{errorMsg}</p>}
                {successMsg && <p className='success-message' style={{ color: 'green' }}>{successMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login  //return value jsx which can be used as a tag value