import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AdminEdit(props) {
    const [formData, setFormData] = useState({}); // State to hold form data
  
    
    const handleInputChange = (e) => {

        const { loan_id, type, duration } = e.target;
        setFormData(); //??

        // save all the changes

    };
  
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const loanCard = Object.fromEntries(data.entries())
        let loanId = loanCard.loan_id

        fetch(`http://localhost:9191/admin/editLoanCard/${loanId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
            }
            }).then(response => {
            return response.json()
            }).then(data => {
            console.log(data)
            })
        
      props.onClose();
    };
  
    return (
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Field 1</Form.Label>
              <Form.Control
                type="text"
                name="field1"
                value={formData.field1 || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
                    
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Field 2</Form.Label>
              <Form.Control
                type="text"
                name="field2"
                value={formData.field2 || ''}
                onChange={handleInputChange}
              />
                </Form.Group>
                {/* Add more form fields*/}
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
export default AdminEdit;
  