import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css'
import { useEffect } from 'react';
const Register = () => {

  const [email, setEmail] = useState('') //userName->variabe, setter function 
  const [userName, setUserName] = useState('')
  const [dob, setDob] = useState('')
  const [doj, setDoj] = useState('')
  const [password, setPassword] = useState('')
  const [password_Conf, setPasswordConf] = useState('')
  const [gender, setGender] = useState('')
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessmMg] = useState('');
  const navigate = useNavigate()

  var check = function () {
    if (document.getElementById('password').value ==
      document.getElementById('passwordconf').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'matching';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (password == password_Conf) {

      let name = userName

      const user = { email, name, dob, doj, password, gender }

      const response = await fetch('http://localhost:9191/employee/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const json = await response.json()
      console.log(json);
      if (json["EmplyeeDetails"].name) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        setSuccessmMg('Registeration Successful')
        setTimeout(() => {
          navigate('/employee/dashboard')
        }, 2000)
      }
      else {
        setErrorMsg('Registeration Failed');
      }

    }
  }

  useEffect(() => {
    document.title = 'Signup'
  }, [])
  return (
    <div className='login-body bgfull' style={{ paddingTop: "5vh" }}>
      {/* Register register-card */}
      <div className="login-card">
        <div className="login-card-body">
          <h5 className="login-card-title">Register</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* Email: <input type="email" name="email" onChange={e => setEmail(e.target.value)} */}
              {/* // pattern={'/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/'}  */}
              {/* title="Invalid email address" required /> */}

              Username:  <input type="text" name="username" className='login-input' minlength="6" maxlength="20" onChange={e => setUserName(e.target.value)} onkeyup='check();' required />
              <br></br>

              Password:  <input type="password" name="password" className='login-input' minlength="6" maxlength="20" onChange={e => setPassword(e.target.value)} onkeyup='check();' required />
              <br></br>
              Confirm Password:  <input type="password" className='login-input' name="passwordconf" minlength="6" maxlength="20" onChange={e => setPasswordConf(e.target.value)} onkeyup='check();' required />
              <span id='message'></span>
              <br></br>

              Date of Birth: <input type="date" name="dob" className='login-input' onChange={e => setDob(e.target.value)} required />
              <br></br>
              Date of Joining: <input type="date" name="doj" className='login-input' onChange={e => setDoj(e.target.value)} required />
              <br></br>
              Gender (M or F): <input type="text" name="dob" className='login-input' onChange={e => setGender(e.target.value)} required />

              <br></br>

              <input type="submit" className='login-input-btn'  value="Submit" />
              {errorMsg && <p className='error-message'>{errorMsg}</p>}
              {successMsg && <p className='success-message'>{successMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register