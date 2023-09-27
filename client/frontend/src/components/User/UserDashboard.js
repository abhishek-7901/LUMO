import React from 'react'
import '../../styles/UserDashboard.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const UserDashboard = () => {
  useEffect(() => {
    document.title = 'Employee Dashboard'
  }, [])
  return (
    <div>
      <div className='user-dashboard-header'>
        <h1>User Dashboard</h1>
      </div>
      <div className='user-dashboard-container'>

        <div className="row">
          <div className="col-sm-4">
            <Link to='/employee/viewLoan' style={{ textDecoration: "none" }}>
              <div className="user-dashboard-card card-center login-card">
                <div className="user-dashboard-card-body">
                  <h5 className="user-dashboard-card-title">View Loans</h5>
                  <p className="user-dashboard-card-text" style={{ color: 'black' }}>See all the loan cards of a particular loan employee.</p>

                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/employee/applyLoan' style={{ textDecoration: "none" }}>
              <div className="user-dashboard-card login-card">
                <div className="user-dashboard-card-body">
                  <h5 className="user-dashboard-card-title">Apply for Loans</h5>
                  <p className="user-dashboard-card-text" style={{ color: 'black' }}>Select a product and apply for a loan.</p>

                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/employee/viewItem' style={{ textDecoration: "none" }}>
              <div className="user-dashboard-card login-card">
                <div className="user-dashboard-card-body">
                  <h5 className="user-dashboard-card-title">View Items Purchased</h5>
                  <p className="user-dashboard-card-text" style={{ color: 'black' }}>Display all the items purchased.</p>

                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div >

  )
}

export default UserDashboard