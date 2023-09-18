import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AdminProtected = ({children}) => {
    let navigate = useNavigate();
    useEffect(()=>{
        console.log("ENTERING HERE"+localStorage.getItem('token')+"ROLE"+localStorage.getItem('role'))
        // if(!localStorage.getItem('token') && localStorage.getItem('role')!='Admin')
        if(localStorage.getItem('role')!='Admin')
        {
            navigate('/login')
            alert("You are not authorized to access this page")
            localStorage.removeItem('token');
            localStorage.removeItem('pass');
        }
    },[])
  return children
}

export default AdminProtected