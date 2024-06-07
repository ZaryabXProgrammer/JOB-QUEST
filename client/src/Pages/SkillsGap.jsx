import styled from "styled-components"
import Lottie from 'lottie-react';
import jobOffer from '../assets/Lottie Icons/jobOffer.json'
import loadingScreen from '../assets/Lottie Icons/loadingScreen.json'
import { useContext, useState } from "react";
import MyLoader from '../Utils/myLoader';
import axios from "axios";
import { JobsContext } from "../Helpers/JobContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  color: #002d61dc;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Wrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LeftTitle = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 20px 40px;
  width: 100%;
  max-width: 600px;
  background-color: #2a63ff;
  color: white;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 15px 30px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

const SocialIcon = styled(Lottie)`
  width: 410px;
  height: 410px;
  margin-top: 20px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const SocialIcon2 = styled(Lottie)`
  margin-left: 101px;
  align-self: center;
  width: 300px;
  border-radius: 50%;
  margin-right: 90px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    width: 190px;
    height: 190px;
    margin: 0 auto;
  }
`;

const Right = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 1px;
  margin-top: 14px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;

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

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const ResultBox = styled.div`
  height: 90%;
  width: 70%;
  color: black;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MissingSkillText = styled.p`
  font-size: 19px;
  font-weight: 600;
  line-height: 2.5;
  padding: 20px;
  border-radius: 20px;
  background-color: #f5faff;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
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

  @media (max-width: 768px) {
    // flex-direction: column;
    padding: 10px;
  }
`;

const SkillsGap = () => {
  
  const baseUrl = import.meta.env.VITE_baseUrl;

  const [missingSkills, setmissingSkills] = useState(null);

  const { jobDescription, jobDetails } = useContext(JobsContext);

  const [newJobDesc, setnewJobDesc] = useState(jobDescription);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMissingSkills, setloadingMissingSkills] = useState(false);
  const [result, setResult] = useState({ resumeText: null });

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

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
        console.log(response.data);
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
        console.log('Text content:', textContent);

        setResult({ resumeText: textContent });
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
        toast("Resume Uploaded Successfully");
      });
  };

  const handleGetSkillGap = async () => {
    setloadingMissingSkills(true);

    try {
      const response = await axios.post(`${baseUrl}/skillgap/analyzeSkillGaps`, {
        resume: result.resumeText,
        jobDescription: newJobDesc
      });
    
      const missingSkillsText = `${response.data.missingSkills}`;
      const formattedMissingSkills = missingSkillsText.replace(/(?:^|\n)([\w\s.-]+)(?=\n|$)/g, '\n• $1');
      setmissingSkills(formattedMissingSkills);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingMissingSkills(false);
    }
  };

  return (
    <Container>
      <ToastContainer />

      <Header>Discovering Missing Competencies for: {jobDetails.jobTitle} @ {jobDetails.company}</Header>

      <Wrapper>
        <Left>
          <LeftTitle>
            Pinpoint Skill Gaps to Improve ATS Ranking and Fast-Track Your Hiring Process
          </LeftTitle>
          <SocialIcon animationData={jobOffer} />
        </Left>

        <Right>
          {loading ? (
            <>
              <MyLoader /> <span>Uploading Resume...</span>
            </>
          ) : (
            <>
              <InputContainer>
                <StyledInput type="file" accept=".pdf, .docx" onChange={handleFileChange} />
              </InputContainer>

              <ButtonContainer>
                <Button disabled={!resumeFile} onClick={handleGradeResume}>Upload Resume</Button>
                <Button
                  style={{ backgroundColor: '#fff', color: '#007bff', border: '1px solid #007bff' }}
                  disabled={!resumeFile}
                  onClick={handleGetSkillGap}
                >
                  Extract
                </Button>
              </ButtonContainer>

              <ResultBox>
                {loadingMissingSkills ? (
                  <SocialIcon2 animationData={loadingScreen} />
                ) : (
                  missingSkills && (
                    <MissingSkillText>
                      {missingSkills.split(' ').map((word, index) => (
                        <span key={index} style={{ color: getRandomColor() }}>
                          {word}{' '}
                        </span>
                      ))}
                    </MissingSkillText>
                  )
                )}
              </ResultBox>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default SkillsGap;
