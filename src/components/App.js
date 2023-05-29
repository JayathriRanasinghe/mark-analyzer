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
import CoursePage from "./CoursePage";
import Contact from "./Contact"

function App() {
  return (
    
    <AuthProvider>
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      
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
                <Route path="/course-page" element = {<CoursePage/>}></Route>
                <Route path="/contact" element = {<Contact/>}></Route>

              </Routes>
            </AuthProvider>
          </Router>
        </div>
        
      </div>
    </AuthProvider>
    
  )
  
}

export default App;
