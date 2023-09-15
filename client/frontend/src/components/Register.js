import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [email, setEmail] = useState('') //userName->variabe, setter function 
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password_Conf, setPasswordConf] = useState('')
  const navigate = useNavigate()

  var check = function() {
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
    if(password==password_Conf)
    {
      const user = { email, userName, password }
      const response = await fetch('http://localhost:9191/employee/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      console.log(data)
      console.log(data["Success"])
      if (data.Register === true) {
        navigate('/dashboard')
      }
    }
  }

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
              Email: <input type="email" name="email"
              onChange={e=>setEmail(e.target.value)} pattern={'/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/'} title="Invalid email address"  required/>
              <br></br>
            Username: <input type="text" name="username" minlength="6" maxlength="20" required />
            <br></br>
            Password:  <input type="password" name="password" minlength="6" maxlength="20" onChange={e=> setPassword(e.target.value)} onkeyup='check();' required />
              <br></br>
              Confirm Password:  <input type="password" name="passwordconf" minlength="6" maxlength="20" onChange={e => setPassword(e.target.value)} onkeyup='check();' required />
              <span id='message'></span>
            <br></br>
              <input type="submit" value="Submit"
              onSubmit={handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register