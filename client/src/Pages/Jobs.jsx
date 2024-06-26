
import { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import JobCard from '../Components/JobCard';
import { JobsContext } from '../Helpers/JobContext';




const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* Change to column layout for mobile */
  background-color: #F8F9FD;
  animation: ${fadeInAnimation} 0.6s ease; /* Apply left-to-right animation */  padding: 10px;

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
    width: 25vw;
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
cursor: pointer;


`

const SortBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;

  @media screen and (min-width: 768px) {
    margin: 10px 0; /* Adjust margin for larger screens */
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
    margin: 10px 0;
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

  @media screen and (min-width: 768px) {
    margin: 10px 0;
  }
`;


const JobTypeBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px; /* Adjust margin for mobile */
  
  @media screen and (min-width: 768px) {
    margin: 10px 0;
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
      margin: 10px 0;
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
margin-top: 3px;
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
    flex: 4;
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

  @media screen and (max-width: 768px) {
    font-size: 14px; /* Adjust font size for smaller screens */
    padding: 15px 25px;
  }

  @media screen and (min-width: 914px) {
    padding: 15px 40px; /* Adjust padding for larger screens */
    max-width: 250px; /* Limit maximum width for larger screens */
    flex: none; /* Remove flex to prevent stretching on larger screens */
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
  margin: 7px 0 0px 0; /* Adjust margin for mobile */

  @media screen and (min-width: 768px) {
    margin: 4px 0 0px 4px; /* Reset margin for larger screens */
  }
`;

const Jobs = () => {
  const [salary, setSalary] = useState(100);
  const [filters, setFilters] = useState({
    jobType: [],
    workLocation: [],
    experience: []
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { newJobs, page1JobsActive } = useContext(JobsContext);
  const [jobInput, setJobInput] = useState('');
  const [countJobs, setCountJobs] = useState(0);
  const Api_Url = "http://localhost:8080";

  const SORT_OPTIONS = {
    RECENTLY: "Recently",
    TOP_SALARY: "Top Salary",
    RATING: "Rating",
    A_Z: "A-Z"
  };
  const handleSalaryChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSalary(value);
  };
  const applySorting = (sortingOption) => {
    let sortedJobs = [...jobs];

    switch (sortingOption) {
      case SORT_OPTIONS.RECENTLY:

        sortedJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case SORT_OPTIONS.TOP_SALARY:

        sortedJobs.sort((a, b) => b.salary - a.salary);
        break;
      case SORT_OPTIONS.RATING:

        sortedJobs.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case SORT_OPTIONS.A_Z:

        sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
        console.log(sortedJobs)
        break;
      default:
        break;
    }

    setFilteredJobs(sortedJobs);
  };


  const CheckMark = ({ label, filterType }) => {
    const isSelected = filters[filterType] === label;
    const isSorted = filters.sort === label;

    const handleCheckChange = () => {
      if (isSelected) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: "",
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: label,
        }));
        if (isSorted) {
          applySorting(label);
        }
      }
    };

    return (
      <CheckMarkContainer>
        <StyledInput
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckChange}
        />
        <CheckMarkIcon checked={isSelected}>
          {isSelected && <CheckOutlinedIcon style={{ color: "darkgreen" }} />}
        </CheckMarkIcon>
        <CheckMarkLabel>{label}</CheckMarkLabel>
      </CheckMarkContainer>
    );
  };
  const applyFilters = () => {
    let filtered = jobs;


    if (SORT_OPTIONS.TOP_SALARY === filters.sort) {
      filtered = [...jobs].sort((a, b) => b.salary - a.salary);
    } else if (SORT_OPTIONS.RECENTLY === filters.sort) {
      filtered = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (SORT_OPTIONS.RATING === filters.sort) {
      filtered = [...jobs].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (SORT_OPTIONS.A_Z === filters.sort) {
      filtered = [...jobs].sort((a, b) => a.title.localeCompare(b.title));
    }


    if (filters.jobType.length > 0) {
      filtered = filtered.filter(job => filters.jobType.includes(job.jobType));
    }

    if (filters.workLocation.length > 0) {
      filtered = filtered.filter(job => filters.workLocation.includes(job.workLocation));
    }

    if (filters.experience.length > 0) {
      filtered = filtered.filter(job => filters.experience.includes(job.experience));
    }

    filtered = filtered.filter(job => job.salary >= salary);

    setFilteredJobs(filtered);
    setCountJobs(filtered.length);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${Api_Url}/jobs`);
        setJobs(res.data);
        setFilteredJobs(res.data);
        setCountJobs(res.data.length);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    if (!page1JobsActive) {
      fetchJobs();
    } else {
      setJobs(newJobs);
      setFilteredJobs(newJobs);
      setCountJobs(newJobs.length);
    }
  }, [page1JobsActive, newJobs]);

  const handleJobSearch = async () => {
    try {
      const response = await axios.get(`${Api_Url}/jobs/search`, {
        params: { title: jobInput }
      });
      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs);
      setCountJobs(response.data.jobs.length);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('OOPS! No Jobs Found', {
        autoClose: 2500
      });
    }
  };

  return (
    <div>
      <Wrapper>
        <ToastContainer />

        <LeftContainer>
          <FilterHeading>
            <FilterTitle>Filter</FilterTitle>
            <Reset onClick={() => setFilters({ jobType: [], workLocation: [], experience: [] })}>Reset</Reset>
          </FilterHeading>
          <hr />
          <SortBox>
            <SortTitle>Sort By</SortTitle>
            <CheckMarkContainer>
              <CheckMark label="Recently" filterType="sort" />
              <CheckMark label="Top Salary" filterType="sort" />
              <CheckMark label="Rating" filterType="sort" />
              <CheckMark label="A-Z" filterType="sort" />
            </CheckMarkContainer>
          </SortBox>
          <SalaryBox>
            <SalaryTitle>Salary Range</SalaryTitle>
            <SalarySlider
              type="range"
              min={500}
              max={100000}
              step={1000}
              value={salary}
              onChange={handleSalaryChange}
            />
            <p>{`$${salary}`}</p>
          </SalaryBox>
          <JobTypeBox>
            <JobtypeTitle>Job Type</JobtypeTitle>
            <CheckMarkContainer>
              <CheckMark label="Full-Time" filterType="jobType" />
              <CheckMark label="Part-Time" filterType="jobType" />
              <CheckMark label="Freelance" filterType="jobType" />
              <CheckMark label="Contractual" filterType="jobType" />
              <CheckMark label="Internship" filterType="jobType" />
            </CheckMarkContainer>
          </JobTypeBox>
          <WorkLocationBox>
            <WorkLocationTitle>Work Location</WorkLocationTitle>
            <CheckMarkContainer>
              <CheckMark label="On-site" filterType="workLocation" />
              <CheckMark label="Remote" filterType="workLocation" />
              <CheckMark label="Hybrid" filterType="workLocation" />
            </CheckMarkContainer>
          </WorkLocationBox>
          <ExperienceBox>
            <ExperienceTitle>Experience</ExperienceTitle>
            <CheckMarkContainer>
              <CheckMark label="Fresher" filterType="experience" />
              <CheckMark label="Beginner" filterType="experience" />
              <CheckMark label="Intermediate" filterType="experience" />
              <CheckMark label="Expert" filterType="experience" />
            </CheckMarkContainer>
          </ExperienceBox>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </LeftContainer>
        <RightContainer>
          <FindContainer>
            <TitleBox>Find your Dream Job here! </TitleBox>
            <Desc>Explore our newest job opportunities to discover and apply for the top positions available today!</Desc>
            <SearchBox>
              <InputBox>
                <Input
                  placeholder="&#x1F50E;&#xFE0E; Search by Job Title"
                  onChange={(e) => setJobInput(e.target.value)}
                  value={jobInput}
                />
                {/* <Input placeholder="🖈 Search country or city here" /> */}
              </InputBox>
              <Button onClick={handleJobSearch}>Search</Button>
            </SearchBox>
          </FindContainer>
          <ShowingJobsTitle>Showing <Span>{countJobs}</Span> Available Jobs</ShowingJobsTitle>
          <JobsContainer>
            {filteredJobs && filteredJobs.length > 0 && filteredJobs.map((job) => (
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
  );
};

export default Jobs;
