import React, { useEffect } from 'react'
import Register from '../Register'
import { Form, Button, Container, Accordion, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
const AdminCustomerData = () => {
    const [customers, setCustomers] = useState([])

    function getCustomerData() {
        fetch('http://localhost:9191/admin/viewUsers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            console.log(data["EmployeeList"])
            setCustomers(data["EmployeeList"])
            console.log(customers)
        })
    }

    useEffect(() => {
        getCustomerData();
    }, [])

    // const [dob, setDob] = useState('')
    // const [doj, setDoj] = useState('')
    // const [password, setPassword] = useState('')
    // const [gender, setGender] = useState('')
    // const [designation, setDesignation] = useState('')
    // const [department, setDepartment] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const fromDataObj = Object.fromEntries(formData.entries())
        console.log(fromDataObj["name"])
        let name = fromDataObj["name"]
        let dob = fromDataObj["dob"]
        let doj = fromDataObj["doj"]
        let password = fromDataObj["password"]
        let gender = fromDataObj["gender"]
        let designation = fromDataObj["designation"]
        let department = fromDataObj["department"]
        let confpassword = fromDataObj["passwordconf"]
        if (password != confpassword) {
            setErrorMsg("Password and Confirm Password do not match")
            return
        }
        const user = { name, dob, doj, password, gender, designation, department }
        const response = await fetch('http://localhost:9191/employee/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const json = await response.json()
        console.log(json);
        if (json["EmplyeeDetails"].name) {
            // Save the auth token and redirect
            setErrorMsg("")
            setSuccessMsg("Employee added successfully")
            setTimeout(() => {
                setSuccessMsg("")
            }, 3000)
            getCustomerData();
            e.target.reset();
        }
        else {
            setSuccessMsg("")
            setErrorMsg("Employee not added since : " + json["Reason"])
        }

    }


    return (
        <div>
            <h1 style={{ verticalAlign: "middle", textAlign: 'center',marginTop:'15px' }}>Employee Data Management</h1>
            <Accordion style={{ margin: "20px" }} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Register New Employee</Accordion.Header>
                    <Accordion.Body>
                        <h2 style={{ verticalAlign: "middle", textAlign: 'center' }}>Register New Employee</h2>
                        {/* <Register /> */}
                        <Container style={{ width: "80%", margin: "10px auto", justifyContent: "center" }}>
                            <Form onSubmit={handleSubmit}>
                                {/* Name and Date of Birth*/}
                                <Row className="">
                                    <Col>
                                        <Form.Group className="" controlId="formBasicName">
                                            <Form.Label style={{ marginTop: "10px" }}>Name</Form.Label>
                                            <Form.Control name='name' type="text" required placeholder="Enter Name" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Date of birth */}
                                        <Form.Group className="" controlId="formBasicDOB">
                                            <Form.Label style={{ marginTop: "10px" }}>Date of Birth</Form.Label>
                                            <Form.Control name='dob' type="date" required placeholder="Enter Date of Birth" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Gender and department */}
                                <Row className="">
                                    <Col>
                                        {/* Department */}
                                        <Form.Group className="" controlId="formBasicDepartment">
                                            <Form.Label style={{ marginTop: "10px" }}>Department</Form.Label>
                                            <Form.Control name='department' type="text" required placeholder="Enter Department" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Gender */}
                                        <Form.Group className="" controlId="formBasicGender">
                                            <Form.Label style={{ marginTop: "10px" }}>Gender</Form.Label>
                                            {/* DropDown for gender */}
                                            <Form.Select name='gender' aria-label="Default select example">
                                                <option>Open this select menu</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* DOJ and Designation */}
                                <Row className="">
                                    <Col>
                                        {/* Date of joining */}
                                        <Form.Group className="" controlId="formBasicDOJ">
                                            <Form.Label style={{ marginTop: "10px" }}>Date of Joining</Form.Label>
                                            <Form.Control name='doj' type="date" required placeholder="Enter Date of Joining" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        {/* Designation */}
                                        <Form.Group className="" controlId="formBasicDesignation">
                                            <Form.Label style={{ marginTop: "10px" }}>Designation</Form.Label>
                                            <Form.Control name='designation' type="text" required placeholder="Enter Designation" />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <Row className="">
                                    {/* Password */}
                                    <Col>
                                        <Form.Group className="" controlId="formBasicPassword">
                                            <Form.Label style={{ marginTop: "10px" }}>Password</Form.Label>
                                            <Form.Control name='password' type="password" required placeholder="Password" />
                                        </Form.Group>
                                    </Col>
                                    {/* Confirm Password */}
                                    <Col>
                                        <Form.Group className="" controlId="formBasicConfirmPassword">
                                            <Form.Label style={{ marginTop: "10px" }}>Confirm Password</Form.Label>
                                            <Form.Control name='passwordconf' type="password" required placeholder="Confirm Password" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" style={{ marginTop: '15px' }} type="submit">
                                    Submit
                                </Button>
                                {errorMsg && <p className='error-message' style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}
                                {successMsg && <p className='success-message' style={{ color: 'green', marginTop: '10px' }}>{successMsg}</p>}
                            </Form>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Employee Data Table</Accordion.Header>
                    <Accordion.Body>
                        <h2 style={{ verticalAlign: "middle", textAlign: 'center' ,margin:"15px auto" }}>Existing Employee Data</h2>
                        <div style={{ textAlign: "center", justifyContent: "center" }}>
                            <table className="table table-success w-auto" style={{ margin: "auto" }}>
                                <thead>
                                    <tr className="table-danger">
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Designation</th>
                                        <th>DOB</th>
                                        <th>DOJ</th>
                                        <th>Gender</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(
                                        cust =>
                                            <tr key={cust.employeeId}>
                                                <td> {cust.employeeId} </td>
                                                <td> {cust.name} </td>
                                                <td> {cust.department} </td>
                                                <td> {cust.designation} </td>
                                                <td> {cust.dob} </td>
                                                <td> {cust.doj} </td>
                                                <td>{cust.gender}</td>
                                                <td>{cust.role}</td>
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

export default AdminCustomerData