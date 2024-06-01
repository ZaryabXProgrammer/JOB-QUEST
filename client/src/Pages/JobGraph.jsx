import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';

Chart.register(...registerables);

const Container = styled.div`
  width: 100%;
  height: 100vh;  /* Height for desktop */
  display: flex;
  flex-direction: column;
  background-color: #f3f2ff;
  padding: 30px;

  @media(max-width: 768px) {
    padding: 5px;
    height: 90vh;  /* Reduced height for mobile */
  }
`;

const Header = styled.h1`
  margin: 10px 0;
  align-self: center;
  font-size: 40px;
  color: #007bff;

  @media(max-width: 768px) {
    font-size: 20px;
  }
`;

const Span = styled.span`
  color: black;
`;

const JobOpeningsGraph = ({ data }) => {
    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,  // Allow chart to use the full container height
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    padding: 5,  // Add padding to x-axis labels
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Job Openings',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    beginAtZero: true,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutCubic',
        },
    });

    const chartData = {
        labels: data.years,
        datasets: data.languages.map((language) => ({
            label: language.name,
            data: language.jobOpenings,
            borderColor: language.color,
            fill: false,
            tension: 0.1,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: 'white',
        })),
    };

    const updateChartOptions = () => {
        const isMobile = window.innerWidth <= 768;
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            scales: {
                x: {
                    title: {
                        display: !isMobile,
                        text: 'Year',
                        font: {
                            size: isMobile ? 10 : 14,
                        },
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12,
                        },
                        padding: isMobile ? 5 : 0,  // Adjust padding for mobile
                    },
                },
                y: {
                    title: {
                        display: !isMobile,
                        text: 'Job Openings',
                        font: {
                            size: isMobile ? 10 : 14,
                        },
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 10 : 12,
                        },
                    },
                },
            },
            plugins: {
                ...prevOptions.plugins,
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: isMobile ? 10 : 12,
                        },
                    },
                },
            },
        }));
    };

    useEffect(() => {
        window.addEventListener('resize', updateChartOptions);
        updateChartOptions(); // Initial call to set options based on current screen size

        return () => {
            window.removeEventListener('resize', updateChartOptions);
        };
    }, []);

    return <Line data={chartData} options={chartOptions} height={200} />;
};

const JobGraph = () => {
  const data = {
    years: ['2019', '2020', '2021', '2022', '2023'],
    languages: [
      { name: 'Developer, full-stack', jobOpenings: [51.9, 80, 120, 150, 200], color: '#673AB7' },
      { name: 'Developer, back-end', jobOpenings: [50.0, 60, 90, 110, 130], color: '#FF5722' },
      { name: 'Developer, front-end', jobOpenings: [32.8, 100, 140, 180, 220], color: '#4CAF50' },
      { name: 'Developer, desktop or enterprise applications', jobOpenings: [21.3, 60, 100, 140, 180], color: '#9C27B0' },
      { name: 'Developer, mobile', jobOpenings: [18.1, 45, 65, 85, 105], color: '#FFC107' },
      { name: 'Student', jobOpenings: [14.7, 120, 150, 180, 220], color: '#03A9F4' },
      { name: 'Database administrator', jobOpenings: [11.7, 55, 75, 95, 115], color: '#E91E63' },
      { name: 'Designer', jobOpenings: [11.3, 65, 85, 105, 125], color: '#FF5722' },
      { name: 'System administrator', jobOpenings: [11.0, 40, 60, 80, 100], color: '#607D8B' },
      { name: 'DevOps specialist', jobOpenings: [10.9, 60, 90, 110, 130], color: '#FFC107' },
      { name: 'Developer, embedded applications or devices', jobOpenings: [8.9, 100, 140, 180, 220], color: '#4CAF50' },
      { name: 'Data scientist or machine learning specialist', jobOpenings: [7.9, 45, 65, 85, 105], color: '#E91E63' },
      { name: 'Developer, QA or test', jobOpenings: [7.8, 55, 75, 95, 115], color: '#9C27B0' },
      { name: 'Data or business analyst', jobOpenings: [7.7, 65, 85, 105, 125], color: '#FF5722' },
      { name: 'Academic researcher', jobOpenings: [7.3, 40, 60, 80, 100], color: '#607D8B' },
      { name: 'Engineer, data', jobOpenings: [7.2, 60, 90, 110, 130], color: '#FFC107' },
      { name: 'Educator', jobOpenings: [5.5, 100, 140, 180, 220], color: '#4CAF50' },
      { name: 'Developer, game or graphics', jobOpenings: [5.5, 45, 65, 85, 105], color: '#E91E63' },
      { name: 'Engineering manager', jobOpenings: [5.2, 55, 75, 95, 115], color: '#9C27B0' },
      { name: 'Product manager', jobOpenings: [5.0, 65, 85, 105, 125], color: '#FF5722' },
      { name: 'Scientist', jobOpenings: [4.4, 40, 60, 80, 100], color: '#607D8B' },
      { name: 'Engineer, site reliability', jobOpenings: [3.6, 60, 90, 110, 130], color: '#FFC107' },
      { name: 'Senior executive/VP', jobOpenings: [2.6, 100, 140, 180, 220], color: '#4CAF50' },
      { name: 'Marketing or sales professional', jobOpenings: [1.2, 45, 65, 85, 105], color: '#E91E63' },
    ],
  };

  return (
    <Container>
      <Header><Span>Job</Span> Insights</Header>
      <JobOpeningsGraph data={data} />
    </Container>
  );
};

export default JobGraph;
