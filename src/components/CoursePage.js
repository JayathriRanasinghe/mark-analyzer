import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import NavBar from './NavBar';

import { Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Coursepage.css'

const MyTable = () => {
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
        pdf.text('Name:'+'Ranasinghe R.D.J.M.', 10, 30);
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
        
    <div>
        <NavBar/>
            <div className='content-coursepage' style={{ marginTop: '20px' }}>
              <Row>
                  <Col>
                    <h3>CODE: COURSE_NAME</h3>
                    <div>
                        <DoughnutChart />
                    </div>
                  </Col>  
              </Row>
    
              
              <Row>
                <div>
                    <MyTable />
                </div>
              </Row>
              <Row>
                
              </Row>
            </div>
        </div>
    )
} 

