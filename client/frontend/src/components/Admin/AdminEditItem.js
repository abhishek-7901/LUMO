import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap'
function AdminEditItem(props) {
  const [itemId, setItemId] = useState(props.data[0]["itemId"]);
  const [description, setDescription] = useState(props.data[1]["description"]);
  const [status, setStatus] = useState(props.data[2]["status"]);
  const [make, setMake] = useState(props.data[3]["make"]);
  const [value, setValue] = useState(props.data[4]["value"]);
  const [category, setCategory] = useState(props.data[5]["category"]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let sendData = { itemId, description, status, make, value, category }
    // console.log(JSON.stringify(sendData))

    fetch(`http://localhost:9191/admin/editItem/${itemId}`, {
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
      console.log(data)
    })
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="Input1">
                <Form.Label className="mt-1">Item Id</Form.Label>
                <Form.Control
                  type="text"
                  name="itemId"
                  value={itemId || ''}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="Input2">
                <Form.Label className="mt-1">Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={description || ''}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    // console.log(description + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="Input3">
                <Form.Label className="mt-1">Status</Form.Label>
                <Form.Control
                  type="boolean"
                  name="status"
                  value={status || ''}
                  onChange={(e) => {
                    setStatus(e.target.value)
                    // console.log(status + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="Input4">
                <Form.Label className="mt-1">Make </Form.Label>
                <Form.Control
                  type="text"
                  name="make"
                  value={make || ''}
                  onChange={(e) => {
                    setMake(e.target.value)
                    // console.log(make + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="Input5">
                <Form.Label className="mt-1">Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={category || ''}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    // console.log(category + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="Input6">
                <Form.Label className="mt-1">Value</Form.Label>
                <Form.Control
                  type="number"
                  name="value"
                  value={value || ''}
                  onChange={(e) => {
                    setValue(e.target.value)
                    // console.log(value + " afterchange")
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" className="mt-3" type="submit" >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AdminEditItem;
