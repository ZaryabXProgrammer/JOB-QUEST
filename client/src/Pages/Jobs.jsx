
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

import JobCard from '../Components/JobCard';
import { JobsContext } from '../Helpers/JobContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* Change to column layout for mobile */
  background-color: #F8F9FD;
  padding: 10px;

  @media screen and (min-width: 768px) {
    flex-direction: row; /* Revert to row layout for larger screens */
  }
`;

const LeftContainer = styled.div`
  background-color: #FFFFFF;
  padding: 8px;
  margin: 10px 0; /* Adjust margin for mobile */
  border-radius: 8px;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 15vw;
    margin: 10px 10px 10px 30px;
  }
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

  @media screen and (min-width: 768px) {
    margin: 0; /* Adjust margin for larger screens */
  }
`;

const SortTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`

const SalaryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px; /* Adjust margin for mobile */
  
  @media screen and (min-width: 768px) {
    margin-bottom: 0; /* Reset margin for larger screens */
  }
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
  flex-direction: column;
  margin-bottom: 12px; /* Adjust margin for mobile */
  
  @media screen and (min-width: 768px) {
    margin-bottom: 0; /* Reset margin for larger screens */
  }
`;

const JobtypeTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`
const WorkLocationBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px; /* Adjust margin for mobile */
  
  @media screen and (min-width: 768px) {
    margin-bottom: 0; /* Reset margin for larger screens */
  }
`;

const WorkLocationTitle = styled.h1`
color: #015f01;
font-size: 18px;
margin-bottom: 10px;
`
const ExperienceBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px; /* Adjust margin for mobile */
  
  @media screen and (min-width: 768px) {
    margin-bottom: 0; /* Reset margin for larger screens */
  }
`;

const ExperienceTitle = styled.h1`
  color: #015f01;
  font-size: 18px;
  margin-bottom: 10px;
`;

// const CheckMarkContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const CheckMarkBox = styled.div`
//   display: flex;

//   align-items: center;
//   margin-right: 16px;
//   margin-bottom: 10px;
//   cursor: pointer;


// `;

// const CheckMarkIcon = styled.span`

//   width: 7px;
//   height: 7px;
//   border: 1px solid #333;
//   border-radius: 30%;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 3px;
//   margin-bottom: 3px;
//   padding: 7px;
// `;

// const CheckMarkLabel = styled.span`
//   font-size: 13px;


// `;


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
  margin-left: 10px;
`;

const CheckMarkLabel = styled.span`
  font-size: 13px;
  margin-left: 5px; /* Adjust margin as needed */
`;

const StyledInput = styled.input`
  display: none; /* Hide the default checkbox input */
`;

const CheckMarkContainer = styled.label`
  display: grid;
  grid-template-columns: auto 1fr; /* First column auto-sized, second column takes remaining space */
  align-items: center;
  cursor: pointer;
  margin-top: 10px; /* Add margin as needed */
`;


const RightContainer = styled.div`
  background-color: #FFFFFF;
  padding: 8px;
  margin: 10px 0; /* Adjust margin for mobile */
  border-radius: 8px;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 80vw;
    margin: 10px 50px 10px 16px;
  }
`;

const FindContainer = styled.div`
  background-color: #FFFFFF;
  padding: 8px;
  border-radius: 10px;
  margin: 10px 0; /* Adjust margin for mobile */

  @media screen and (min-width: 768px) {
    height: 21%;
    margin: 0;
  }
`;

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
  display: flex;
  flex-direction: column;
  margin: 13px 0 4px 0; /* Adjust margin for mobile */

  @media screen and (min-width: 768px) {
    flex-direction: row; /* Change to row layout for larger screens */
    margin: 0;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 10px; /* Adjust margin for mobile */

  @media screen and (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 0;
  }
`;




const Input = styled.input`
  flex: 1;
  padding: 15px 10px;
  border: 1px solid #DDDDDD;
  outline: none;
  border-radius: 3px;

  &::placeholder {
    color: #999999;
    display: flex;
    align-items: center;
  }

  &::placeholder + svg {
    margin-right: 8px;
  }

  @media screen and (min-width: 768px) {
    margin-right: 10px; /* Adjust margin for inputs on larger screens */
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 15px 1px;
  margin: 0 10px 0 10px;
  color: white;
  background-color: #119856;
  border: none;
  border-radius: 8px;

  @media screen and (max-width: 767px) {
    font-size: 14px; /* Adjust font size for smaller screens */
  }

  &:hover {
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
  justify-content: center; /* Center job cards horizontally */

  @media screen and (min-width: 768px) {
    justify-content: flex-start; /* Align job cards to the left for larger screens */
  }
`;

const Span = styled.span`
    
    color:  darkgreen;
`

const ShowingJobsTitle = styled.h3`
  color: #656669;
  font-weight: bold;
  font-size: 17px;
  margin: 18px 0 0px 0; /* Adjust margin for mobile */

  @media screen and (min-width: 768px) {
    margin: 18px 0 0px 4px; /* Reset margin for larger screens */
  }
`;




const Jobs = () => {

  const [salary, setSalary] = useState(100); // Initial salary value
  const [filters, setFilters] = useState('');



  const handleSalaryChange = (event) => {
    const value = parseInt(event.target.value, 10); // Parse the value to an integer
    setSalary(value);
  };

  const CheckMark = ({ label, onChange }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckChange = (event) => {
      const isChecked = event.target.checked;

      setFilters(isChecked ? label : ''); // Update filters based on checkbox state
      setChecked(isChecked);
      console.log(filters)
      onChange(label, isChecked); // Call the onChange handler with label and checked value
    };
    return (
      <CheckMarkContainer>
        <StyledInput type="checkbox" checked={checked} onChange={handleCheckChange} />
        <CheckMarkIcon checked={checked}>
          {checked && <CheckOutlinedIcon style={{ color: 'darkgreen' }} />}
        </CheckMarkIcon>
        <CheckMarkLabel>{label}</CheckMarkLabel>
      </CheckMarkContainer>
    );
  };



  //from contextApi

  const { newJobs, page1JobsActive } = useContext(JobsContext);

  const [jobInput, setjobInput] = useState('')

  const [countJobs, setcountJobs] = useState(0)

  const Api_Url = "http://localhost:8080";

  const [jobs, setJobs] = useState([]);


  const Filters = async () => {
    try {
      const res = await axios.post(`${Api_Url}/jobs/filter`,
        {
          filters: filters, salary: salary
        });
      setJobs(res.data);
      setcountJobs(res.data.length);

    } catch (error) {
      console.error("Error fetching job listings:", error);
    }
  };



  useEffect(() => {


    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${Api_Url}/jobs`);
        setJobs(res.data);
        setcountJobs(res.data.length);

      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };


    if (!page1JobsActive) {
      fetchJobs();

    }
    else if (filters) {
      Filters();
    }
    else {
      setJobs(newJobs)
      setcountJobs(newJobs.length);
    }


    console.log(jobs)

  }, []);

  //sending Search input to the databse to fetch jobs

  const handleJobSearch = async () => {
    try {
      const response = await axios.get(`${Api_Url}/jobs/search`, {
        params: { title: jobInput }
      });
      setJobs(response.data.jobs);
      setcountJobs(response.data.jobs.length)
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('OOPS! No Jobs Found', {
        autoClose: 2500
      });
    }
  }



  //filtered job search:



  return (

    <div>

      <Wrapper>
        <ToastContainer />




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
              step={1000} // Incremental step
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
            <CheckMarkContainer>
              <CheckMark label="On-site" />
              <CheckMark label="Remote" />
              <CheckMark label="Hybrid" />
            </CheckMarkContainer>
          </WorkLocationBox>

          <ExperienceBox>
            <ExperienceTitle>Experience</ExperienceTitle>
            <CheckMarkContainer>
              <CheckMark label="Fresher" />
              <CheckMark label="Beginner" />
              <CheckMark label="Intermediate" />

            </CheckMarkContainer>
          </ExperienceBox>

          <Button onClick={Filters}>Apply Filters </Button>

        </LeftContainer>

        <RightContainer>

          <FindContainer>

            <TitleBox>Find your Dream Job here! </TitleBox>
            <Desc>Explore our newest job opportunities to discover and apply for the top positions available today!</Desc>

            <SearchBox>


              <InputBox>
                <Input
                  placeholder="&#x1F50E;&#xFE0E; Search job title or company here"
                  onChange={(e) => setjobInput(e.target.value)}
                  value={jobInput}
                />

                <Input placeholder="🖈 Search country or city here" />
              </InputBox>


              <Button onClick={handleJobSearch} >Search</Button>

            </SearchBox>

          </FindContainer>
          <ShowingJobsTitle>Showing <Span>{countJobs}</Span>  Available Jobs</ShowingJobsTitle>
          <JobsContainer>

            {jobs && jobs.length > 0 && jobs.map((job) => (
              <JobCard
                id={job._id}
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
