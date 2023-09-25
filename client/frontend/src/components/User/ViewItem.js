import React, { useEffect, useState } from 'react'


const ViewItem = () => {

  const [viewItems, setViewItem] = useState([])
  useEffect(() => {
    console.log("WELCOME to view Items")
    getViewItem()
  }, [])

  function getViewItem() {
    fetch('http://localhost:9191/employee/viewItems', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      setViewItem(data["ViewItems"])
      // console.log(items)
    })
  }

  return (
    <div style={{ textAlign: "center", justifyContent: "center" }}>
      <table className="table table-success w-auto" style={{ margin: "auto" }}>
        <thead>
          <tr className="table-danger">
            <th>Item ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Make</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {viewItems?.map(
            viewitem =>
              <tr key={viewitem.id}>
                <td>{viewitem.item_id}</td>
                <td>{viewitem.category}</td>
                <td>{viewitem.description}</td>
                <td>{viewitem.make}</td>
                <td>{viewitem.value}</td>
              </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

export default ViewItem