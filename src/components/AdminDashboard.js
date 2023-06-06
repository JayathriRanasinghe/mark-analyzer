import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Button, Form } from "react-bootstrap";
import NavBar from './NavBar';
import Footer from './Footer';

import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FaComments } from 'react-icons/fa';
import './Dashboard.css';
import './Background.css';
import ChartComponent from './ChartComponent';
import SearchOptions from './SearchOptions';

if (firebase.apps.length === 0) {
  // Initialize Firebase
  const app = firebase.initializeApp({
    // Your Firebase configuration
  });
}

// Initialize Firestore
const firestore = firebase.firestore();


const handleChatBotClick = () => {
// Logic for opening the chat bot
};



const CourseForm = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCoordinator, setCourseCoordinator] = useState('');
  const [courseInstructors, setCourseInstructors] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the course data
    const courseData = {
      courseCode,
      courseName,
      courseCoordinator,
      courseInstructors
    };

    // Send the data to your database or API for further processing
    // Example: sendCourseDataToDatabase(courseData);

    // Reset the form
    setCourseCode('');
    setCourseName('');
    setCourseCoordinator('');
    setCourseInstructors('');
  };

  return (
    <div>
    <NavBar/>
    <Row style={{ marginTop: '30px' }}>
        <Col xs={12} md={3} lg={4} className="mb-4"><ChartComponent/></Col>
        <Col xs={12} md={3} lg={4} className="mb-4">
            <Card className="px-4 py-3" style={{ width: '25rem' }}>
                <Card.Body>
                        <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="courseCode">
                        <Form.Label>Course Code:</Form.Label>
                        <Form.Control
                        type="text"
                        value={courseCode}
                        onChange={(event) => setCourseCode(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="courseName">
                        <Form.Label>Course Name:</Form.Label>
                        <Form.Control
                        type="text"
                        value={courseName}
                        onChange={(event) => setCourseName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="courseCoordinator">
                        <Form.Label>Course Coordinator:</Form.Label>
                        <Form.Control
                        type="text"
                        value={courseCoordinator}
                        onChange={(event) => setCourseCoordinator(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="courseInstructors">
                        <Form.Label>Course Instructors:</Form.Label>
                        <Form.Control
                        type="text"
                        value={courseInstructors}
                        onChange={(event) => setCourseInstructors(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Course to Database
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    
    
    </div>
  );
};

export default CourseForm;



