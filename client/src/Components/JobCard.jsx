import styled from 'styled-components';
import google from '../assets/benefits/google.png';
import apply from '../assets/benefits/apply.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';

const CardContainer = styled.div`
  background-color: white;
  
 margin: 10px 15px 15px ;
  width: 310px;
  height: 260px;
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

  width: 50%;
`;

const JobCompany = styled.p`
  font-size: 10px;
  color: #333;
`;

const JobApplicants = styled.p`
  font-size: 10px;
  color: #666;
`;

const ApplyLogo = styled.img`
  width: 30px;
  height: 30px;
 margin-right: 21px;
 margin-top: 3px;
`;

const Center = styled.div`

height: 110px;
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
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-right: 12px;
`;

const Salary = styled.p`
  color: darkgreen;
  font-size: 20px;
  font-weight: bold;
`;
const Span = styled.span`
   color: #666;
    font-size: 10px;
`

const DateContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;


`
const DatePosted = styled.p`
  font-size: 11px;
  color: #666;
  margin: 0 3px;
`;



const JobCard = () => {
  return (
    <CardContainer>
      <Wrapper>
        <Top>
          <Logo src={google} alt="Company Logo" />

          <JobTitleandDesc>
            <JobTitle>Software Engineer</JobTitle>
            <JobDesc>
              <CompanyandApplicants>
                <JobCompany>Google</JobCompany> {/* Replace "Company Name" with actual data */}
                <JobApplicants>12 Applicants</JobApplicants> {/* Replace "100" with actual number of applicants */}
              </CompanyandApplicants>
            </JobDesc>
          </JobTitleandDesc>
          <ApplyLogo src={apply} alt="Apply Logo" />
        </Top>

        <Center>
          <JobTypeContainer>
            <JobType textColor="purple" bgColor='#ffc4ff'>Full-Time</JobType>
            <JobType textColor="blue" bgColor="#c4e3ff">Part-Time</JobType>
            <JobType textColor="orange" bgColor="#ffd9c4">Contract</JobType>
          </JobTypeContainer>
          <JobDesc>Join Google&apos;s Cloud Platform team and work on cutting-edge technologies to empower businesses worldwide</JobDesc>
          {/* Update Location */}


        </Center>
        
        <Bottom>
          <Salary>$80K<Span> /month</Span></Salary>
          <JobLocationContainer>
            <LocationOnIcon />
            <JobLocation>Newyork</JobLocation>
          </JobLocationContainer>
          <  DateContainer>
            <AlarmOutlinedIcon />
            <DatePosted>2 days ago</DatePosted></DateContainer>
        </Bottom>
      </Wrapper>
    </CardContainer>
  );
};

export default JobCard;



