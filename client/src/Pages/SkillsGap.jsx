import styled from "styled-components"
import Lottie from 'lottie-react';
import jobOffer from '../assets/Lottie Icons/jobOffer.json'
import loadingScreen from '../assets/Lottie Icons/loadingScreen.json'
import { useContext, useState } from "react";
import MyLoader from '../Utils/myLoader';
import axios from "axios";
import { JobsContext } from "../Helpers/JobContext";

const Container = styled.div`
    
height: auto;
width: 100%;
display: flex;
flex-direction: column;


`

const Header = styled.h1`
color: #002d61dc;
font-size: 30px;
text-align: center;
margin-bottom: 20px;
font-weight: bold;
`

const Wrapper = styled.div`

display: flex;



`

const Left = styled.div`

flex: 1;

height: auto;
display: flex;

flex-direction: column;
align-items: center;
`

const LeftTitle = styled.h1`
margin-top: 20px;
text-align: center;
font-size: 25px;
font-weight: bold;
padding: 20px 40px;
width: 600px;
background-color: #2a63ff;
color: white;

`


const SocialIcon = styled(Lottie)`
  width: 410px;
  height: 410px;
  margin-top: 20px;
  border-radius: 50%;
  margin-right: 90px; /* Adjust space between icons */

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-right: 40px; /* Adjust space between icons */
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    margin-right: 40px; /* Adjust space between icons */
  }
`;



const SocialIcon2 = styled(Lottie)`
margin-left: 101px;
align-self: center;
  width: 300px;

  border-radius: 50%;
  margin-right: 90px; /* Adjust space between icons */

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-right: 40px; /* Adjust space between icons */
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    margin-right: 40px; /* Adjust space between icons */
  }
`;




const Right = styled.div`
    
flex: 1;

height: auto;
display: flex;
align-items: center;
flex-direction: column;
`

const InputContainer = styled.div`
  margin-bottom: 1px;
  margin-top: 14px;
  
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
`;


const ResultBox = styled.div`

height: 90%;
width: 70%;
color: black;
`
const MissingSkillText = styled.p`
  font-size: 19px;
  font-weight: 600;
  line-height: 2.5; /* Add line spacing */
`;
const getRandomColor = () => {
    const colors = ['#003366', '#006633', '#CC0000'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const ButtonContainer = styled.div`
height: auto;

display: flex;
align-items: center;
padding: 20px;
`

const SkillsGap = () => {

    const baseUrl = import.meta.env.VITE_baseUrl;

    const [missingSkills, setmissingSkills] = useState(null)

    const { jobDescription, jobDetails } = useContext(JobsContext)

    const [newJobDesc, setnewJobDesc] = useState(jobDescription)


    const [resumeFile, setResumeFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [loadingMissingSkills, setloadingMissingSkills] = useState(false)

    const [result, setResult] = useState({
        resumeText: null
    });
    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleGradeResume = () => {
        setLoading(true); // Start loader when button is clicked

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
                console.log(response.data);
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, 'text/xml');
                const txtLink = xmlDoc.getElementsByTagName('txtlink')[0].textContent;

                // Fetch the text content from the txtLink URL
                return fetch(txtLink);
            })
            .then(fetchResponse => {
                if (!fetchResponse.ok) {
                    throw new Error(`HTTP error! status: ${fetchResponse.status}`);
                }
                return fetchResponse.text();
            })
            .then(textContent => {
                console.log('Text content:', textContent);

                // Process the text content as needed and set it in the state
                const newTextContent = `${textContent}`


                setResult({
                    resumeText: newTextContent
                });
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loader after API response
                alert('Resume Uploaded')
            });

    };

    const handleGetSkillGap = async () => {

        setloadingMissingSkills(true)

        try {
            const response = await axios.post(`${baseUrl}/skillgap/analyzeSkillGaps`, {

                resume: result.resumeText,
                jobDescription: newJobDesc
            })
            console.log(response.data)


            const missingSkillsText = `${response.data.missingSkills}`; // Assuming response.data.missingSkills contains the missing skills and fields
            const formattedMissingSkills = missingSkillsText.replace(/(?:^|\n)([\w\s.-]+)(?=\n|$)/g, '\n• $1');
            setmissingSkills(formattedMissingSkills);
        } catch (error) {
            console.log(error)
        } finally {

            setloadingMissingSkills(false)
        }

    }





    return (
        <Container>

            <Header>Discovering Missing Competencies for: {jobDetails.jobTitle} @ {jobDetails.company}</Header>


            <Wrapper>

                <Left>
                    <LeftTitle>
                        Pinpoint Skill Gaps to Improve ATS Ranking and Fast-Track Your Hiring Process
                    </LeftTitle>
                    <SocialIcon
                        animationData={jobOffer}


                    />
                </Left>

                <Right>

                    {
                        loading ? <>
                            <MyLoader /> <span>Uploading Resume...</span>  </> : (

                            <>
                                <InputContainer>

                                    <StyledInput type="file" accept=".pdf, .docx" onChange={handleFileChange} />

                                </InputContainer>

                                <ButtonContainer>
                                    <Button disabled={!resumeFile} onClick={handleGradeResume}>Upload Resume</Button>
                                    <Button
                                        style={{ backgroundColor: '#fff', color: '#007bff', border: '1px solid #007bff' }}
                                        disabled={!resumeFile}
                                        onClick={handleGetSkillGap}>Extract</Button>


                                </ButtonContainer>


                                <ResultBox>

                                    {loadingMissingSkills ?
                                        (
                                            <SocialIcon2
                                                animationData={loadingScreen}
                                            />
                                        ) : (
                                            <MissingSkillText>
                                                {missingSkills?.split(' ').map((word, index) => (
                                                    <span key={index} style={{ color: getRandomColor() }}>
                                                        {word}{' '}
                                                    </span>
                                                ))}
                                            </MissingSkillText>)
                                    }



                                </ResultBox>



                            </>

                        )
                    }

                </Right>



            </Wrapper>



        </Container>
    )
}

export default SkillsGap
