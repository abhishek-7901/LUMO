import React from 'react'
import '../styles/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [userName, setUserName] = useState('') //userName->variabe, setter function 
  const [password, setPassword] = useState('') //state->changes rerendered
  const[errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessmMg] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!userName || !password) {
      setErrorMsg('Please enter id and password');
      return;
  }
    const user = { userName, password }
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
      setSuccessmMg('Login Successful')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    }
    else{
      setErrorMsg('Invalid Credentials');
    }
  }
  const handleUsernameChange = (argu) => {  //arrow function, handle.. holds value of function
    // console.log(argu)  //print
    setUserName(argu.target.value)
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
                onChange={handleUsernameChange} autofocus required />
              <br></br>

              <label htmlFor="Password">Password</label>
              <input type="password" name="password" minlength="6" onChange={e => setPassword(e.target.value)} required /> {/*type, name ->arg*/}
              <br></br>

              <input type="submit" value="Login" />
              {errorMsg && <p className='error-message'>{errorMsg}</p>}
              {successMsg && <p className='success-message'>{successMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login  //return value jsx which can be used as a tag value