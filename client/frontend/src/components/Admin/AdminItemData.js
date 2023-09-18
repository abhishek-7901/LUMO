import React from 'react'
import { useState, useEffect } from 'react'
import { Accordion, Button, Container, Form, Row, Col } from 'react-bootstrap'

const AdminItemData = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    getItemData()
    // console.log(items)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const item = Object.fromEntries(data.entries())
    console.log("TEST", item)
    let itemId = item.itemId
    let category = item.category
    let description = item.description
    let value = item.value
    let make = item.make
    let itemData = { itemId, category, description, value, make }
    const response = await fetch('http://localhost:9191/admin/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      },
      body: JSON.stringify(itemData)
    })
    const responseData = await response.json()
    console.log(responseData.Success)

    if (responseData.Success) {
      alert("Item added successfully")
      getItemData()
    }
    else {
      alert("Item not added")
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
    return status == false ? "N" : "Y"
  }
  return (
    <div>
      <Accordion style={{ margin: "20px" }} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add a new Item</Accordion.Header>
          <Accordion.Body>
            {/* <Register /> */}
            <Container style={{ width: "80%", margin: "10px auto", justifyContent: "center" }}>
              <h1 style={{ verticalAlign: "middle", textAlign: 'center' }}>Item Data Management</h1>
              <Form onSubmit={handleSubmit}>

                {/* Item ID and Item Category  */}
                <Row className="">
                  <Col>
                    {/* Item ID */}
                    <Form.Group className="" controlId="formBasicItemID">
                      <Form.Label>Item ID</Form.Label>
                      <Form.Control name='itemId' type="text" placeholder="Enter Item ID" />
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* Item Category */}
                    <Form.Group className="" controlId="formBasicItemCategory">
                      <Form.Label>Item Category</Form.Label>
                      {/* DropDown for Item Category */}
                      <Form.Select name='category' aria-label="Default select example">
                        <option>Open this select menu</option>
                        {/* Furniture crockery and stationary */}
                        <option value="Furniture">Furniture</option>
                        <option value="Crockery">Crockery</option>
                        <option value="Stationary">Stationary</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Item Description and Item Cost */}
                <Row className="">
                  <Col>
                    {/* Item Description */}
                    <Form.Group className="" controlId="formBasicItemDescription">
                      <Form.Label>Item Description</Form.Label>
                      <Form.Control name='description' type="text" placeholder="Enter Item Description" />
                    </Form.Group>
                  </Col>
                  <Col>

                    {/* Item Cost */}
                    <Form.Group className="" controlId="formBasicItemCost">
                      <Form.Label>Item Cost</Form.Label>
                      <Form.Control name='value' type="text" placeholder="Enter Item Cost" />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Item Make */}
                <Row className="">
                  <Col>

                    {/* Item Make */}
                    <Form.Group className="" controlId="formBasicItemMake">
                      <Form.Label>Item Make</Form.Label>
                      {/* Dropdown with wood, glass, plastic, paper */}
                      <Form.Select name='make' aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="Wood">Wood</option>
                        <option value="Glass">Glass</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                  </Col>
                </Row>
                {/* Submit Button */}
                <Button className="mt-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Item Data Table</Accordion.Header>
          <Accordion.Body>
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