import styled from 'styled-components'
import myPic from '../assets/pic.jpg'
import google from '../assets/companies/logo_google.svg'
import twitter from '../assets/companies/logo_twitter.svg'
import SchoolIcon from '@mui/icons-material/School';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HomeIcon from '@mui/icons-material/Home';
import youtube from '../assets/companies/logo_youtube.svg'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

import profile from '../assets/profile.png'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import WorkspacesIcon from '@mui/icons-material/Workspaces';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { JobsContext } from '../Helpers/JobContext';

const Container = styled.div`

display: flex;
flex-direction: column;
@media (max-width: 768px) {
    padding: 0 10px;
}

`

const Wrapper = styled.div`
    
    display: flex;
    justify-content: center;
    height: 100vh;
width: 100vw;
@media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    width: 100%;
}
`

const Left = styled.div`

    height: 100%;
    width: 30%;
    background-color: rgb(0, 144, 248);
    color: white;
    
    border-radius: 20px;
    margin: 0 10px 0 10px ;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
        border-radius: 20px 20px 0 0;
    }
`


const ProfilePic = styled.img`
    margin-top: 20px;

    width: 120px;

    height: 120px;
    border-radius: 50%;
padding: 10px;
object-fit: cover;
`

const Username = styled.h3`
    margin-top: 19px;
    font-size: 20px;
`

const Details = styled.p`
    font-size: 13px;
    display: flex;
    align-items: center;
    margin: 10px 0;
    letter-spacing: 1px;

`

const Span = styled.span`
color: #e7e7e7;
margin-right: 4px;
`



const Right = styled.div`
       border-radius: 20px;
height: 100%;
width: 63%;
margin-right: 10px;
margin-left: 10px;
    padding: 10px;
    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
        border-radius: 0 0 20px 20px;
    }

`

const Top = styled.div`
    
height: auto;
width: 100%;
display: flex;
justify-content: center;

margin-bottom: 10px;
@media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
}
`

const TopTitle = styled.h5`
margin-top: 9px;
font-weight: bold;
font-size: 18px;
margin-left: 13px;
@media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
}
`

const WorkExperience = styled.div`

border-radius: 10px;
height: 200px;
width: 500px;
margin: 10px;
border: 1px solid #dbdbdb;

background-color: white;
@media (max-width: 768px) {
    width: 90%;
    margin: 10px 0;
}

`

const Experience = styled.div`
    display: flex;
   align-items: center;
    margin: 3px;
    margin-top: 12px;
    

`

const WorkLogo = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    

`

const WorkTitle = styled.p`
font-size: 15px;
font-weight: bold;
margin-bottom: 5px;

`
const Company = styled.p`
font-size: 13px;

margin-right: 20px;
`

const Tenure = styled.p`

font-size: 14px;
margin-top: 3px;
display: flex;
align-items: center;
gap: 4px;
`


const Education = styled.div`
border-radius: 10px;
height: 200px;
width: 500px;
margin: 10px;

border: 1px solid #dbdbdb;
@media (max-width: 768px) {
    width: 90%;
    margin: 10px 0;
}
`


//Center Component

const Center = styled.div`
    height: auto;
width: 100%;
display: flex;
  background-color: #fcfbfe;
  border-radius: 10px;


margin-bottom: 10px;
@media (max-width: 768px) {
    flex-direction: column;
}

`

const CenterLeft = styled.div`
    flex: 1;

`

const SkillsBox = styled.div`


`
const Skills = styled.div`
display: flex;
align-items: center;
margin-top: 9px;
flex-wrap: wrap;
`

const Skill = styled.div`
    padding: 6px 12px;
    border-radius: 3px;
    background-color: #e0e0e0;
    color: black;
    margin: 4px 4px;
    font-size: 11px;
`

const SocialProfile = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px;
    margin-bottom: 10px;

`

const CenterRight = styled.div`
    
    flex: 1;

`

const ResumeBox = styled.div`
padding: 20px 40px;
display: flex;
align-items: center;
gap: 10px;
font-size: 13px;
font-weight: bold;
@media (max-width: 768px) {
    padding: 10px 20px;
}
`

const Bottom = styled.div`
    

border-radius: 10px;

display: flex;
flex-direction: column;
height: 40%;

`

const AppliedBox = styled.div`
    margin: 5px;
    display: flex;
    padding: 10px 4px;
    border: none;
    border-radius: 13px;
    background-color: #fcfbfe;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }

`

const DateComponent = styled.div`
text-align: center;
    flex: 1;
    padding: 2px 5px;

    border-right: 1px solid grey;
    @media (max-width: 768px) {
        border-right: none;
        border-bottom: 1px solid grey;
        width: 100%;
    }
`
const Applied = styled.div`
    text-align: center;
    flex: 1;
    color: #0090f8;
    font-weight: bold;
    padding: 2px 5px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    @media (max-width: 768px) {
        border-left: none;
        border-right: none;
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        width: 100%;
    }
`
const JobApplied = styled.div`

    padding: 2px 9px;
    border-left: 1px solid grey;
    
    flex: 4;
    @media (max-width: 768px) {
        border-left: none;
        border-top: 1px solid grey;
        width: 100%;
    }
`


const Break = styled.div`
height: 1px;
width: 80%;
margin: 30px 0;
border: 1px solid #979797;
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




const UserProfile = () => {




    const baseUrl = import.meta.env.VITE_baseUrl

    const [AppliedJobs, setgetAppliedJob] = useState(null)

    const [userDetails, setuserDetails] = useState({})



    const location = useLocation();

    const id = location.pathname.split('/')[2]

    



    useEffect(() => {


        const getAppliedJobs = async () => {

            try {

                // eslint-disable-next-line no-undef
                const response = await axios.get(`${baseUrl}/applied/find/${id}`, {
                   
                })

                setgetAppliedJob(response.data)
                console.log(response.data)



            } catch (error) {
                console.log(error)
            }


        }

        getAppliedJobs();

    }, [id, baseUrl])


    useEffect(() => {


        const getUserDetails = async () => {

            const response = await axios.get(`${baseUrl}/auth/findUser/${id}`);

            setuserDetails(response.data)
            console.log(response.data)

        }

        getUserDetails();

    }, [id])



    return (



        <Container>
            <Wrapper>
                <Left>
                    <ProfilePic src={profile} />
                    <Username>{userDetails.username}</Username>

                    <Break></Break>

                    <Details><HomeIcon style={{ marginRight: '6px' }} /> {userDetails.address}</Details>
                    <Details>
                        <EmailIcon style={{ marginRight: '6px' }} />
                        <a
                            style={{ textDecoration: 'none', color: 'white' }}
                            href={`mailto:${userDetails.email}`}
                        >
                            {userDetails.email}
                        </a>
                    </Details>
                    <Details>
                        <CallOutlinedIcon style={{ marginRight: '4px', fontSize: '20px' }} />
                        <Span>Cell</Span>
                        <a
                            style={{ textDecoration: 'none', color: 'white' }}
                            href={`tel:${userDetails.phone}`}
                        >
                            {userDetails.phone}
                        </a>
                    </Details>


                    <Break></Break>

                    <Details><Span>Gender</Span>{userDetails.gender}</Details>
                    <Details><Span>ID: </Span>{userDetails._id}</Details>




                </Left>

                <Right>

                    <Top>


                        <WorkExperience>
                            <TopTitle>Work Experience</TopTitle>

                            {userDetails && userDetails.workExperience && userDetails.workExperience.map((work, index) => (
                                <Experience key={index}>
                                    <WorkLogo><WorkspacesIcon /></WorkLogo>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                        <WorkTitle>{work.jobTitle}</WorkTitle>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Company>{work.company}</Company>
                                            <Tenure>
                                                <span style={{ color: '#0090f8' }}>
                                                    <FiberManualRecordIcon style={{ fontSize: '14px' }} />
                                                </span>
                                                {work.tenure}
                                            </Tenure>
                                        </div>
                                    </div>
                                </Experience>
                            ))}




                        </WorkExperience>


                        <Education>

                            <TopTitle>Education</TopTitle>
                            {userDetails && userDetails.education && userDetails.education.map((education, index) => (

                                <Experience key={index}>

                                    <WorkLogo><SchoolIcon /></WorkLogo>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                                        <WorkTitle>{education.degree}</WorkTitle>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Company>
                                                {education.university.split(' ').slice(0, 2).join(' ')} <br />
                                                {education.university.split(' ').slice(2).join(' ')}
                                            </Company>
                                            <Tenure><span style={{ color: '#0090f8' }}><FiberManualRecordIcon style={{ fontSize: '14px' }} /></span>{education.batch}</Tenure>
                                        </div>


                                    </div>


                                </Experience>



                            ))}



                        </Education>
                    </Top>


                    <Center>

                        <CenterLeft>
                            <SkillsBox>
                                <TopTitle>Skills</TopTitle>
                                <Skills>
                                    {userDetails && userDetails.skills && userDetails.skills.map((skill, index) => (

                                        <Skill key={index}>{skill}</Skill>



                                    ))}
                                </Skills>
                            </SkillsBox>
                            <SkillsBox>
                                <TopTitle>Social Profiles</TopTitle>
                                <Skills>
                                    <SocialProfile>
                                        <LinkedInIcon style={{ marginRight: '5px' }} />
                                        <a
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            href={userDetails.linkedIn}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            LinkedIn
                                        </a>
                                    </SocialProfile>
                                    <SocialProfile>
                                        <GitHubIcon style={{ marginRight: '5px' }} />
                                        <a
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            href={userDetails.gitHub}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            GitHub
                                        </a>
                                    </SocialProfile>
                                </Skills>
                            </SkillsBox>

                        </CenterLeft>

                        <CenterRight>

                            <TopTitle>Resume</TopTitle>
                            <ResumeBox>
                                <PictureAsPdfIcon style={{ color: '#eb5757' }} />
                                <a style={{ textDecoration: 'none', color: 'black' }} href={userDetails.resume} target='_blank' rel='noopener noreferrer'>{userDetails.username}&apos;s CV</a>
                            </ResumeBox>

                        </CenterRight>

                    </Center>

                    <Bottom>

                        {AppliedJobs && AppliedJobs.length > 0 ? (
                            AppliedJobs.map((job) => {
                                const formattedDate = new Date(job.createdAt).toLocaleDateString();
                                return (
                                    <AppliedBox key={job._id}>

                                        <DateComponent>{formattedDate}</DateComponent>
                                        <Applied>{job.status.toUpperCase()}</Applied>
                                        <JobApplied><StyledLink style={{ textDecoration: 'none', color: 'black' }} to={`/apply/${job.jobId}`} >{job.title} @ {job.company}</StyledLink></JobApplied>
                                    </AppliedBox>
                                );
                            })
                        ) : (
                            <div>No jobs applied yet.</div>
                        )}



                    </Bottom>


                </Right>
            </Wrapper>
        </Container>


    )
}

export default UserProfile