import React from 'react'
import Login from './Login'
import Register from './Register'

const LoginPage = () => {
  return (
    <div>
       
        <div style={{width: '50%', float:"left"}}>
            <div style={{width: '100%'}}>
                <div>
                    {/* <h1 style={{color: 'white', textAlign: 'center'}}>Login</h1> */}
                    <Login></Login>
                </div>
            </div>
        </div>
        
        <div style={{width: '50%', float:"right"}}>
            <div style={{width: '100%'}}>
                <div >
                    {/* <h1 style={{color: 'white', textAlign: 'center'}}>Register</h1> */}
                    <Register></Register>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage