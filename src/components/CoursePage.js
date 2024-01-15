import React, { useEffect, useState } from 'react'
import { useLocation,Router } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import NavBar from './NavBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import '../Styles/Coursepage.css'




const MyTable = (studentFullName) => {
    const data = [
      { name: 'Lab 1', full_mark: 100, marks: 95 },
      { name: 'Lab 2', full_mark: 100, marks: 100 },
      { name: 'Lab 3', full_mark: 100, marks: 88 },
      { name: 'Assignment', full_mark: 100, marks: 98 },
      { name: 'Mid Exam', full_mark: 100, marks: 75 },
      { name: 'End Exam', full_mark: 100, marks: 88 }
  
    ];

    const generatePDF = () => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Specify page orientation and size
  
      // Set table headers
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('E/no:'+'E/18/283', 10, 20);
      pdf.text('Name:'+studentFullName, 10, 30);
      pdf.text('Date:'+'12/12/2023 09:08:45', 10, 40);
      pdf.text('Name', 10, 60);
      pdf.text('Full mark', 60, 60);
      pdf.text('Results', 100, 60);
  
      // Set table data
      // pdf.setFont('helvetica', '');
      pdf.setFontSize(12);
      data.forEach((item, index) => {
        const y = 70 + index * 10; // Adjust the vertical position for each row
        pdf.text(item.name, 10, y);
        pdf.text(item.full_mark.toString(), 60, y);
        pdf.text(item.marks.toString(), 100, y);
      });
      
      
  
      // Save the PDF file
      pdf.save('table.pdf');
    };

    
  
    return (
        <div>
          <table id="table-content">
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Name</th>
                <th style={{ width: '30%' }}></th>
                <th style={{ width: '30%' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.full_mark}</td>
                  <td>{item.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
          <Button onClick={generatePDF} variant="primary">Download as PDF</Button>
        </div>    
      
    );
};

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

  // Initialize Firestore
const firestore = firebase.firestore();

function CoursePage() {
    
  const [ setError] = useState("")
  const { currentUser, logout } = useAuth();

    const location = useLocation();

    // Access the data properties
    const courseCode = location.state.code;
    const courseName = location.state.name;

    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const querySnapshot = await firestore.collection('users').get();
          const data = querySnapshot.docs.map((doc) => doc.data()).filter((user) => user.email === "e18283@eng.pdn.ac.lk");
          
          setStudentData(data)

        }
        fetchData()
    }, [])
    

    return (
        
    <div>
        <NavBar/>
            <div className='container content-coursepage' style={{ marginTop: '20px' }}>
              <Row>
                  <Col>
                    <h3>{courseCode}: {courseName}</h3>
                    <div>
                        <DoughnutChart />
                    </div>
                  </Col>  
              </Row>
    
              
              <Row>
                <div>
                    {/* <MyTable data={studentData[0].fullname} /> */}
                </div>
              </Row>
              <Row>
                
              </Row>
            </div>
        </div>
    )
} 

export default CoursePage;

