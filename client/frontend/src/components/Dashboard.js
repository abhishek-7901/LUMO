import React from 'react'
import '../styles/Dashboard.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  let navigate = useNavigate();
  useEffect(()=>{
      if(!localStorage.getItem('token'))
      {
          navigate('/login')
      }
  },[])
  
  return (
    <div>
      <div className='dashboard-header'>
        <h1>Dashboard</h1>
      </div>
      <div className='dashboard-container'>

        <div className="row">
          <div className="col-sm-4">
            <Link to='/viewLoan' style={{ textDecoration: "none" }}>
              <div className="dashboard-card card-center">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">View Loanss</h5>
                  <p className="dashboard-card-text">See all the loan cards of a particular loan employee.</p>

                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/applyLoan' style={{ textDecoration: "none" }}>
              <div className="dashboard-card">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">Apply for Loans</h5>
                  <p className="dashboard-card-text">Select a product and apply for a loan.</p>

                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/viewItem' style={{ textDecoration: "none" }}>
              <div className="dashboard-card">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">View Items Purchased</h5>
                  <p className="dashboard-card-text">Display all the items purchased.</p>

                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div >

  )
}

export default Dashboard