import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function LandingPage() {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center', textAlign:'center',margin:'3em 5em',border:'3px solid grey',borderRadius:'5px',backgroundColor:'#FAFAFA'}}>
      <h2 className='mt-3'>MAPAP</h2>
      <div className='mt-2'>
        Welcome to your one stop solution for all of your shopping needs, also clubbed with the power of easy loans from your employer. Designed specially for your needs. 
      </div>
      <Row xs={1} md={2} className="g-4" style={{ marginLeft: "3vw", marginRight: "3vw", marginTop: "3vh" }}>

        <Col>
          <Card style={{ height: "25vh", textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle", marginBottom: '5vh' ,backgroundColor:'#AED6F1'}}>
            <Card.Body style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle" }}>
              <Card.Title>Register yourself</Card.Title>
              <Card.Text className='mb-3' style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle", marginTop: '5vh' }}>
                Our tool lets you register yourself as an employee so that you may utilize and get loans from your employer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ height: "25vh", textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle", marginBottom: '5vh' ,backgroundColor:'#D4EFDF'}}>
            <Card.Body style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle" }}>
              <Card.Title>Choose Items</Card.Title>
              <Card.Text className='mb-3' style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle", marginTop: '5vh' }}>
                Choose the items you want to buy from our list of items, and get loans for the same.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ height: "25vh", textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle",backgroundColor:'#FCF3CF' }}>
            <Card.Body style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle" }}>
              <Card.Title>Avail various loans</Card.Title>
              <Card.Text className='mb-3' style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle", marginTop: '5vh' }}>
                Avail various loans from your employer, and pay them back in easy installments.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ height: "25vh", textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle",marginBottom:'5vh',backgroundColor:'#E8DAEF' }}>
            <Card.Body style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle" }}>
              <Card.Title>Dashboard for easy tracking</Card.Title>
              <Card.Text className='mb-3' style={{ textAlign: "center", justifyContent: "center", alignItem: "center", verticalAlign: "middle", marginTop: '5vh' }}>
                Track your loans and items easily from your dashboard.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;