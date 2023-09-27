import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AdminProtected = ({ children }) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('role') != 'ADMIN') {
            navigate('/admin/login')
            alert("You are not authorized to access this page")
            localStorage.removeItem('token');
            localStorage.removeItem('pass');
        }
    }, [])
    return children
}

export default AdminProtected