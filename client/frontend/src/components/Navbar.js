import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('pass');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/login')
    }
    function links(role) {
        if (role == 'ADMIN') {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className='nav-link' to='/admin/dashboard'>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/admin/customerData'>Customer Data</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/admin/loanCard'>Loan Card</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/admin/itemData'>Item Data</Link>
                    </li>
                </ul>
            )
        }
        else if (role == "EMP") {
            return (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className='nav-link' to='/employee/dashboard'>Dashboard</Link>
                    </li>

                    <li className="nav-item">
                        <Link className='nav-link' to='/employee/viewLoan'>View Loans</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/employee/applyLoan'>Apply for Loan</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/employee/viewItem'>Items Purchased</Link>
                    </li>
                </ul>
            )
        }
        else{
            return(
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className='nav-link' to='/'>Home</Link>
                    </li>
            </ul>
            )
        }

    }
    // console.log("NAVBAR ROLE"+localStorage.getItem('role'))
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${localStorage.getItem('role') == 'ADMIN' ? 'light' : 'dark'} bg-${localStorage.getItem('role') == 'ADMIN' ? 'light' : 'dark'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ fontWeight: "35px" }}>MAPAP</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {links(localStorage.getItem('role'))}

                        {!localStorage.getItem('token') ?
                            <form className="d-flex ">
                                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-1" to="/register" role="button">Signup</Link>
                            </form> :
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Link to='/' style={{ textDecoration: 'none', color: 'grey', margin: "auto" }}> {localStorage.getItem('user')}</Link>
                                <button onClick={handleLogout} className='btn btn-primary mx-2'>Logout</button>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar