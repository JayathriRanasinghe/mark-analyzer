import React, { useState,useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import '../Styles/NavBar.css';

export default function NavBar() {
  const [ setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    // logic to apply theme based on the isDarkTheme state
    const rootElement = document.documentElement;
    if (isDarkTheme) {
      rootElement.classList.add('dark-theme');
    } else {
      
      rootElement.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate('/login')
    } catch {
      setError("Failed to log out")
    }
  }

  

  return (
    
    <Navbar style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px 20px', paddingLeft: '30px' }} variant="light" expand="lg" sticky="top" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#">mark_analyzer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/user-dashboard">Courses</Nav.Link>
            
            <NavDropdown title="Documents" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Exam timetables</NavDropdown.Item>
              <NavDropdown.Item href="http://www.ce.pdn.ac.lk/"> PeraCom </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">FAQ</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="#" disabled>Link</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>

            
            
          </Nav>
          <div className="theme-toggle" onClick={toggleTheme} style={{ paddingRight: '20px' }}>
            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} size="2x" />
          </div>
          <Image src="" roundedCircle={true}></Image>
          <NavDropdown title={currentUser.email} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/update-profile">Update Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Preferences</NavDropdown.Item>
              <NavDropdown.Item href="/login" onClick={() => handleLogout()}>Log out</NavDropdown.Item>  
          </NavDropdown>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

   

    
    
    
    
  )
}