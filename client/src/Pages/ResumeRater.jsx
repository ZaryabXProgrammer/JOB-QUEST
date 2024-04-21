import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import MyLoader from '../Utils/myLoader';

// Define keyframe animation for loader spin
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled components for different elements
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultsContainer = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const GradeText = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: bold;
`;

const RemarksText = styled.p`
  color: #555;
  font-size: 16px;
  margin-top: 10px;
`;

const TipsText = styled.p`
  color: #777;
  font-size: 14px;
  margin-top: 10px;
`;

// Loader styling
const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  backdrop-filter: blur(8px);
`;

const StyledLoader = styled(MyLoader)`
  animation: ${spinAnimation} 1s linear infinite;
`;

const ResumeRater = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [grade, setGrade] = useState(null);
    const [headlineValue, setHeadlineValue] = useState(null);
    const [remarksValue, setRemarksValue] = useState(null);
    const [tips, setTips] = useState(null);
    const [loading, setLoading] = useState(false);

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
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, 'text/xml');
                const gradeNode = xmlDoc.getElementsByTagName('grade')[0];
                const gradeValue = gradeNode.textContent;

                const headlineNode = xmlDoc.getElementsByTagName('grade_headline')[0];
                const headlineValue = headlineNode.textContent;

                const remarksNode = xmlDoc.getElementsByTagName('grade_blurb')[0];
                const remarksValue = remarksNode.textContent;

                const tipNode = xmlDoc.getElementsByTagName('tip')[0].getElementsByTagName('long')[0];
                const tipValue = tipNode.textContent;

                setGrade(gradeValue);
                setHeadlineValue(headlineValue);
                setRemarksValue(remarksValue);
                setTips(tipValue);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loader after API response
            });
    };

    return (
        <Wrapper>
            <InputContainer>
                <StyledInput type="file" accept=".pdf, .docx" onChange={handleFileChange} />
                <Button onClick={handleGradeResume}>Grade Resume</Button>
            </InputContainer>
            {loading ? (
                <LoaderContainer>
                    <StyledLoader color="#36D7B7" size={150} />
                </LoaderContainer>
            ) : (
                <ResultsContainer>
                    {grade && (
                        <>
                            <GradeText>Grade: {grade}</GradeText>
                            <h3>Headline</h3>
                            <p>{headlineValue}</p>
                            <RemarksText>Remarks: {remarksValue}</RemarksText>
                            <TipsText>Follow These Tips: {tips}</TipsText>
                        </>
                    )}
                </ResultsContainer>
            )}
        </Wrapper>
    );
};

export default ResumeRater;
