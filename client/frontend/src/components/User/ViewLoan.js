import React, { useEffect, useState } from 'react'
// import '../../styles/ViewLoan.css'

const ViewLoan = () => {

  const [viewLoans, setViewLoan] = useState([])
  useEffect(() => {
    console.log("WELCOME to view loans")
    getViewLoan()
  }, [])

  function getViewLoan() {
    fetch('http://localhost:9191/employee/viewLoans', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      setViewLoan(data["ViewLoans"])
      
    })
  }

  return (

    
    <div style={{ textAlign: "center", justifyContent: "center" }}>
      <table className="table table-success w-auto" style={{ margin: "auto" }}>
        <thead>
          <tr className="table-danger">
            <th>Loan ID</th>
            <th>Loan Type</th>
            <th>Loan Duration</th>
            {/* <th>Card Issue Date</th> */}
          </tr>
        </thead>
        <tbody>
          {viewLoans?.map(
            viewLoan =>
              <tr key={viewLoan.id}>
                <td>{viewLoan.loanId}</td>
                <td>{viewLoan.type}</td>
                <td>{viewLoan.duration}</td>
                {/* <td>{viewLoan.date}</td> */}
              </tr>
          )}

        </tbody>
      </table>
    </div>
    
  )
}

export default ViewLoan