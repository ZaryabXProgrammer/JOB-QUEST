import styled from 'styled-components'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import pic from '../assets/pic.jpg'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WorkIcon from '@mui/icons-material/Work';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom';



const Container = styled.div`
    
width: 100vw;
height: 100vh;
display: flex;


`

const Left = styled.div`
    
width: 20%;

height: 100%;
margin: 5px;
display: flex;
flex-direction: column;
align-items: center;
background-color: #fbfcff;
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
`

const ShoppingBag = styled.div`
    font-weight: bold;
width: 90%;
margin: 10px 30px;
display: flex;
justify-content: space-between;
align-items: center;

`

const Right = styled.div`
    
   width: 75%;
   height: auto;

   margin: 5px;
   background-color: #fbfcff;
   display: flex;
   flex-direction: column;
   align-items: center;
   
   
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

`

const TopLabels = styled.h3`
font-size: 14px;
font-weight: bold;

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

`

const ProfileBox = styled.div`
    
    display: flex;
    align-items: center;
    padding: 10px;

`

const ProfilePic = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
margin-right: 4px;

`

const Name = styled.p`
    font-weight: bold;
    font-size: 14px;
`

const CompanyFit = styled.div`
  padding: 10px 20px;
  color: ${({ score }) => {
        if (score >= 90) return '#006400'; // Dark Green
        if (score >= 85) return '#228B22'; // Forest Green
        if (score >= 70) return '#32CD32'; // Lime Green
        if (score >= 60) return '#ADFF2F'; // Green Yellow
        if (score >= 50) return '#FFD700'; // Gold
        if (score >= 40) return '#FFA500'; // Orange
        if (score >= 30) return '#FF8C00'; // Dark Orange
        if (score >= 20) return '#FF4500'; // Orange Red
        if (score >= 10) return '#FF0000'; // Red
        return '#8B0000'; // Dark Red
    }};
  font-size: 14px;
  font-weight: bold;
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const Skills = styled.div`
    width: max-content;
    padding: 5px 8px;
    font-size: 12px;    

    color:#ffffff;
    border-radius: 10px;
    background-color: #3067fd;

`


const AppliedJob = styled.div`
    
    padding: 4px 14px;
    border: 1px solid #e9e9e9;
    font-size: 12px;
    border-radius: 13px;
    color: black;
width: max-content;
display: flex;
align-items: center;
justify-content: center;



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
`




const PostedJobs = () => {

    const userId = useSelector((state) => state.user.currentUser ? state.user.currentUser._id : null)
    const accessToken = useSelector((state) => state.user.currentUser ? state.user.currentUser.accessToken : null)

    console.log(userId)



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

    console.log(myCreatedJobs);

    return (

        <Container>

            <Left>

                <ShoppingBag><span >Menu</span><WorkIcon style={{ color: '#1d59ff' }} />

                </ShoppingBag>

                <CandidateBtn>
                    <PersonIcon style={{ marginRight: '12px' }} />
                    <span>Candidates</span>


                </CandidateBtn>

                <CandidateBtn>
                    <PersonIcon style={{ marginRight: '12px' }} />
                    <span>Vacancies</span>


                </CandidateBtn>
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

                            <Candidate key={job._id}>
                                <ProfileBox>
                                    <ProfilePic src={pic} />
                                    <Name>{job.userId}</Name>

                                </ProfileBox>

                                <CompanyFit score={job.matchScore}>

                                    <ThumbUpIcon style={{ marginRight: '4px', fontSize: '20px' }} />{job.matchScore}%</CompanyFit>

                                <Skills>{job.status}</Skills>

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




                        ))}







                    </Candidates>
                </Center>
            </Right>

        </Container>

    )
}

export default PostedJobs
