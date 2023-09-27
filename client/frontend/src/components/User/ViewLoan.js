import React, { useEffect, useState } from 'react'
// import '../../styles/ViewLoan.css'

const ViewLoan = () => {


  const [loans, setLoans] = useState([]);

  useEffect(() => {
    getLoanData()
  }, [])


  function getLoanData() {
    fetch('http://localhost:9191/employee/viewLoans', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      //console.log(response)
      return response.json()
    }).then(data => {
      console.log(data)
      setLoans(data["LoanList"])
      // console.log(customers)
    })
  }

  return (
    <div>
      <br />
      <h2 className=" text-success">Loan Management Application</h2>
      <br />
      <h3>Loan Cards Availed</h3>
      <br />
      <div className="row justify-content-center"></div>
      <br />
      <div className="row justify-content-center">
        <table className=" w-auto">
          <thead>

            <th>Loan id </th>
            <th>Loan type </th>
            <th>Duration </th>
            {/* <th>Card Issue date </th> */}

          </thead>
          <tbody>
            {loans.map((loan) => {
              return (
                <tr>
                  <td>{loan.loanId}</td>
                  <td>{loan.type}</td>
                  <td>{loan.duration}</td>
                  {/* <td>{loan.cardIssueDate}</td> */}
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>

    </div>

  )
}

export default ViewLoan