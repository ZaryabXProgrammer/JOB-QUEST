import styled from 'styled-components'
import myPic from '../assets/pic.jpg'
import google from '../assets/companies/logo_google.svg'
import twitter from '../assets/companies/logo_twitter.svg'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import youtube from '../assets/companies/logo_youtube.svg'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';


import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`

display: flex;
flex-direction: column;

`

const Wrapper = styled.div`
    
    display: flex;
    justify-content: center;
    height: 100vh;
width: 100vw;
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

`


const ProfilePic = styled.img`
    margin-top: 20px;

    width: 150px;
    border: 5px solid white;
    height: 150px;
    border-radius: 50%;

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
    


`

const Top = styled.div`
    
height: auto;
width: 100%;
display: flex;
justify-content: center;

margin-bottom: 10px;

`

const TopTitle = styled.h5`
margin-top: 9px;
font-weight: bold;
font-size: 18px;
margin-left: 13px;
`

const WorkExperience = styled.div`

border-radius: 10px;
height: 200px;
width: 500px;
margin: 10px;
border: 1px solid #dbdbdb;

background-color: white;


`

const Experience = styled.div`
    display: flex;
   align-items: center;
    margin: 3px;
    margin-top: 12px;

`

const WorkLogo = styled.img`
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
`


//Center Component

const Center = styled.div`
    height: auto;
width: 100%;
display: flex;
  background-color: #fcfbfe;
  border-radius: 10px;


margin-bottom: 10px;

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
font-size: 14px;
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

`

const DateComponent = styled.div`
text-align: center;
    flex: 1;
    padding: 2px 5px;

    border-right: 1px solid grey;
`
const Applied = styled.div`
    text-align: center;
    flex: 1;
    color: #0090f8;
    font-weight: bold;
    padding: 2px 5px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
`
const JobApplied = styled.div`

    padding: 2px 9px;
    border-left: 1px solid grey;
    
    flex: 4;
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


    const userId = useSelector((state) => (state.user.currentUser ? state.user.currentUser._id : null))
    const accessToken = useSelector((state) => (state.user.currentUser ? state.user.currentUser.accessToken : null))

    const baseUrl = import.meta.env.VITE_baseUrl

    const [AppliedJobs, setgetAppliedJob] = useState(null)

    useEffect(() => {


        const getAppliedJobs = async () => {

            try {

                // eslint-disable-next-line no-undef
                const response = await axios.get(`${baseUrl}/applied/find/${userId}`, {
                    headers: {
                        token: accessToken
                    }
                })

                setgetAppliedJob(response.data)
                console.log(response.data)



            } catch (error) {
                console.log(error)
            }


        }

        getAppliedJobs();

    }, [userId])


    return (



        <Container>
            <Wrapper>
                <Left>
                    <ProfilePic src={myPic} />
                    <Username>Zaryab Haider</Username>

                    <Break></Break>

                    <Details>123 - Main Street Karachi</Details>
                    <Details>zaryab@gmail.com</Details>
                    <Details><CallOutlinedIcon style={{ marginRight: '4px', fontSize: '20px' }} /><Span>Cell</Span>+92 (325) 7623272</Details>
                    <Details><Span>Home</Span>021 (36969696)</Details>

                    <Break></Break>

                    <Details><Span>Gender</Span>Male</Details>
                    <Details><Span>ID: </Span>232343434</Details>
                    <Details>+92 (325) 7623272</Details>
                    <Details>021 (36969696)</Details>


                </Left>

                <Right>

                    <Top>


                        <WorkExperience>
                            <TopTitle>Work Experience</TopTitle>

                            <Experience>
                                <WorkLogo src={google}></WorkLogo>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <WorkTitle>Software Enginner</WorkTitle>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Company>Google</Company>
                                        <Tenure><span style={{ color: '#0090f8' }}><FiberManualRecordIcon style={{ fontSize: '14px' }} /></span>May 2023 - July 2023</Tenure>
                                    </div>


                                </div>


                            </Experience>
                            <Experience>
                                <WorkLogo src={twitter}></WorkLogo>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <WorkTitle>MERN Stack Developer</WorkTitle>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Company>Google</Company>
                                        <Tenure><span style={{ color: '#0090f8' }}><FiberManualRecordIcon style={{ fontSize: '14px' }} /></span>May 2023 - July 2023</Tenure>
                                    </div>


                                </div>


                            </Experience>


                        </WorkExperience>
                        <Education>

                            <TopTitle>Education</TopTitle>

                            <Experience>
                                <WorkLogo src={youtube}></WorkLogo>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <WorkTitle>Bachelors of Science in Computer Science</WorkTitle>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Company>University of California</Company>
                                        <Tenure><span style={{ color: '#0090f8' }}><FiberManualRecordIcon style={{ fontSize: '14px' }} /></span>May 2023 - July 2023</Tenure>
                                    </div>


                                </div>


                            </Experience>


                        </Education>
                    </Top>


                    <Center>

                        <CenterLeft>
                            <SkillsBox>
                                <TopTitle>Skills</TopTitle>
                                <Skills>
                                    <Skill>ReactJs</Skill>
                                    <Skill>NodeJs</Skill>
                                    <Skill>MySQL</Skill>
                                    <Skill>Postman</Skill>
                                    <Skill>NodeJs</Skill>

                                </Skills>
                            </SkillsBox>
                            <SkillsBox>
                                <TopTitle>Social Profile</TopTitle>
                                <Skills>
                                    <SocialProfile><LinkedInIcon style={{ marginRight: '5px' }} />linkedin.com/zaryab</SocialProfile>
                                    <SocialProfile><GitHubIcon style={{ marginRight: '5px' }} />linkedin.com/zaryab</SocialProfile>


                                </Skills>
                            </SkillsBox>

                        </CenterLeft>

                        <CenterRight>

                            <TopTitle>Resume</TopTitle>
                            <ResumeBox>
                                <PictureAsPdfIcon style={{ color: '#eb5757' }} />  ZaryabHaider.pdf
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
                                        <JobApplied><StyledLink style={{textDecoration: 'none', color: 'black'}} to={`/apply/${job.jobId}`} >{job.title} @ {job.company}</StyledLink></JobApplied>
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
