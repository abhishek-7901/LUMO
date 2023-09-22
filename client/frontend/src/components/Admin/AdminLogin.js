import React from 'react'
import '../../styles/Login.css'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [userName, setUserName] = useState('') //userName->variabe, setter function 
  const [password, setPassword] = useState('') //state->changes rerendered
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessmMg] = useState('');
  const navigate = useNavigate()
  const user = { userName, password }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9191/admin/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      localStorage.setItem('pass', user.password);
      localStorage.setItem('role', 'ADMIN')
      localStorage.setItem('user', user.userName);
      setErrorMsg('')
      setSuccessmMg('Admin Login Successful')
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 2000);

    }
    else if(json.Reason==="Check Credentials") {
     setErrorMsg('Invalid Credentials');
    }
    else{
      setErrorMsg('Not an authorized Admin');
    }
  }

  const handleUsernameChange = (argu) => {  //arrow function, handle.. holds value of function
    // console.log(argu)  //print
    setUserName(argu.target.value)
  }
  return (
    <div className='bgfull'>
      <div className='login-body'>
        {/* Login Card */}
        <div className="login-card container"  style={{marginTop:'18vh',marginBottom:'15vh'}}>
          <div className="login-card-body">
            <h5 className="login-card-title" style={{paddingTop:'15px'}}>Admin Login</h5>
            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="form-group">

                <label htmlFor="userName">Username</label>
                <input type="text" className='login-input' name="userName"
                  onChange={handleUsernameChange} autoFocus required />
                <br></br>

                <label htmlFor="Password">Password</label>
                <input type="password" name="password" className='login-input' onChange={e => setPassword(e.target.value)} required /> {/*type, name ->arg*/}
                <br></br>

                <Link to='/login' style={{ textDecoration: "none",display:"block",marginBottom:'5px' }}>Are you an Employee?</Link>

                <input type="submit" value="Login" className='login-input' style={{backgroundColor:'#ff7d00',color:'#fff',fontSize:'20px'}}/>
                {errorMsg && <p className='error-message' style={{color:'red'}}>{errorMsg}</p>}
                {successMsg && <p className='success-message' style={{color:'green'}}>{successMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin  //return value jsx which can be used as a tag value