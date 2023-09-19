import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Protected = ({children}) => {
    let navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login')
        }
    },[])
  return children
}

export default Protected