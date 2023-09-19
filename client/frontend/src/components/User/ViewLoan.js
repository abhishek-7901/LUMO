import React, { useEffect, useState } from 'react'
import '../styles/ViewLoan.css'

const ViewLoan = () => {

  const [loans,setLoans] = useState([]);

  // useEffect(() => {

  //   return cleanUp = () => {

  //   }
  // },[])

  const fetchLoans = () => {
    // 
  }
  return (
    <div>
      <br/>

      <h2 className="text-success">Loan Management Application</h2>
      <br/>
      <h3>Loan Cards Availed</h3>
      <br/>
        <div className="row justify-content-center"></div>
      <br/>
      <div className="row justify-content-center">
        <table className="table table-success w-auto">
          <thead>
            <tr>
              <th>Loan id </th>
              <th>Loan type </th>
              <th>Duration </th>
              <th>Card Issue date </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>L00001 </td>
              <td>Furniture </td>
              <td>5 </td>
              <td>1/1/2002 </td>
            </tr>
            <tr>
              <td>L00001 </td>
              <td>Furniture </td>
              <td>5 </td>
              <td>1/1/2002 </td>
            </tr>
            <tr>
              <td>L00001 </td>
              <td>Furniture </td>
              <td>5 </td>
              <td>1/1/2002 </td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>
    
  )
}

export default ViewLoan