
import { useState } from 'react'
import styled from 'styled-components'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Announcement from '../Components/Announcement';
import Navbar from '../Components/Navbar';

const Wrapper = styled.div`
    
    
    background-color: #e8eeff;
    height: 120vh;
`


const LeftContainer = styled.div`

background-color: #fffafa;
    flex: 1;
    padding: 8px;
    margin: 10px 50px;
display: flex;
flex-direction: column;
height: 80%;
width: 20vw;
`

const FilterHeading = styled.div`
 display: flex;
 justify-content: space-between;
 margin-bottom: 10px;
 align-items: center;
`

const FilterTitle = styled.h1`
font-size: 22px;
color: darkgreen;
font-weight: bold;

    
`
const Reset = styled.p`

color: #00a000;
font-size: 12px;

`

const SortBox = styled.div`
display: flex;
flex-direction: column;
margin: 12px 0;
    
    
`

const SortTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`

const SalaryBox = styled.div`
  display: flex;
 flex-direction: column;
`;

const SalaryTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`;
const SalarySlider = styled.input`
  width: 100%;
  -webkit-appearance: none; /* Remove default styles */
  appearance: none;
  height: 10px; /* Customize the height of the slider */
  border-radius: 5px; /* Round the slider edges */
  background: #f5f5f5; /* Default background color */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set initial opacity */
  transition: opacity 0.2s; /* Smooth transition for hover effect */
  margin-bottom: 10px;

  /* Customize the slider track */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: #c5c5c5; /* Green color for the track */
    border-radius: 5px; /* Round the track edges */
  }

  /* Customize the slider thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default thumb appearance */
    appearance: none;
    width: 19px; /* Customize thumb width */
    height: 19px; /* Customize thumb height */
    background: green; /* White color for the thumb */
    border-radius: 50%; /* Round the thumb to a circle */
    cursor: pointer; /* Add cursor pointer */
    border:none ;/* Green border for the thumb */
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); /* Add shadow for the thumb */
    transform: translateY(-5px); /* Move thumb up by 5px */
  }

  /* Hover effect for the thumb */
  &:hover::-webkit-slider-thumb {
    opacity: 1; /* Change thumb opacity on hover */
  }
`;


const JobTypeBox = styled.div`
    display: flex;
    flex-wrap: wrap;
flex-direction: column;
margin: 12px 0;

`
const JobtypeTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`
const WorkLocationBox = styled.div`
    display: flex;
flex-direction: column;margin: 12px 0;

`

const WorkLocationTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`
const ExperienceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column; /* Items will be arranged in a column */
  align-items: flex-start; /* Align items to the start of the column */
  margin: 12px 0;
`;

const ExperienceTitle = styled.h1`
  color: #015f01;
  font-size: 18px;
  margin-bottom: 10px;
`;


const RightContainer = styled.div`
    flex: 3;

`

const CheckMarkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const CheckMarkBox = styled.div`
  display: flex;

  align-items: center;
  margin-right: 16px;
  margin-bottom: 10px;
  cursor: pointer;

  
`;

const CheckMarkIcon = styled.span`

  width: 7px;
  height: 7px;
  border: 1px solid #333;
  border-radius: 30%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  margin-bottom: 3px;
  padding: 7px;
`;

const CheckMarkLabel = styled.span`
  font-size: 13px;
  
  
`;

const CheckMark = ({ label }) => {
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(!checked);
    };

    return (
        <CheckMarkBox onClick={handleCheck}>
            <CheckMarkIcon style={{ padding: '8px', color: 'green' }} >
                {checked ? <CheckOutlinedIcon /> : ''}</CheckMarkIcon>
            <CheckMarkLabel>{label}</CheckMarkLabel>
        </CheckMarkBox>
    );
};




const Jobs = () => {

    const [salary, setSalary] = useState(100); // Initial salary value

    const handleSalaryChange = (event) => {
        setSalary(parseInt(event.target.value, 10)); // Parse the value to an integer
    };




    return (



        <Wrapper>
            <Announcement />
            <Navbar />


            <LeftContainer>



                <FilterHeading>

                    <FilterTitle>Filter</FilterTitle>
                    <Reset>Reset</Reset>
                </FilterHeading>

                <SortBox>
                    <SortTitle>Sort By</SortTitle>
                    <CheckMarkContainer>
                        <CheckMark label="Recently" />
                        <CheckMark label="Top Salary" />
                        <CheckMark label="Rating" />
                        <CheckMark label="A-Z" />

                    </CheckMarkContainer>
                </SortBox>

                <SalaryBox>
                    <SalaryTitle>Salary Range</SalaryTitle>
                    <SalarySlider
                        type="range"
                        min={500} // Minimum salary value
                        max={100000} // Maximum salary value
                        step={2000} // Incremental step
                        value={salary}
                        onChange={handleSalaryChange}
                    />
                    <p>{`$${salary}`}</p> {/* Display the current salary value */}
                </SalaryBox>
                <JobTypeBox>
                    <JobtypeTitle>Job Type</JobtypeTitle>
                    <CheckMarkContainer>
                        <CheckMark label="Full-Time" />
                        <CheckMark label="Part-Time" />
                        <CheckMark label="Freelance" />
                        <CheckMark label="Contractual" />
                        <CheckMark label="Internship" />

                    </CheckMarkContainer>
                </JobTypeBox>

                <WorkLocationBox>
                    <WorkLocationTitle>Work Location</WorkLocationTitle>
                    <CheckMarkContainer>                  <CheckMark label="On-site" />
                        <CheckMark label="Remote" />
                        <CheckMark label="Hybrid" />  </CheckMarkContainer>


                </WorkLocationBox>

                <ExperienceBox >
                    <ExperienceTitle>Experience </ExperienceTitle>
                    <CheckMarkContainer>  <CheckMark label="Fresher" />
                        <CheckMark label="Beginner" />
                        <CheckMark label="Intermediate" />
                        <CheckMark label="Expert" />
                    </CheckMarkContainer>

                </ExperienceBox>


            </LeftContainer>











            <RightContainer>



            </RightContainer>


        </Wrapper>


    )
}

export default Jobs
