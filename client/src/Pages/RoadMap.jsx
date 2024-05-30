import styled from 'styled-components';
import Lottie from 'lottie-react';
import roadmap from '../assets/Lottie Icons/roadmap.json';

import map from '../assets/Lottie Icons/map.json';
import { useContext, useEffect, useState } from 'react';
import { JobsContext } from '../Helpers/JobContext';
import axios from 'axios';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Left = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const LeftTitle = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 20px 40px;
  width: 600px;
  background-color: #2a63ff;
  color: white;
`;

const SocialIcon = styled(Lottie)`
  width: 650px;

 
 
/* Adjust space between icons */
  margin-left: 10px;

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
  margin-left: 80px;
  align-self: center;
  width: 400px;
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

  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
`;

const ResultBox = styled.div`
  height: 90%;
  width: 70%;
  color: black;
`;

const MissingSkillText = styled.p`
  font-size: 19px;
  font-weight: 600;
  line-height: 2.5; /* Add line spacing */
  border-radius: 16px;
  background-color: #fafffc;
  padding: 20px;
  margin-top: 14px;
`;

const GenText = styled.p`
text-align: center;
flex: 19px;
font: italic;
`

const getRandomColor = () => {
    const colors = ['#2C3E50', '#34495E', '#1ABC9C', '#27AE60', '#2980B9'];
    return colors[Math.floor(Math.random() * colors.length)];
};


const RoadMap = () => {
    const baseUrl = import.meta.env.VITE_baseUrl;
    const { jobDescription, jobDetails } = useContext(JobsContext);

    const [roadmapData, setRoadmapData] = useState(null);
    const [loadingRoadmap, setLoadingRoadmap] = useState(false);

    useEffect(() => {
        const handleGetRoadmap = async () => {
            setLoadingRoadmap(true);

            try {
                const response = await axios.post(`${baseUrl}/roadMap/generateLearningRoadmap`, {
                    currentSkills: jobDescription,
                    role: jobDetails.jobTitle,
                });
                console.log(response.data.roadmap);

                const formattedRoadmap = response.data.roadmap.replace(/week/g, 'week\n\n');
                setRoadmapData(formattedRoadmap);

            } catch (error) {
                console.log(error);
            } finally {
                setLoadingRoadmap(false);
            }
        };

        handleGetRoadmap();
    }, [baseUrl, jobDescription, jobDetails]);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <LeftTitle>Generate a 3-Week Learning Roadmap</LeftTitle>
                    <SocialIcon animationData={map} />
                </Left>
                <Right>
                    <ResultBox>
                        {loadingRoadmap ? (
                            <>
                                <SocialIcon2 animationData={roadmap} />
                                <GenText><i>Generating Roadmap...</i></GenText>
                            </>
                        ) : (
                            <MissingSkillText>
                                {roadmapData?.split(' ').map((word, index) => (
                                    <span key={index} style={{ color: getRandomColor() }}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </MissingSkillText>
                        )}
                    </ResultBox>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default RoadMap;
