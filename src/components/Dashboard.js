import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import NavBar from './NavBar';
import Footer from './Footer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FaComments } from 'react-icons/fa';
import '../Styles/Dashboard.css';
import '../Styles/Background.css';
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

export default function Dashboard() {
   
  const [ setError] = useState("")
  const { currentUser, logout } = useAuth()

    const [courseData, setCourseData] = useState([]);
    
    useEffect(() => {
      const catergoryBatch = currentUser.email;
      const enumber = catergoryBatch.slice(0, 6)
      const batch = 'E'+catergoryBatch.slice(1, 3)

      const fetchData = async () => {
        try {
          const querySnapshot = await firestore.collection('courses').get();
          const data = querySnapshot.docs.map((doc) => doc.data()).filter((course) => course.courseBatch === batch);
          setCourseData(data);
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      };
  
      fetchData();
    }, []);

    const dataToSend = {
      // Your data object
      courseData: courseData.code,
      courseName: courseData.name,
      // Add more data properties as needed
    };

    return (
        
    <div className='content'>
    <div className="uni-symbol"></div>
      <div className="circle"></div>
      <div className="circle2"></div>
        <NavBar/>
        
        <Container>
            <div style={{ marginTop: '20px' }}>
            <Row>
              <SearchOptions/>
            </Row>
    
              <Row style={{ marginTop: '30px' }}>
                  {courseData.map((courseData) => (
                      <Col key={courseData.id} xs={12} md={3} lg={4} className="mb-4">
                          
                          <Card className="hover-card card-animation" style={{ width: '20rem' }}>
                            <Card.Img variant="top" src="https://i0.wp.com/www.edutechpost.com/wp-content/uploads/2017/09/best-educational-websites.png?fit=800%2C800&ssl=1&resize=1280%2C720" />
                            <Card.Body>
                              <Card.Title>{courseData.courseCode}: {courseData.courseName}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{courseData.courseCoordinator}</Card.Subtitle>
                              
                              <Card.Text>
                                {courseData.courseBatch}
                              </Card.Text>
                              {/* <a href="/course-page">
                                <Button variant="primary">Course Page</Button>
                              </a>   */}
                              <Link
                                to= '/course-page' state={{code: courseData.courseCode, name: courseData.courseName}}
                              >
                                
                                <Button variant="primary">Course Page</Button>
                              </Link>
                            </Card.Body>
                          </Card>

                      </Col>
                  ))}
              </Row>
              <Row>
              <Footer/>
              </Row>
            </div>
            <div className="chat-bot-button" onClick={handleChatBotClick}>
              <FaComments className="chat-bot-icon" />
            </div>

            
            </Container>
            
            {/* Chat bot button */}
            
            
           
        </div>
    )
}

