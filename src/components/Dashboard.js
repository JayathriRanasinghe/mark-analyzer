import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import NavBar from './NavBar';
import Contact from './Contact';

import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FaComments } from 'react-icons/fa';
import './Dashboard.css';

if (firebase.apps.length === 0) {
  // Initialize Firebase
  const app = firebase.initializeApp({
    // Your Firebase configuration
  });
}

// Initialize Firestore
const firestore = firebase.firestore();

function DoughnutChart() {
    const data = {
      labels: ['A and A+', 'A- B+ and B', 'C+ and C', 'Below C'],
      datasets: [
        {
          data: [300, 50, 100, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      height: 400, // set custom height
      width: 400, // set custom width
    };
  
    return <Doughnut data={data} options={options} />;
  }

  const handleChatBotClick = () => {
    // Logic for opening the chat bot
  };

export default function Dashboard() {
    //https://nba-players.herokuapp.com/players-stats

    const [courseData, setCourseData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('https://api.github.com/events')
    //         const cData = await response.json()
    //         setCourseData(cData.slice(0, 3))
    //     }
    //     fetchData()
    // }, [])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await firestore.collection('courses').get();
  
          const data = querySnapshot.docs.map((doc) => doc.data());
          setCourseData(data);
          console.log(data);
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      };
  
      fetchData();
    }, []);

    

    return (
        
    <div>
        <NavBar/>
        <Container>
            <div style={{ marginTop: '20px' }}>
              <Row>
                  <Col>
                    <h3>CO225</h3>
                    <div>
                        <DoughnutChart />
                    </div>
                  </Col>
                  <Col>
                    <h3>CO226</h3>
                    <div>
                        <DoughnutChart />
                    </div>
                  </Col>  
              </Row>
    
              <Row>
                  {courseData.map((courseData) => (
                      <Col xs={12} md={3} lg={4} className="mb-4">
                          
                          <Card style={{ width: '20rem' }}>
                            <Card.Img variant="top" src="https://i0.wp.com/www.edutechpost.com/wp-content/uploads/2017/09/best-educational-websites.png?fit=800%2C800&ssl=1&resize=1280%2C720" />
                            <Card.Body>
                              <Card.Title>{courseData.code}: {courseData.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{courseData.coordinator}</Card.Subtitle>
                              
                              <Card.Text>
                                {courseData.batch}
                              </Card.Text>
                              <a href="/course-page">
                                <Button variant="primary">Course Page</Button>
                              </a>  
                            </Card.Body>
                          </Card>

                      </Col>
                  ))}
              </Row>
              <Row>

              </Row>
            </div>
            </Container>
            {/* Chat bot button */}
            <div className="chat-bot-button" onClick={handleChatBotClick}>
              <FaComments className="chat-bot-icon" />
            </div>
            <footer>
            <div className='footer-nav' style={{ marginTop: '20px' }}>
            <section id='contact'>
                <Contact />
              </section>
            </div>
            <div className='footer-sub' style={{ textAlign: 'center' }}>
              <p>
                2023 PeraCom, All rights reserved.
              </p>
            </div>
            </footer>
            
           
        </div>
    )
}

