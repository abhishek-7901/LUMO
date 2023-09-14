import React, { useState } from 'react'

const Register = () => {

  const [email, setEmail] = useState('') //userName->variabe, setter function 
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    }

  const handleSubmit = (e) => {
    e.preventDefault()
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
              Email: <input type="text" name="email"
              onChange={e=>setEmail(e.target.value)} pattern={'/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/'}  />
              <br></br>
            Username: <input type="text" name="username" />
            <br></br>
            Password:  <input type="password" name="password" />
            <br></br>
              <input type="submit" value="Login"
              onSubmit={handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register