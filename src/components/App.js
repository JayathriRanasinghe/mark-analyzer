import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext"
import Signup from "./Signup"
import Login from "./Login"
import Dashboard from "./Dashboard"
import ForgotPassword from "./ForgotPassword"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import Profile from "./Profile";
import NavBar from "./NavBar";


function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100">
          <Router>
          
            <AuthProvider>
              <Routes>
                
                <Route exact path='/' element={<PrivateRoute/>}>
                  <Route exact path='/' element={<Dashboard/>}/>
                </Route>

                <Route path='/update-profile' element={<PrivateRoute/>}>
                  <Route path='/update-profile' element={<UpdateProfile/>}/>
                </Route>

                <Route path="/signup" element = {<Signup/>}></Route>
                <Route path="/login" element = {<Login/>}></Route>
                <Route path="/forgot-password" element = {<ForgotPassword/>}></Route>
                <Route path="/profile" element = {<Profile/>}></Route>
                

              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </AuthProvider>
    
  )
  
}

export default App;
