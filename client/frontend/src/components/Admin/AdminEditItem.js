import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AdminEditItem(props) {
  const [itemId, setItemId] = useState(props.data[0]["itemId"]);
  const [category, setCategory] = useState(props.data[1]["category"]);
  const [description, setDescription] = useState(props.data[2]["description"]);
  const [cost, setCost] = useState(props.data[3]["cost"]);
  const [make, setMake] = useState(props.data[4]["make"]);
    
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let sendData = { itemId, category, description, cost, make}
    console.log(JSON.stringify(sendData))

    fetch(`http://localhost:9191/admin/editItem/${itemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      },
      body: JSON.stringify(sendData)
    }).then(response => {
      console.log(JSON.stringify(response) + " res")
      return response
    }).then(data => {
      console.log(data)
    })
    props.onClose();
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Loan Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

          <Form.Group controlId="Input1">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              name="loanId"
              value={loanId || ''}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="Input2">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={status || ''}
              onChange={(e) => {
                setStatus(e.target.value)
                console.log(status + " afterchange")
              }}
            />
          </Form.Group>

          <Form.Group controlId="Input3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={type || ''}
              onChange={(e) => {
                setType(e.target.value)
                console.log(type + " afterchange")
              }}
            />
          </Form.Group>

          <Form.Group controlId="Input4">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={duration || ''}
              onChange={(e) => {
                setDuration(e.target.value)
                console.log(duration + " afterchange")
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AdminEditItem;
