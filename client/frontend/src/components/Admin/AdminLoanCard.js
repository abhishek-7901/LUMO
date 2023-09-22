import React from 'react'
import { useState, useEffect } from 'react'
import { Accordion, Button, Container, Form, Row, Col } from 'react-bootstrap'

const AdminLoanCard = () => {
  const [loanCards, setLoanCards] = useState([])
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  useEffect(() => {
    // console.log("WELCOME to loan card")
    getLoanCardData()
    // console.log(items)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const loanCard = Object.fromEntries(data.entries())
    // console.log("TEST", loanCard)
    // fields are duration, loan_id,type and status
    let duration = loanCard.duration
    let loanId = loanCard.loan_id
    let type = loanCard.type

    let loanCardData = { loanId, type,duration }
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
      setErrorMsg("")
      setSuccessMsg("Loan Card added successfully")
      getLoanCardData()
      e.target.reset()
    }
    else {
      setSuccessMsg("")
      setErrorMsg("Item not added due to same loan ID")
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
    return status == false ? "Unavailed" : "Availed"
  }
  return (
    <div>
      <h1 style={{ verticalAlign: "middle", textAlign: 'center',marginTop:'20px' }}>Loan Card Management</h1>
      <Accordion style={{ margin: "20px" }} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add a new loan card</Accordion.Header>
          <Accordion.Body>
            {/* h2 header saying Add a loan card for employees to use */}
            <h2 style={{ color: 'black',marginTop:'10px', marginBottom:'10px' }}>Add a new loan card for your employees</h2>
            {/* <Register /> */}
            <Container style={{ width: "80%", margin: "10px auto", justifyContent: "center" }}>
              <Form onSubmit={handleSubmit}>
                {/* Loan ID and Loan Type */}
                <Row className="">
                  <Col>

                    {/* Loan ID */}
                    <Form.Group className="" controlId="formBasicLoanID">
                      <Form.Label>Loan ID</Form.Label>
                      <Form.Control name='loan_id' type="text" placeholder="Enter Loan ID" required/>
                    </Form.Group>
                  </Col>
                  <Col>
                    {/* Loan Type */}
                    <Form.Group className="" controlId="formBasicLoanType">
                      <Form.Label>Loan Type</Form.Label>
                      {/* Normal Text input */}
                      <Form.Control name='type' type="text" placeholder="Enter Loan Type" required/>

                      {/* Dropdown with furniture, crockery and stationary */}
                      {/* <Form.Select name='type' aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Crockery">Crockery</option>
                        <option value="Stationary">Stationary</option>
                      </Form.Select> */}
                    </Form.Group>
                  </Col>
                </Row>
                {/* Loan Duration */}
                <Row className="">
                  <Col>
                    <Form.Group className="" controlId="formBasicLoanDuration">
                      <Form.Label>Loan Duration</Form.Label>
                      <Form.Control name='duration' type="text" placeholder="Enter Loan Duration" required/>
                    </Form.Group>
                  </Col>
                  <Col>
                  </Col>
                </Row>
                {/* Submit Button */}
                <Button className="mt-3" variant="primary" type="submit">
                  Submit
                </Button>
                {errorMsg && <p className='error-message' style={{color:'red',marginTop:'10px'}}>{errorMsg}</p>}
                {successMsg && <p className='success-message' style={{color:'green',marginTop:'10px'}}>{successMsg}</p>}
              </Form>
            </Container>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Loan Card Table</Accordion.Header>
          <Accordion.Body>
          <h2 style={{ color: 'black',marginTop:'10px', marginBottom:'10px' }}>Existing Loan Cards</h2>
            <div style={{ textAlign: "center", justifyContent: "center" }}>
              <table className="table table-success w-auto" style={{ margin: "auto" }}>
                <thead>
                  <tr className="table-danger">
                    <th>Loan Card ID</th>
                    <th>Loan Type</th>
                    <th>Loan Duration</th>
                    <th>Loan Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loanCards.map(
                    loanCard =>
                      <tr key={loanCard.id}>
                        <td>{loanCard.loanId}</td>
                        <td>{loanCard.type}</td>
                        <td>{loanCard.duration}</td>
                        <td>{statuscheck(loanCard.status)}</td>
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