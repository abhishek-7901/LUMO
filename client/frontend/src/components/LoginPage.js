import React from 'react'
import Login from './Login'
import Register from './Register'

const LoginPage = () => {
  return (
    <div className='container'>
       
        {/* <div style={{width: '50%', float:"left"}}>
            <div style={{width: '100%'}}>
                <div>
                    <Login></Login>
                </div>
            </div>
        </div>
        
        <div style={{width: '50%', float:"right"}}>
            <div style={{width: '100%'}}>
                <div >
                    <Register></Register>
                </div>
            </div>
        </div> */}
        <Login></Login>
    </div>
  )
}

export default LoginPage