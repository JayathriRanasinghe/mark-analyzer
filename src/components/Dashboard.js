import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import NavBar from './NavBar';

import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";

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

export default function Dashboard() {
    //https://nba-players.herokuapp.com/players-stats

    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.github.com/events')
            const cData = await response.json()
            setCourseData(cData.slice(0, 3))
        }
        fetchData()
    }, [])

    

    return (
        
    <Container>
        <NavBar/>
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
                  {courseData.map((courseData, k) => (
                      <Col key={k} xs={12} md={4} lg={3}>
                          
                          <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://via.placeholder.com/150x75" />
                            <Card.Body>
                              <Card.Title>{courseData.id}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{courseData.created_at}</Card.Subtitle>
                              
                              <Card.Text>
                                Hardware software full system
                              </Card.Text>
                              <Button variant="primary">Course Page</Button>
                            </Card.Body>
                          </Card>

                      </Col>
                  ))}
              </Row>
            </div>
        </Container>
    )
}

