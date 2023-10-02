import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
function AdminEditEmployee(props) {
  const propData = props.data;


  const employeeId = propData["employeeId"];
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(propData["name"]);
    setDepartment(propData["department"]);
    setDesignation(propData["designation"]);
    setDob(propData["dob"]);
    setDoj(propData["doj"]);
    setGender(propData["gender"]);
    setRole(propData["role"])
  }, [propData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let sendData = { employeeId, name, department, designation, dob, doj, gender, role }
    // console.log(JSON.stringify(sendData))

    fetch(`http://localhost:9191/admin/editEmployee/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      },
      body: JSON.stringify(sendData)
    }).then(response => {
      // console.log(JSON.stringify(response) + " res")
      return response
    }).then(data => {
      console.log(data.ok)
    })
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="Input1">
                <Form.Label className="mt-1">Id</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeId"
                  value={employeeId}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Input2">
                <Form.Label className="mt-1">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    // console.log(name + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="Input3">
                <Form.Label className="mt-1">Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value)
                    // console.log(department + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
            <Col>

              <Form.Group controlId="Input4">
                <Form.Label className="mt-1">Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value)
                    // console.log(designation + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="Input5">
                <Form.Label className="mt-1">DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value)
                    // console.log(dob + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
            <Col>

              <Form.Group controlId="Input6">
                <Form.Label className="mt-1">DOJ</Form.Label>
                <Form.Control
                  type="date"
                  name="doj"
                  value={doj}
                  onChange={(e) => {
                    setDoj(e.target.value)
                    // console.log(doj + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>

            <Col>
              <Form.Group controlId="Input7">
                <Form.Label className="mt-1">Gender</Form.Label>
                <Form.Select
                  name='gender' aria-label="Default select example"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                    // console.log(gender + " afterchange")
                  }}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="Input8">
                <Form.Label className="mt-1">Role</Form.Label>
                <Form.Select
                  name='role' aria-label="Default select example"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value)
                    // console.log(role + " afterchange")
                  }}>
                  <option value="ADMIN">ADMIN</option>
                  <option value="EMP">EMP</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="mt-3" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AdminEditEmployee;
