import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';


const ChartComponent = () => {
  const data = {
    labels: ['CO326', 'CO327', 'CO328', 'CO513', 'CO544'],
    datasets: [
      {
        label: 'Completion level',
        data: [85, 70, 80, 90, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
    }
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max : 100,
      },
    },
  };

  return (
    <Container className="mt-5 ml-3">
      <div>
        <h2>E18 Courses</h2>
        <Bar data={data} options={options} />
      </div>
    </Container>
    
  );
};

export default ChartComponent;
