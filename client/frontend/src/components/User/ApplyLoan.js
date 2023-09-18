import React from 'react'

const ApplyLoan = () => {
  return (
    <div className="container" style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{margin:"15px auto"}}>Apply Loan</h1>
      <h3>Select product and apply for loan</h3>
      <form>
        <label htmlFor='EmployeeID'>Employee ID</label>
        <input type='text' id='EmployeeID' name='EmployeeID' placeholder='Employee ID' />
        <label htmlFor='ItemDescription'>Item Description</label>
        <input type='text' id='ItemDescription' name='ItemDescription' placeholder='Item Description' />
        <label type='text' htmlFor='ItemMake'>Item Make</label><br />
        {/* Drop down menu with the options wooden, glass and plastic */}
        <select id='ItemMake' name='ItemMake'>
          <option value='Wooden'>Wooden</option>
          <option value='Glass'>Glass</option>
          <option value='Plastic'>Plastic</option>
        </select>
        <br /><br />
        <label id='ItemCategory' htmlFor='ItemCategory'>Item Category</label><br />
        {/* Drop down menu with the options furniture, electronics,stationary and crockery */}
        <select id='ItemCategory' name='ItemCategory'>
          <option value='Furniture'>Furniture</option>
          <option value='Electronics'>Electronics</option>
          <option value='Stationary'>Stationary</option>
          <option value='Crockery'>Crockery</option>
        </select>
        <br></br>
        <br></br>
        <label id='ItemCost' htmlFor='ItemCost'>Item Cost</label>
        <input type='text' id='ItemCost' name='ItemCost' placeholder='Item Cost' />
        <input type='submit' value='Apply for loan' />
      </form>
    </div>
  )
}

export default ApplyLoan