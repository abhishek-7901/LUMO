import React, { useEffect, useState } from 'react'

import '../../styles/ViewLoan.css'

const ViewItem = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemData()
  }, [])


  function getItemData() {
    fetch('http://localhost:9191/employee/viewItems', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      //console.log(response)
      return response.json()
    }).then(data => {
      console.log(data)
      setItems(data["ItemList"])
      // console.log(customers)
    })
  }
  return (
    <div>
      <br />

      <h2 className="text-success">Loan Management Application</h2>
      <br />
      <h3>Items Purchased</h3>
      <br />
      <div className="row justify-content-center"></div>
      <br />
      <div className="row justify-content-center">
        <table className=" w-auto">
          <thead>

            <th>Item id </th>
            <th>Category </th>
            <th>Description</th>
            <th>Make</th>
            <th>Cost</th>

          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr>
                  <td>{item.itemId}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.make}</td>
                  <td>{item.value}</td>

                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>


  )
}

export default ViewItem