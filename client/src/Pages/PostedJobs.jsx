import styled from 'styled-components'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import pic from '../assets/pic.jpg'
import profile from '../assets/profile.png'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WorkIcon from '@mui/icons-material/Work';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { JobsContext } from '../Helpers/JobContext';



const Container = styled.div`
    
width: 100vw;
height: 100vh;
display: flex;
@media (max-width: 1024px) {
  flex-direction: column;
  height: auto;
}

`

const Left = styled.div`
    
width: 20%;

height: 100%;
margin: 5px;
display: flex;
flex-direction: column;
align-items: center;
background-color: #fbfcff;
@media (max-width: 1024px) {
    width: 100%;
    height: auto;
    margin: 0;
  }
`

const CandidateBtn = styled.button`
border: none;
margin-bottom: 10px;
cursor: pointer;
font-weight: bold;
text-align: center;
margin-top: 10px;
    padding: 8px 25px;
    color: white;
    background-color: #1d59ff;
    border-radius: 11px;
    display: flex;
    width: 80%;
    align-items: center;
    @media (max-width: 1024px) {
      width: 90%;
      padding: 10px 20px;
    }
  
    @media (max-width: 480px) {
      width: 95%;
      padding: 10px 15px;
    }
`

const ShoppingBag = styled.div`
    font-weight: bold;
width: 90%;
margin: 10px 30px;
display: flex;
justify-content: space-between;
align-items: center;
@media (max-width: 1024px) {
  width: 100%;
  margin: 10px 0;
  justify-content: center;
}

`

const Right = styled.div`
    
   width: 75%;
   height: auto;

   margin: 5px;
   background-color: #fbfcff;
   display: flex;
   flex-direction: column;
   align-items: center;

   @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
    padding: 10px;
  }
   
   
`

const Top = styled.div`
    
height: 70px;
width: 95%;
padding: 10px;
margin: 10px;
background-color: #e8efff;
border-radius: 10px;
display: flex;
justify-content: space-evenly;
align-items: center;
color: black;
@media (max-width: 1024px) {
  flex-direction: row;
  height: auto;
  padding: 10px;
  margin: 10px 0;
  justify-content: space-between;
}

@media (max-width: 480px) {
  flex-direction: column;
  align-items: flex-start;
}

`

const TopLabels = styled.h3`
font-size: 14px;
font-weight: bold;
@media (max-width: 480px) {
  font-size: 12px;
  margin-bottom: 5px;
}

`
const Center = styled.div`
    
height: auto;
width: 95%;
padding: 10px;
margin: 10px;
background-color: #e8efff;
border-radius: 10px;
display: flex;
justify-content: space-evenly;

color: black;
@media (max-width: 1024px) {
  flex-direction: column;
  margin: 10px 0;
}

`

const Candidates = styled.div`
    
display: flex;
flex-direction: column;
width: 95%;
`
const Candidate = styled.div`

height: 70px;
width: 100%;

gap: 30px;
background-color: #fefcff;

display: flex;
justify-content: space-around;
align-items: center;
color: black;
transition: background-color 0.2s ease;

&:hover{
    background-color: #dfe6fa;
}
@media (max-width: 1024px) {
  flex-direction: row;
  height: auto;
  padding: 10px;
  gap: 10px;
}

@media (max-width: 480px) {
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
}

`

const ProfileBox = styled.div`
    
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100px;

`

const ProfilePic = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
margin-right: 4px;
@media (max-width: 480px) {
  font-size: 12px;
}
`

const Name = styled.p`
    font-weight: bold;
    font-size: 15px;
    @media (max-width: 480px) {
      font-size: 12px;
    }
`

const CompanyFit = styled.div`
width: 120px;
background-color: #f6f9ff;
  padding: 9px 10px;
  color: ${({ score }) => {
        if (score >= 90) return '#006400'; // Dark Green
        if (score >= 85) return '#228B22'; // Forest Green
        if (score >= 70) return '#1eb31e'; // Lime Green
        if (score >= 60) return '#32d400'; // Green Yellow
        if (score >= 50) return '#FFD700'; // Gold
        if (score >= 40) return '#FFA500'; // Orange
        if (score >= 30) return '#FF8C00'; // Dark Orange
        if (score >= 20) return '#FF4500'; // Orange Red
        if (score >= 10) return '#FF0000'; // Red
        return '#8B0000'; // Dark Red
    }};
  font-size: 14px;
  font-weight: bold;
  border-radius: 17px;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 8px 15px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

const Skills = styled.div`
    width: max-content;
    padding: 5px 8px;
    font-size: 12px;    

    color:#ffffff;
    border-radius: 10px;
    background-color: #3067fd;
    text-align: center;
    @media (max-width: 1024px) {
      font-size: 10px;
      padding: 5px 8px;
    }

`

const AppliedDiv = styled.div`
    
text-align: center;

`

const AppliedJob = styled.div`
    width: 120px;
    padding: 4px 14px;
    border: 1px solid #e9e9e9;
    font-size: 12px;
    border-radius: 13px;
    color: black;
width: max-content;
display: flex;
align-items: center;
justify-content: center;
@media (max-width: 1024px) {
  font-size: 10px;
  padding: 3px 10px;
}
`

const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #0090f8;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  &:hover {
    color: #0090f8;
  }
`;

const LastInterview = styled.p`
    
    font-size: 12px;
    @media (max-width: 1024px) {
      font-size: 10px;
    }
  
    @media (max-width: 480px) {
      font-size: 10px;
    }
`




const PostedJobs = () => {

    const userId = useSelector((state) => state.user.currentUser ? state.user.currentUser._id : null)




    const [myCreatedJobs, setMyCreatedJobs] = useState([]);
    const baseUrl = import.meta.env.VITE_baseUrl;

    useEffect(() => {
        const fetchMyCreatedJobs = async () => {
            try {
                const response = await axios.get(`${baseUrl}/applied/findall/${userId}`);
                setMyCreatedJobs(response.data);
            } catch (error) {
                console.log('Error fetching my created jobs:', error);
            }
        };

        fetchMyCreatedJobs();
    }, [userId, baseUrl]); // Add userId and baseUrl to dependency array


    return (

        <Container>

            <Left>

                <ShoppingBag><span >Menu</span><WorkIcon style={{ color: '#1d59ff' }} />

                </ShoppingBag>

                <CandidateBtn>
                    <PersonIcon style={{ marginRight: '12px' }} />
                    <span>Candidates</span>


                </CandidateBtn>

                {/* <CandidateBtn>
                    <PersonIcon style={{ marginRight: '12px' }} />
                    <span>Vacancies</span>


                </CandidateBtn> */}
            </Left>


            <Right>
                <Top>
                    <TopLabels style={{ display: 'flex', alignItems: 'center' }}>Name<ArrowDownwardIcon /></TopLabels>
                    <TopLabels style={{ display: 'flex', alignItems: 'center' }}>Company Fit<ArrowDownwardIcon /></TopLabels>
                    <TopLabels style={{ display: 'flex', alignItems: 'center' }}>Tags<ArrowDownwardIcon /></TopLabels>
                    <TopLabels style={{ display: 'flex', alignItems: 'center' }}>Applied Job<ArrowDownwardIcon /></TopLabels>
                    <TopLabels style={{ display: 'flex', alignItems: 'center' }}>Application Date<ArrowDownwardIcon /></TopLabels>

                </Top>


                <Center>
                    <Candidates>

                        {myCreatedJobs.map((job) => (

                            <Link key={job._id} to={`/profile/${job.userId}`} style={{ textDecoration: 'none' }}>
                                <Candidate key={job._id}>
                                    <ProfileBox>
                                        <ProfilePic src={profile} />

                                        <Link
                                            style={{ textDecoration: 'none', color: 'black' }}

                                            to={`/profile/${job.userId}`}
                                        >
                                            <Name >{job.candidateName}</Name>
                                        </Link>


                                    </ProfileBox>

                                    <CompanyFit score={job.matchScore}>

                                        <ThumbUpIcon style={{ marginRight: '4px', fontSize: '20px' }} />{job.matchScore}% Match</CompanyFit>

                                    <AppliedDiv> 
                                        <Skills>{job.status}</Skills>
                                    </AppliedDiv>

                                    <AppliedJob>
                                        <StyledLink to={`/apply/${job.jobId}`}>
                                            {job.title} @ {job.company}
                                        </StyledLink>
                                        <MoreHorizIcon style={{ color: '#1d59ff', marginLeft: '4px' }} />

                                    </AppliedJob>

                                    <LastInterview>
                                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </LastInterview>

                                </Candidate>


                            </Link>

                        ))}







                    </Candidates>
                </Center>
            </Right>

        </Container>

    )
}

export default PostedJobs
