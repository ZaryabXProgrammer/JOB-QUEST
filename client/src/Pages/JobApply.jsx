import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Lottie from 'lottie-react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import styled, { keyframes, css } from 'styled-components';
import Uploading from '../assets/Lottie Icons/uploading.json'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { JobsContext } from '../Helpers/JobContext';
import CancelIcon from '@mui/icons-material/Cancel';

const Container = styled.div`
    min-height: 130vh;
    display: flex;
    align-items: center;

    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;

    height: 150vh;
`;

const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const CardContainer = styled.div`
    background-color: rgb(248, 248, 249);
    display: flex;
    flex-direction: column;
    width: 50vw; /* Adjust width as needed */
    height: 100%; /* Take full height */
    align-items: center;
    margin: 20px;
    overflow: hidden;
    animation: ${fadeInAnimation} 1.5s ease; /* Apply fade-in animation */
    @media screen and (max-width: 768px) {
    
        width: 100%;
         margin: 0px;
  
     
  }
`;

const ImageContainer = styled.div`
    padding: 10px;
    height: 85px;
    width: 85px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    margin-top: 40px; /* Adjust margin */
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%; /* Ensure circular shape */
`;

const CardContent = styled.div`
    padding: 20px;
    text-align: center; /* Center align content */
`;

const CardTitle = styled.h3`
    font-size: 50px; /* Decrease font size */
    margin: 5px 0;
`;

const CardDescription = styled.p`
    font-size: 20px; /* Decrease font size */
    margin: 30px 0;
`;
const Company = styled.h4`
    font-size: 30px; /* Decrease font size */
   
    font-weight: bold;
    color: #0536bd;;
`;
const Skills = styled.p`
    font-size: 15px; /* Decrease font size */
    margin: 5px 0;
    margin-top: 20px;
`;


const glowAnimation = keyframes`
  0%, 100% {
    background-color: white;
    color: #1d59ff;
  }
  50% {
    background-color: #1d59ff;
    color: white;
  }
`;
const Button2 = styled.button`
  padding: 6px;
  font-size: 14px;
  width: 30%;
  padding: 15px 3px; /* Add padding to the button */
  margin: 50px 10px 0 10px;
  border: 1px solid #1d59ff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  
  animation: ${glowAnimation} 0.7s ease-in-out 4; /* Apply glow animation 3 times */
  
  &:hover {
    background-color: #1d59ff;
    color: white;
  }
  
  &:disabled {
    transform: none; /* Ensure no scale transformation on hover when disabled */
    animation: none;
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #1d59ff;
    color: white;
  }
`;
const UploadBtn = styled.button`
  font-size: 10px;
  padding: 7px 12px;
  margin: 10px 10px 0 10px;
  border: 1px solid #000000;
  background-color: #e9e8e8;
  color: black;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  /* Hover effect only when button is not disabled */
  ${({ disabled }) => !disabled && css`
    &:hover {
      background-color: #1d59ff;
      color: white;
    }
  `}

  /* Styles for disabled state */
  &:disabled {
    cursor: not-allowed;
    animation: none;
    transition: none;
    background-color: #ccc;
    color: #ffffff;
  }
`;



const DisbButton = styled.button`
    padding: 6px;
  font-size: 14px;
 width: 30%;
  padding: 15px 3px; /* Add padding to the button */
  margin: 50px 10px 0 10px;
  border: 1px solid #1d59ff;;
  font-weight: bold;
  cursor: pointer;

  background-color:  #1d59ff;
  color: white;

     &:disabled {
        opacity: 0.7; /* Optionally reduce opacity for disabled button */
        cursor: not-allowed;
            background-color:  #1d59ff;
  color: white;
    }

`

const glow = keyframes`
  0% {
    box-shadow: 0 0 10px #1d59ff, 0 0 20px #1d59ff, 0 0 30px #1d59ff, 0 0 20px #1d59ff;
  }
  50% {
    box-shadow: 0 0 20px #1d59ff, 0 0 40px #1d59ff, 0 0 30px #1d59ff, 0 0 30px #1d59ff;
  }
  100% {
    box-shadow: 0 0 10px #1d59ff, 0 0 20px #1d59ff, 0 0 30px #1d59ff, 0 0 10px #1d59ff;
  }
`;

const glowsAnimation = keyframes`
  0%, 100% {
    background-color: white;
    color: #1d59ff;
  }
  50% {
    background-color: #1d59ff;
    color: white;
  }
`;

const SkillsGap = styled.button`

border: 1px solid #1d59ff ;
  padding: 20px 30px;
  margin-top: 30px;
  border-radius: 3px;
  outline: none;
 
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s ease, box-shadow 0.3s ease;
  animation: ${glowsAnimation} 0.7s ease-in-out 4;

  &:hover {
    transform: scale(1.05);
   background-color: #1d59ff;
    color: white;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add subtle shadow for a professional look */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none; /* Ensure no scale transformation on hover when disabled */
    animation: none; /* Stop the glow animation when disabled */
    background-color: #1d59ff; /* Set disabled background color */
    color: white; /* Set disabled text color */
  }
`;


const InputContainer = styled.div`
text-align: center;
  margin-bottom: 1px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
  margin: 13px;

  &:hover {
    box-shadow: 0 0 5px rgba(243, 243, 243, 0.1);
  }

  &:focus {
    border-color: #007bff;
  }

  &::file-selector-button {
    background-color: white;
    color: black;
    padding: 6px 12px;
    border: 1px solid #007bff;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

const SocialIcon = styled(Lottie)`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  margin: 0 auto;

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const ResumeBox = styled.div`
display: flex;
align-items: center;
border-radius: 10px;
background-color: #ececec;
width: 100px;
margin: 2px;
padding: 5px 11px;
width: max-content;
color: black;
`


const JobApply = () => {

    const { setjobDescription, setjobDetails, setresumeTextContent, resumeTextContent, setglobalResume, globalResume } = useContext(JobsContext)

    const [resumeFile, setResumeFile] = useState(null);

    const baseUrl = import.meta.env.VITE_baseUrl



    const Api_Url = "http://localhost:8080";
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const [job, setJob] = useState(null);


    const [hasApplied, setHasApplied] = useState(false);



    const [result, setResult] = useState({ resumeText: resumeTextContent });

    const [loading, setLoading] = useState(false);

    const [matchingScore, setmatchingScore] = useState(null)


    const userId = useSelector((state) => (state.user.currentUser ? state.user.currentUser._id : null))
    const username = useSelector((state) => (state.user.currentUser ? state.user.currentUser.username : null))


    const accessToken = useSelector((state) => (state.user.currentUser ? state.user.currentUser.accessToken : null));

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
        setglobalResume(e.target.files[0])
    };

    useEffect(() => {



        const getJob = async () => {
            try {
                const response = await axios.get(`${Api_Url}/jobs/job/${id}`, {
                    headers: {
                        token: accessToken
                    }
                });
                setJob(response.data);
                setLoading(false);



                try {
                    const res = await axios.get(`${Api_Url}/applied/find/${userId}/${id}`, {
                        headers: { token: accessToken }

                    });

                    if (res.data.status === 'applied') {
                        setHasApplied(true);
                    } else {
                        setHasApplied(false);
                    }
                } catch (error) {
                    console.error('Error checking applied status:', error);
                }


            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        getJob();

    }, [id, userId, accessToken]);



    // if (loading) {
    //     return <p>Loading...</p>; // Display a loading message while fetching data
    // }

    // if (!job) {
    //     return <p>No job data available</p>; // Handle case when job data is null or empty
    // }




    const handleApply = async () => {




        const jobDetailsString = `${job.skills.join(', ')} - ${job.description}`;
        try {
            const response = await axios.post(`${baseUrl}/jobMatching/match`, {
                resume: result.resumeText,
                jobDescription: jobDetailsString
            });

            const matchingScore = response.data.matchingPercentage; // Get matching score from API response

            const applyData = {
                userId: userId,
                jobId: id,
                creatorId: job.userId,
                candidateName: username,
                title: job.title,
                company: job.company,
                matchScore: matchingScore,
                // Use the matching score from the API response
            };

            await axios.post(`${Api_Url}/applied`, applyData, {
                headers: {
                    token: accessToken
                },
            });
            toast.success('Congratulations! Your Job Application Was Successful!');
            setHasApplied(true);



        } catch (error) {
            console.error(error);
            toast.error(`Failed .${toast.error(error.response.data.message)}`);
        }
    };



    //     const getMatchingScore = async () => {

    // try {
    //     const response = await axios
    // } catch (error) {

    // }

    //     } 

    const handleGradeResume = () => {
        setLoading(true);

        const apiHash = 'your_api_hash_here';
        const apiUrl = `http://rezscore.com/a/${apiHash}/grade`;

        const formData = new FormData();
        formData.append('resume', resumeFile);

        axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {


                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, 'text/xml');
                const txtLink = xmlDoc.getElementsByTagName('txtlink')[0].textContent;


                return fetch(txtLink);
            })
            .then(fetchResponse => {
                if (!fetchResponse.ok) {
                    throw new Error(`HTTP error! status: ${fetchResponse.status}`);
                }
                return fetchResponse.text();
            })
            .then(textContent => {
                // console.log('Text content:', textContent);

                setResult({ resumeText: textContent });

                setresumeTextContent({ resumeText: textContent });

            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
                toast("Resume Uploaded Successfully");
            });
    };




    const handleSkillGapClick = () => {
        navigate('/skillsGap');
        const jobDetailsString = `${job.skills.join(', ')} - ${job.description}`;
        setjobDescription(jobDetailsString);


        setjobDetails({
            company: job.company,
            jobTitle: job.title
        })
    };

    const getRoadmap = () => {
        navigate('/roadMap');
        const jobDetailsString = `${job.skills.join(', ')} - ${job.description}`;
        setjobDescription(jobDetailsString);


        setjobDetails({
            company: job.company,
            jobTitle: job.title
        })
    };

    const generateCoverLetter = () => {
        
        const jobDetailsString = `${job.skills.join(', ')} - ${job.description}`;
        setjobDescription(jobDetailsString);
        navigate('/coverletter');
        setjobDetails({
            company: job.company,
            jobTitle: job.title
        })

    }

    const ResetResume = () => {
        setglobalResume(null);
        setresumeTextContent(null);

    }

    return (
        <Container>
            {loading ? (
                <>
                    <SocialIcon animationData={Uploading} />
                    <span>We&apos;re extracting info from your resume, almost there!</span>
                </>
            ) : (
                <>
                    <ToastContainer />
                    <Wrapper>
                        <CardContainer>
                            <ImageContainer>
                                {job?.jobLogo ? (
                                    <CardImage src={job.jobLogo} alt={job.title} />
                                ) : (
                                    <div>No Logo Available</div>
                                )}
                            </ImageContainer>
                            <CardContent>
                                <CardTitle>{job?.title}</CardTitle>
                                <Company>{job?.company}</Company>
                                <CardDescription>{`$${job?.salary}/m`}</CardDescription>
                                <Skills>
                                    <b>Skills Required </b>
                                    <br />
                                    {job?.skills.map(skill => skill).join(',')}
                                </Skills>
                            </CardContent>

                            {resumeTextContent ? (
                                <ResumeBox>
                                    <PictureAsPdfIcon style={{ color: 'red', marginRight: '5px' }} />
                                    <span style={{ fontSize: '11px' }}>{globalResume?.name}</span>
                                    <span style={{ marginLeft: '5px', cursor: 'pointer' }}>
                                        <CancelIcon onClick={ResetResume} style={{ fontSize: '18px' }} />
                                    </span>
                                </ResumeBox>
                            ) : (
                                !hasApplied && (
                                    <InputContainer>
                                        <label htmlFor="file">Select Resume: </label>
                                        <StyledInput type="file" accept=".pdf, .docx" onChange={handleFileChange} />



                                    </InputContainer>

                                )
                            )}

                            {!hasApplied && (<UploadBtn onClick={handleGradeResume} disabled={!resumeFile}>Upload</UploadBtn>)}





                            {hasApplied ? (
                                <DisbButton disabled>Applied</DisbButton>
                            ) : (
                                <Button2 onClick={handleApply} disabled={!resumeTextContent}>
                                    Apply
                                </Button2>
                            )}

                            <SkillsGap disabled={!resumeTextContent} onClick={handleSkillGapClick}>
                                Identify Skills Gap Now
                            </SkillsGap>

                            <SkillsGap onClick={getRoadmap}>
                                Generate a 3-Week Learning Roadmap
                            </SkillsGap>

                            <SkillsGap onClick={generateCoverLetter} disabled={!resumeTextContent}>
                                Generate Cover Letter
                            </SkillsGap>

                        </CardContainer>
                    </Wrapper>
                </>
            )}
        </Container>


    );
}

export default JobApply;
