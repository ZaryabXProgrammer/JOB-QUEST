import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom'
import apply from '../assets/benefits/apply.png';
import green from '../assets/benefits/green.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';

const CardContainer = styled.div`
  background-color: white;
  
 margin: 10px 15px 15px ;
width: 287px;
    height: 240px;
  justify-content: space-between;
  
  
  border-radius: 19px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.32s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  
  }
`;
const Wrapper = styled.div`

    width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 9px;
  flex: 1;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 4px 4px 0 0 ;

`;

const JobTitleandDesc = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const JobTitle = styled.h2`
  color: darkgreen;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  
`;

const JobDesc = styled.p`
  font-size: 14px;
  color: #666;
`;

const CompanyandApplicants = styled.div`
  display: flex;
  justify-content: space-between;

  width: 57%;
`;

const JobCompany = styled.p`
  font-size: 10px;
  color: #333;
`;

const JobApplicants = styled.p`
  font-size: 10px;
  color: #666;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ApplyLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  margin-top: 3px;
  transition: all 0.3s ease; /* Apply transition to all properties in default state */
  animation: ${fadeIn} 0.3s ease forwards; /* Apply animation on hover */

  /* Change properties on hover */
  &:hover {
    content: url(${green}); /* Change image source on hover */
    opacity: 0.8; /* Example transition for opacity */
  }
`;

const Center = styled.div`

height: 80px;
width: 80%;
margin: 15px 20px;

`;

const JobTypeContainer = styled.div`
display: flex;

`

const JobType = styled.p`
margin-right: 9px;
  font-size: 11px;
  font-weight: bold; 
  padding: 6px 8px;
  border-radius: 5px;
  
 margin-bottom: 20px;
  color: ${({ textColor }) => textColor || 'black'};
  background-color: ${({ bgColor }) => bgColor || 'lightgray'};
`;

const Bottom = styled.div`
margin: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JobLocationContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

`

const JobLocation = styled.p`
  font-size: 10px;
  font-weight: bold;
  color: #333;
  margin-right: 12px;
`;

const Salary = styled.p`

  color: darkgreen;
  font-size: 18px;
  font-weight: bold;
`;
const Span = styled.span`
   color: #666;
    font-size: 5px;
`

const DateContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;


`
const DatePosted = styled.p`
  font-size: 10px;
  color: #666;
  margin: 0 2px;
`;



const JobCard = ({ id, jobLogo, title, description, company, applicants, jobType, workLocation, salary, jobLocation, createdAt }) => {



  //date
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));


  // const navigate = useNavigate()
  //   const HandleJobApply = () => {


  //     navigate(`/apply/${id}`)
  // }


  return (
    <CardContainer >
      <Wrapper>
        <Top>
          <Logo src={jobLogo} alt="Company Logo" />

          <JobTitleandDesc>
            <JobTitle>{title}</JobTitle>
            <JobDesc>
              <CompanyandApplicants>
                <JobCompany>{company}</JobCompany> {/* Replace "Company Name" with actual data */}
                <JobApplicants>{applicants} Applicatnts</JobApplicants> {/* Replace "100" with actual number of applicants */}
              </CompanyandApplicants>
            </JobDesc>
          </JobTitleandDesc>
          <Link to={`/apply/${id}`} > <ApplyLogo src={apply} alt="Apply Logo" /></Link>
        </Top>

        <Center>
          <JobTypeContainer>
            {jobType && (jobType.toLowerCase() === 'fulltime' || jobType.toLowerCase() === 'full-time') ? (
              <JobType textColor="#4a148c" bgColor='#ffc4ff'>Full-Time</JobType>
            ) : jobType && (jobType.toLowerCase() === 'parttime' || jobType.toLowerCase() === 'part-time') ? (
              <JobType textColor="#0d47a1" bgColor="#c4e3ff">Part-Time</JobType>
            ) : (
              <JobType textColor="#ffffff" bgColor="#34495e">Contract</JobType>


            )}

            {workLocation && (workLocation.toLowerCase() === 'onsite' || workLocation.toLowerCase() === 'on-site') ? (
              <JobType textColor="#4a148c" bgColor='#d0c7ff'>On-Site</JobType>
            ) : workLocation && workLocation.toLowerCase() === 'remote' ? (
              <JobType textColor="#1b5e20" bgColor="#dcedc8">Remote</JobType>
            ) : (
              <JobType textColor="#ff6d00" bgColor="#ffd9c4">Location</JobType>
            )}
          </JobTypeContainer>




          <JobDesc>{description}</JobDesc>
          {/* Update Location */}


        </Center>

        <Bottom>
          <Salary>

            ${salary > 1000 ? `${(salary / 1000).toFixed(0)}K` : salary}<Span> /m</Span>

          </Salary>
          <JobLocationContainer>
            <LocationOnIcon />
            <JobLocation>{jobLocation}</JobLocation>
          </JobLocationContainer>
          <  DateContainer>
            <AlarmOutlinedIcon />
            <DatePosted>{daysAgo} days ago</DatePosted>
          </DateContainer>
        </Bottom>
      </Wrapper>
    </CardContainer>
  );
};

export default JobCard;



