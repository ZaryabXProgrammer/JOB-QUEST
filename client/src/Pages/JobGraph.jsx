import styled from "styled-components"
import JobOpeningsGraph from "../Components/JobOpeningsGraph";

const Container = styled.div`

width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
background-color: #f3f2ff;
`

const Header = styled.h1`
margin: 10px 0;
align-self: center;
font-size: 40px;
color: #007bff;

`

const Span = styled.span`

color: black;
`

const JobGraph = () => {

  const data = {
    years: ['2019', '2020', '2021', '2022', '2023'],
    languages: [
      { name: 'Developer, full-stack', jobOpenings: [51.9, 80, 120, 150, 200], color: '#673AB7' }, // Deep Purple
      { name: 'Developer, back-end', jobOpenings: [50.0, 60, 90, 110, 130], color: '#FF5722' }, // Deep Orange
      { name: 'Developer, front-end', jobOpenings: [32.8, 100, 140, 180, 220], color: '#4CAF50' }, // Green
      { name: 'Developer, desktop or enterprise applications', jobOpenings: [21.3, 60, 100, 140, 180], color: '#9C27B0' }, // Purple
      { name: 'Developer, mobile', jobOpenings: [18.1, 45, 65, 85, 105], color: '#FFC107' }, // Amber
      { name: 'Student', jobOpenings: [14.7, 120, 150, 180, 220], color: '#03A9F4' }, // Light Blue
      { name: 'Database administrator', jobOpenings: [11.7, 55, 75, 95, 115], color: '#E91E63' }, // Pink
      { name: 'Designer', jobOpenings: [11.3, 65, 85, 105, 125], color: '#FF5722' }, // Deep Orange
      { name: 'System administrator', jobOpenings: [11.0, 40, 60, 80, 100], color: '#607D8B' }, // Blue Grey
      { name: 'DevOps specialist', jobOpenings: [10.9, 60, 90, 110, 130], color: '#FFC107' }, // Amber
      { name: 'Developer, embedded applications or devices', jobOpenings: [8.9, 100, 140, 180, 220], color: '#4CAF50' }, // Green
      { name: 'Data scientist or machine learning specialist', jobOpenings: [7.9, 45, 65, 85, 105], color: '#E91E63' }, // Pink
      { name: 'Developer, QA or test', jobOpenings: [7.8, 55, 75, 95, 115], color: '#9C27B0' }, // Purple
      { name: 'Data or business analyst', jobOpenings: [7.7, 65, 85, 105, 125], color: '#FF5722' }, // Deep Orange
      { name: 'Academic researcher', jobOpenings: [7.3, 40, 60, 80, 100], color: '#607D8B' }, // Blue Grey
      { name: 'Engineer, data', jobOpenings: [7.2, 60, 90, 110, 130], color: '#FFC107' }, // Amber
      { name: 'Educator', jobOpenings: [5.5, 100, 140, 180, 220], color: '#4CAF50' }, // Green
      { name: 'Developer, game or graphics', jobOpenings: [5.5, 45, 65, 85, 105], color: '#E91E63' }, // Pink
      { name: 'Engineering manager', jobOpenings: [5.2, 55, 75, 95, 115], color: '#9C27B0' }, // Purple
      { name: 'Product manager', jobOpenings: [5.0, 65, 85, 105, 125], color: '#FF5722' }, // Deep Orange
      { name: 'Scientist', jobOpenings: [4.4, 40, 60, 80, 100], color: '#607D8B' }, // Blue Grey
      { name: 'Engineer, site reliability', jobOpenings: [3.6, 60, 90, 110, 130], color: '#FFC107' }, // Amber
      { name: 'Senior executive/VP', jobOpenings: [2.6, 100, 140, 180, 220], color: '#4CAF50' }, // Green
      { name: 'Marketing or sales professional', jobOpenings: [1.2, 45, 65, 85, 105], color: '#E91E63' }, // Pink
      // Add more roles as needed
    ],
  };



  return (
    <Container>
          <Header><Span>Job</Span> Insights</Header>
          <JobOpeningsGraph data={data} />
    </Container>
  )
}

export default JobGraph
