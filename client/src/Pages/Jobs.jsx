
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import axios from 'axios'

import JobCard from '../Components/JobCard';

const Wrapper = styled.div`
  display: flex; /* Make the wrapper a flex container */
  justify-content: space-between; /* Distribute space between child elements */
  background-color: #F8F9FD;

  
`;

const LeftContainer = styled.div`
  background-color: #FFFFFF;
  width: 15vw;
  flex: 1; /* Take up 1 part of the available space */
  padding: 8px;
  margin: 10px 10px 10px 30px; /* Adjust margin as needed */
  display: flex;
  flex-direction: column;
  height: 80%;
  
  border-radius: 8px;
`;

const FilterHeading = styled.div`
 display: flex;
 justify-content: space-between;
 margin-bottom: 10px;
 align-items: center;
 margin-top: 10px;
`

const FilterTitle = styled.h1`
font-size: 22px;
color: darkgreen;
font-weight: bold;


    
`
const Reset = styled.p`

color: #00a000;
font-size: 14px;
margin-right: 2px;


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



const RightContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80vw;
margin: 10px 50px 10px 16px; 


`;

const FindContainer = styled.div`
    height: 21%;
     background-color: #FFFFFF;
 padding: 8px;

    border-radius: 10px;
`

const TitleBox = styled.h1`
color: #015f01;
font-weight: bold;
font-size: 22px;
margin: 10px 0 10px 12px; //top right bottom left
`

const Desc = styled.p`
margin-left: 12px;
`

const SearchBox = styled.div`
margin: 13px 0 4px 12px;
display: flex;

align-items: center;
justify-content: center;

`

const InputBox = styled.div`
   display: flex;
  align-items: center; /* Center items vertically */
 
  flex: 6;
`;

const Input = styled.input`
  flex: 1; /* Take up remaining space */
/* Add spacing between inputs */
  padding: 15px 10px; /* Add padding to the input field */
  border: 1px solid #DDDDDD;
  outline: none;
  border-radius: 3px;

  /* Add placeholder styles */
  &::placeholder {
    color: #999999; /* Placeholder text color */
    display: flex;
    align-items: center; /* Center content vertically */
  }

  /* Adjust padding for placeholder with icon */
  &::placeholder + svg {
    margin-right: 8px; /* Add right margin to the icon */
  }
  
`;

const Button = styled.button`
  flex: 1;
  padding: 15px 1px; /* Add padding to the button */
  margin: 0 10px 0 10px;
  color: white;
  background-color: #119856;
  border: none;
  border-radius: 8px;
  &:hover{
    cursor: pointer;
  }
`;



const JobsContainer = styled.div`
    margin-top: 20px;
height: auto;

 padding: 8px;

    border-radius: 10px;
        display: flex;
    flex-wrap: wrap;


`

const Span = styled.span`
    
    color:  darkgreen;
`


const ShowingJobsTitle = styled.h3`

color: #656669;
font-weight: bold;
font-size: 17px;
margin: 18px 0 0px 4px; //top right bottom left
`




const Jobs = () => {
  const Api_Url = "http://localhost:8080";
  const [salary, setSalary] = useState(100); // Initial salary value
  const [jobs, setJobs] = useState([]);
  const handleSalaryChange = (event) => {
    setSalary(parseInt(event.target.value, 10)); // Parse the value to an integer
  };

  // useEffect(() => {
  //   // Fetch job listings when the component mounts
  //   const getJobs = async () => {
  //     try {
  //       const jobListings = await fetchJobListings();
  //       setJobs(jobListings);
  //     } catch (error) {
  //       console.error('Error fetching job listings:', error);
  //     }
  //   };
  //   getJobs();
  // }, []);

  // console.log(jobs)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await axios.get(`${Api_Url}/jobs`).then((res) => setJobs(res.data))

      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobs(); // Call the fetchJobs function
    console.log(jobs)

    // Empty dependency array means this effect will only run once, similar to componentDidMount
  }, []);


  return (

    <div>

      <Wrapper>




        <LeftContainer>



          <FilterHeading>

            <FilterTitle>Filter</FilterTitle>
            <Reset>Reset </Reset>


          </FilterHeading>

          <hr />

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

          <FindContainer>

            <TitleBox>Find your Dream Job here! </TitleBox>
            <Desc>Explore our newest job opportunities to discover and apply for the top positions available today!</Desc>

            <SearchBox>


              <InputBox>
                <Input placeholder="&#x1F50E;&#xFE0E; Search job title or company here" />

                <Input placeholder="🖈 Search country or city here" />
              </InputBox>


              <Button>Search</Button>

            </SearchBox>

          </FindContainer>
          <ShowingJobsTitle>Showing <Span>1312 </Span>  Available Jobs</ShowingJobsTitle>
          <JobsContainer>

            {jobs.map((job) => (
              <JobCard
                key={job._id}
                jobLogo={job.jobLogo}
                title={job.title}
                description={job.description}
                company={job.company}
                applicants={job.applicants}
                jobType={job.jobType}
                workLocation={job.workLocation}
                salary={job.salary}
                jobLocation={job.jobLocation}
                createdAt={job.createdAt}
              />
            ))}



          </JobsContainer>

        </RightContainer>


      </Wrapper>
    </div>

  )
}

export default Jobs
