import React from 'react'
import { useState, useEffect } from 'react'
import { Accordion, Button, Container, Form, Row, Col } from 'react-bootstrap'

const AdminItemData = () => {
  const [items, setItems] = useState([])
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    getItemData()
    // console.log(items)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const item = Object.fromEntries(data.entries())
    let itemId = item.itemId
    let category = item.category
    let description = item.description
    let value = item.value
    let make = item.make
    let itemData = { itemId, category, description, value, make }
    // console.log("TEST", item)
    const response = await fetch('http://localhost:9191/admin/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      },
      body: JSON.stringify(itemData)
    })
    const responseData = await response.json()
    console.log(responseData)

    if (responseData.Success) {
      setErrorMsg("")
      setSuccessMsg("Item added successfully")
      setTimeout(() => {
        setSuccessMsg("")
      }, 3000)
      getItemData()
      e.target.reset();
    }
    else {
      setSuccessMsg("")
      setErrorMsg("Item not added since : " + responseData.Reason)
    }
  }

  function getItemData() {
    fetch('http://localhost:9191/admin/viewItems', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      // console.log(data["ItemList"])
      setItems(data["ItemList"])
      // console.log(items)
      // setCustomers(data["EmployeeList"])
      // console.log(customers)
    })
  }

  function statuscheck(status) {
    return status == false ? "Unavailed" : "Availed"
  }
  return (
    <div>
      <h1 style={{ verticalAlign: "middle", textAlign: 'center', margin: '10px auto' }}>Item Data Management</h1>
      <Accordion style={{ margin: "20px" }} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add a new Item</Accordion.Header>
          <Accordion.Body>
            <h2 style={{ verticalAlign: "middle", textAlign: 'center' }}>Add a new Item</h2>
            {/* <Register /> */}
            <Container style={{ width: "80%", margin: "10px auto", justifyContent: "center" }}>
              <Form onSubmit={handleSubmit}>

                {/* Item ID and Item Category  */}
                <Row className="">
                  <Col>
                    {/* Item ID */}
                    <Form.Group className="" controlId="formBasicItemID">
                      <Form.Label style={{ marginTop: "10px" }}>Item ID</Form.Label>
                      <Form.Control name='itemId' type="text" required placeholder="Enter Item ID" />
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* Item Category */}
                    <Form.Group className="" controlId="formBasicItemCategory">
                      <Form.Label style={{ marginTop: "10px" }}>Item Category</Form.Label>
                      {/* Normal text input */}
                      <Form.Control name='category' type="text" required placeholder="Enter Item Category" />
                      {/* DropDown for Item Category */}
                      {/* <Form.Select name='category' aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Crockery">Crockery</option>
                        <option value="Stationary">Stationary</option>
                      </Form.Select> */}
                    </Form.Group>
                  </Col>
                </Row>
                {/* Item Description and Item Cost */}
                <Row className="">
                  <Col>
                    {/* Item Description */}
                    <Form.Group className="" controlId="formBasicItemDescription">
                      <Form.Label style={{ marginTop: "10px" }}>Item Description</Form.Label>
                      <Form.Control name='description' type="text" required placeholder="Enter Item Description" />
                    </Form.Group>
                  </Col>
                  <Col>

                    {/* Item Cost */}
                    <Form.Group className="" controlId="formBasicItemCost">
                      <Form.Label style={{ marginTop: "10px" }}>Item Cost</Form.Label>
                      <Form.Control name='value' type="number" required placeholder="Enter Item Cost" />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Item Make */}
                <Row className="">
                  <Col>

                    {/* Item Make */}
                    <Form.Group className="" controlId="formBasicItemMake">
                      <Form.Label style={{ marginTop: "10px" }}>Item Make</Form.Label>
                      {/* Normal Text Input */}
                      <Form.Control name='make' type="text" required placeholder="Enter Item Make" />
                      {/* Dropdown with wood, glass, plastic, paper */}
                      {/* <Form.Select name='make' aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="Wood">Wood</option>
                        <option value="Glass">Glass</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                      </Form.Select> */}
                    </Form.Group>
                  </Col>
                  <Col>
                  </Col>
                </Row>
                {/* Submit Button */}
                <Button className="mt-3" variant="primary" type="submit">
                  Submit
                </Button>
                {errorMsg && <p className='error-message' style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}
                {successMsg && <p className='success-message' style={{ color: 'green', marginTop: '10px' }}>{successMsg}</p>}
              </Form>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Item Data Table</Accordion.Header>
          <Accordion.Body>
            <h2 style={{ color: 'black', marginTop: '10px', marginBottom: '10px' }}>Existing Item Data</h2>
            <div style={{ textAlign: "center", justifyContent: "center" }}>
              <table className="table table-success w-auto" style={{ margin: "auto" }}>
                <thead>
                  <tr className="table-danger">
                    <th>Item ID</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Make</th>
                    <th>Category</th>
                    <th>Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(
                    item =>
                      <tr key={item.id}>
                        <td> {item.itemId} </td>
                        <td> {item.description} </td>
                        <td> {statuscheck(item.status)} </td>
                        <td> {item.make} </td>
                        <td> {item.category} </td>
                        <td> {item.value} </td>
                      </tr>)}
                </tbody>
              </table>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}


export default AdminItemData