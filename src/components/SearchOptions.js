import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './SearchOptions.css'


const SearchOptions = () => {
  const [batch, setBatch] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [code, setCode] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleSearch = () => {
    // Perform search based on selected options
    // You can use the batch, coordinator, code, and courseName values for your search logic
    console.log('Search', batch, coordinator, code, courseName);
  };

  return (
    <div className='above'>
      {/* <h5>Search course</h5> */}
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="batch">
              <Form.Label>Batch:</Form.Label>
              <Form.Control
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="coordinator">
              <Form.Label>Coordinator:</Form.Label>
              <Form.Control
                as="select"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
              >
                <option value="">Select Coordinator</option>
                <option value="Roshan_Ragel">Prof. Roshan Ragel</option>
                <option value="Isuru_Nawinne">Dr. Isuru Nawinne</option>
                <option value="Damayanthi_Herath">Dr. Damayanthi Herath</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="code">
              <Form.Label>Code:</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="courseName">
              <Form.Label>Course Name:</Form.Label>
              <Form.Control
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Button onClick={handleSearch} style={{ marginTop: '30px' }}>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchOptions;
