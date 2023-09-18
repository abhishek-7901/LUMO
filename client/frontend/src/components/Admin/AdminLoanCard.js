import React from 'react'
import { useState, useEffect } from 'react'
import { Accordion, Button, Container, Form, Row, Col } from 'react-bootstrap'

const AdminLoanCard = () => {
  const [loanCards, setLoanCards] = useState([])
  useEffect(() => {
    console.log("WELCOME to loan card")
    getLoanCardData()
    // console.log(items)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const loanCard = Object.fromEntries(data.entries())
    console.log("TEST", loanCard)
    // fields are duration, loan_id,type and status
    let duration = loanCard.duration
    let loan_id = loanCard.loan_id
    let type = loanCard.type

    let loanCardData = { duration, loan_id, type }
    const response = await fetch('http://localhost:9191/admin/addLoanCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      },
      body: JSON.stringify(loanCardData)
    })
    const responseData = await response.json()
    console.log(responseData)
    console.log(responseData.Success)

    if (responseData.Success) {
      // alert("Loan Card added successfully")
      getLoanCardData()
    }
    else {
      // alert("Item not added")
    }
  }

  function getLoanCardData() {
    fetch('http://localhost:9191/admin/viewLoanCards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      // console.log(data["ItemList"])
      setLoanCards(data["LoanCards"])
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
          <Accordion.Header>Add a new loan card</Accordion.Header>
          <Accordion.Body>
            {/* <Register /> */}
            <Container style={{ width: "80%", margin: "10px auto", justifyContent: "center" }}>
              <h1 style={{ verticalAlign: "middle", textAlign: 'center' }}>Loan Card Management</h1>
              <Form onSubmit={handleSubmit}>
                {/* Loan ID and Loan Type */}
                <Row className="">
                  <Col>

                    {/* Loan ID */}
                    <Form.Group className="" controlId="formBasicLoanID">
                      <Form.Label>Loan ID</Form.Label>
                      <Form.Control name='loan_id' type="text" placeholder="Enter Loan ID" />
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* Loan Type */}
                    <Form.Group className="" controlId="formBasicLoanType">
                      <Form.Label>Loan Type</Form.Label>
                      {/* Dropdown with furniture, crockery and stationary */}
                      <Form.Select name='type' aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Crockery">Crockery</option>
                        <option value="Stationary">Stationary</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {/* Loan Duration */}
                <Row className="">
                  <Col>
                    <Form.Group className="" controlId="formBasicLoanDuration">
                      <Form.Label>Loan Duration</Form.Label>
                      <Form.Control name='duration' type="text" placeholder="Enter Loan Duration" />
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
          <Accordion.Header>Loan Card Table</Accordion.Header>
          <Accordion.Body>
            <div style={{ textAlign: "center", justifyContent: "center" }}>
              <table className="table table-success w-auto" style={{ margin: "auto" }}>
                <thead>
                  <tr className="table-danger">
                    <th>Loan Card ID</th>
                    <th>Loan Type</th>
                    <th>Loan Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loanCards.map(
                    loanCard =>
                      <tr key={loanCard.id}>
                        <td>{loanCard.loan_id}</td>
                        <td>{loanCard.type}</td>
                        <td>{loanCard.duration}</td>
                      </tr>
                  )}

                </tbody>
              </table>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}


export default AdminLoanCard