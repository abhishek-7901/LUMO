import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { BiLogIn, BiLogOut, BiLogInCircle, BiHomeAlt2 } from 'react-icons/bi';

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
                        <Link className='nav-link' to='/admin/customerData'>Employee Data</Link>
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
        else {
            return (
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
                    <Link className="navbar-brand" to="/" style={{ fontWeight: "35px" }}>LoanPhilia</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {links(localStorage.getItem('role'))}

                        {!localStorage.getItem('token') ?
                            <form className="d-flex ">
                                <Link className="btn btn-primary mx-1" to="/login" role="button" style={{display:'flex',alignItems:'center'}}>Login&nbsp;<BiLogIn /></Link>
                                <Link className="btn btn-primary mx-1" to="/register" role="button" style={{display:'flex',alignItems:'center'}}>Signup&nbsp;<BiLogInCircle /></Link>
                            </form> :
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Link to={(localStorage.getItem('role') == 'ADMIN') ? "/admin/dashboard" : "/employee/dashboard"} style={{ textDecoration: 'none', color: 'grey', margin: "auto" }}><b>{(localStorage.getItem('role') == 'ADMIN') ? "Admin" : "Employee"}</b> {localStorage.getItem('user')}</Link>
                                <button onClick={handleLogout} className='btn btn-primary mx-2' style={{display:'flex',alignItems:'center'}}>Logout&nbsp; <BiLogOut /></button>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar