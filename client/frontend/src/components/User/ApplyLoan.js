import React from 'react'
import { useState, useEffect } from 'react'
import { Accordion, Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ApplyLoan = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")    // State to store the selected category from the dropdown menu
  const [makes, setMakes] = useState([])
  const [selectedMake, setSelectedMake] = useState("")    // State to store the selected make from the dropdown menu
  const [descriptions, setDescriptions] = useState([])
  const [selectedDescription, setSelectedDescription] = useState("")    // State to store the selected description from the dropdown menu
  const [value, setValue] = useState()    // State to store the value of the item
  const [id, setId] = useState("")
  const navigate = useNavigate()
  // useffect to get all the items into the page
  useEffect(() => {
    getItemList()
    // console.log("first")
  }, [])//Dependency array, this useeffect is called when the page renders

  // useffect to get all the categories into the drop down menu when the items are loaded
  useEffect(() => {
    const data = () => { getCategories() }
    if (items) {
      data()
    }
    // console.log("here")
  }, [items]//Dependency array, this use effect is called when the page renders and state of items changes
  )

  useEffect(() => {
    console.log("category changed, so make change")
    setSelectedMake("")
  },[selectedCategory])
  useEffect(() => {
    console.log("category changed, so description change")
    setSelectedDescription("")
    setSelectedMake("")
  },[selectedCategory])

  // useffect to load the items into the drop down menu when the category is selected
  useEffect(() => {
    getItemMakes()
    // console.log("second")
  }, [selectedCategory])//Dependency array, this useeffect is called when the page renders and state of selectedCategory changes

  // useffect to load the items into the drop down menu when the make is selected
  useEffect(() => {
    console.log("third")
    getItemDescription()
    getItemValue()
  }, [selectedMake])//Dependency array, this useeffect is called when the page renders and state of selectedMake changes

  // useffect to load the value of the item into the state when the description is selected
  useEffect(() => {
    getItemValue()
    console.log("UEF value",value)
    // console.log("fourth")
  }, [selectedDescription,selectedMake,  selectedCategory])//Dependency array, this useeffect is called when the page renders and state of selectedDescription changes

  // Gets all the unique categories from the Items state and sets it into the category state.
  function getCategories() {
    console.log("in category")
    let categoryList = []
    items.forEach(item => {
      if (!categoryList.includes(item.category)) {
        categoryList.push(item.category)
      }
    })
    console.log(categoryList)
    setCategories(categoryList)
  }

  //Gets all the unique makes from the Items state and sets it into the make state.
  function getItemMakes() {
    console.log("in make")
    let makeList = []
    items.forEach(item => {
      if (item.category === selectedCategory) {
        if (!makeList.includes(item.make)) {
          makeList.push(item.make)
        }
      }
    })
    console.log(makeList)
    setMakes(makeList)
  }

  //Gets all the item descriptions from the items state and sets it into the description state, only those which have the right category and make. cant be repetitive.
  function getItemDescription() {
    console.log("in description")
    let descriptionList = []
    items.forEach(item => {
      if (item.category === selectedCategory && item.make === selectedMake) {
        if (!descriptionList.includes(item.description)) {
          descriptionList.push(item.description)
        }
      }
    })
    console.log(descriptionList)
    setDescriptions(descriptionList)
  }

  //search and get the item id by running a for loop in the items list and matching on the basis of category, make and description
  function getId() {

    items.forEach(item => {
      if (item.category === selectedCategory && item.make === selectedMake && item.description === selectedDescription) {
        setId(item.itemId)
        return
      }
    })
  }

  function getItemValue() {
    console.log("in value")
    let value = 0
    items.forEach(item => {
      if (item.category === selectedCategory && item.make === selectedMake && item.description === selectedDescription) {
        value = item.value;
        setValue(value)
        return
      }

    })
    console.log(value)
    getId()
    console.log("item id first", id)
  }

  // TO DO
  // Handles the submit function call
  const handleSubmit = async e => {
    e.preventDefault()
    console.log("in submit")
    console.log("item id second", id)
    const item = { category: selectedCategory, make: selectedMake, description: selectedDescription, value: value, itemId: id }
    console.log("printing", item)
    const response = await fetch('http://localhost:9191/employee/applyLoan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      },
      body: JSON.stringify(item)
    })
    const responseData = await response.json()
    if(responseData.success){
      alert("Loan applied successfully")
      navigate('/employee/dashboard')
      
    }
    else{
      alert("Loan not applied due to : " + responseData['Reason'])
    }
    console.log(responseData.Reason," +++",responseData["Reason"])
    console.log(responseData.success)
  }

  // SEts the list of items into the state Items. 
  function getItemList() {
    fetch('http://localhost:9191/employee/listOfItems', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      // console.log(data["LoanCards"])
      setItems(data["LoanCards"])
    })
  }

  return (
    <div className="container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      

      <Container style={{ width: "80%", margin: "10px auto", justifyContent: "center" }}>
        <h1 style={{ verticalAlign: "middle", textAlign: 'center' }}>Loan Card Management</h1>

        <Form onSubmit={handleSubmit}>

          {/* Employee ID  */}
          <Row className="">
            <Col>
              <Form.Group className="" controlId="formBasicEmployeeID">
                <Form.Label style={{ marginTop: '5px' }}>Employee ID</Form.Label>
                <Form.Control name='employeeId' type="text" placeholder={localStorage.getItem('empId')} disabled />
              </Form.Group>
            </Col>

            {/* Item Category */}
            <Col>
              {/* Item Category Dropdown menu which calls function getCategories and gets all the data from that call.  */}
              <Form.Group className="" controlId="formBasicItemCategory">
                <Form.Label style={{ marginTop: '5px' }}>Item Category</Form.Label>
                {/* On change, set the option chosen as the selected category */}
                <Form.Select name='category' aria-label="Default select example" onChange={() => { setSelectedCategory(document.getElementById('formBasicItemCategory').value) }}>
                  <option>Select Item Category</option>
                  {categories.map((item, index) => {
                    return (
                      <option key={index} value={item} >{item}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Item Make  */}
          <Row className="">
            <Col>
              {/* Item Make Dropdown menu which calls function getMakes and gets all the data from that call.  */}
              <Form.Group className="" controlId="formBasicItemMake">
                <Form.Label style={{ marginTop: '5px' }}>Item Make</Form.Label>
                {/* On change, set the option chosen as the selected make */}
                <Form.Select name='make' aria-label="Default select example" onChange={() => { setSelectedMake(document.getElementById('formBasicItemMake').value) }}>
                  <option>Select Item Make</option>
                  {makes.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            {/* Item Description */}
            <Col>
              {/* Item Description Dropdown menu which calls function getDescriptions and gets all the data from that call.  */}
              <Form.Group className="" controlId="formBasicItemDescription">
                <Form.Label style={{ marginTop: '5px' }}>Item Description</Form.Label>
                {/* On change, set the option chosen as the selected description */}
                <Form.Select name='description' aria-label="Default select example" onChange={() => { setSelectedDescription(document.getElementById('formBasicItemDescription').value) }}>
                  <option>Select Item Description</option>
                  {descriptions.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Item Value */}
          <Row className="">
            <Col>
              {/* Item Value */}
              <Form.Group className="" controlId="formBasicItemValue">
                <Form.Label style={{ marginTop: '5px' }}>Item Value</Form.Label>
                <Form.Control name='value' type="text" placeholder={value} disabled />
              </Form.Group>
            </Col>
          </Row>
          {/* Submit Button */}


          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default ApplyLoan