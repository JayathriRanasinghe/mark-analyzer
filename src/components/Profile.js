import React, {useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap";
import NavBar from './NavBar';
import Image from 'react-bootstrap/Image'




export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  
  const emailAddress = currentUser.email;

  const baseUrl = 'https://api.ce.pdn.ac.lk/people/v1/students/E';
  const batch = emailAddress.slice(1, 3);
  const eNum = emailAddress.slice(3, 6);
  const url = `${baseUrl}${batch}/${eNum}/`;
  
  
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate('/login')
    } catch {
      setError("Failed to log out")
    }
  }

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(profileData => setProfileData(profileData));
  }, []);

  return (
    <Container fluid>
    <NavBar/>
    <Row>
      <Col xs={12} md={4}>
        <Image src={profileData.profile_image} roundedCircle />
        <h2>{profileData.name_with_initials}</h2>
        <p>{profileData.eNumber}</p>
        <Button variant="primary">Edit Profile</Button>
      </Col>
      <Col xs={12} md={8}>
        <h5>Category:<p>Lecturer</p></h5>
        <Card>
          <Card.Header>Full name</Card.Header>
          <Card.Body>
            <Card.Text>
            {profileData.full_name}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Department</Card.Header>
          <Card.Body>
            <Card.Text>
            {profileData.current_affiliation}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Interests</Card.Header>
          <Card.Body>
            <ul>
              <li>{profileData.interests}</li>
            </ul>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Location</Card.Header>
          <Card.Body>
            <Card.Text>
            {profileData.location}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
    
  )
}