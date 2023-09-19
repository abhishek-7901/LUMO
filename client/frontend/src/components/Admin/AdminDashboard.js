import React from 'react'
import '../../styles/UserDashboard.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AdminDashboard = () => {
    return (
    <div>
      <div className='user-dashboard-header'>
        <h1>AdminDashboard</h1>
      </div>
      <div className='user-dashboard-container'>

        <div className="row">
          <div className="col-sm-4">
            <Link to='/admin/customerData' style={{ textDecoration: "none" }}>
              <div className="user-dashboard-card card-center">
                <div className="user-dashboard-card-body">
                  <h5 className="user-dashboard-card-title">Customer Data Management</h5>
                  <p className="user-dashboard-card-text">Manage all the customer's data.</p>

                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/admin/loanCard' style={{ textDecoration: "none" }}>
              <div className="user-dashboard-card">
                <div className="user-dashboard-card-body">
                  <h5 className="user-dashboard-card-title">Loan Card<br></br> Management</h5>
                  <p className="user-dashboard-card-text">Manage and handle all the loan cards.</p>

                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/admin/itemData' style={{ textDecoration: "none" }}>
              <div className="user-dashboard-card">
                <div className="user-dashboard-card-body">
                  <h5 className="user-dashboard-card-title">Items Data <br></br>Management</h5>
                  <p className="user-dashboard-card-text">Manage and handle all the loan cards.</p>

                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div >

  )
}

export default AdminDashboard