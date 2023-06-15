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
import './NavBar.css';
import NavBar from './NavBar';
import { firestore } from '../firebase'; // Import your Firebase Firestore configuration

export default function UserRole() {
  const [ setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  console.log(currentUser.uid);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log("Theme changed!")
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = firestore.collection('users').doc(currentUser.uid); // Replace 'users' with the appropriate collection name
        const snapshot = await userRef.get();
  
        if (snapshot.exists) {
          setUserData(snapshot.data());
          console.log(snapshot.data().acctype);
          navigateToDashboard(snapshot.data().acctype);
        } else {
          // Handle case when user data does not exist
          console.log('nothing')
        }
      } catch (error) {
        // Handle error
      }
    };
  
    fetchUserData();
    //console.log(userData.acctype);
    // console.log('heee'+currentUser.acctype)
    // navigateToDashboard(currentUser.acctype);
  }, [currentUser.uid]);

  async function navigateToDashboard(user_role) {
    if(user_role === 'user'){
        navigate('/user-dashboard');
    }else if(user_role === 'admin'){
        navigate('/admin-dashboard');
    }
  }

  

  return (
    
    <div>
    <NavBar/>
        {/* <p>your user role is: {currentUser.acctype}</p> */}

    </div>

   

    
    
    
    
  )
}