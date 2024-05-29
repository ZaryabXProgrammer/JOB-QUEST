import { useEffect, useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import MyLoader from '../Utils/myLoader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';




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

height: 100vh;
background-color: #fcfcff;

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
  &:disabled{
    cursor: not-allowed;
  }
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Left = styled.div`

flex: 1;
height: 100vw;
font-size: 15px;


`

const Right = styled.div`
  flex: 1;
  height: 100vh;
  padding: 10px;
  


`

const GradeText = styled.h2`
  color: #333;
font-size: 400px;
  font-weight: bold;

color: ${({ grade }) => {
    switch (grade) {
      case 'A':
        return 'green';
      case 'B':
        return "Blue"
      case 'B+':
        return "darkgreen"
      case 'C':
        return "darkred"
      case 'F':
        return "red"
      default:
        return 'darkblue'
    }
  }};

`;

const RemarksText = styled.p`
  color: #555;
  font-size: 21px;
  margin-top: 40px;
`;

const TipsText = styled.p`
  color: #777;
  font-size: 19px;
  margin-top: 30px;
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

const Headline = styled.div`
  
  background-color: #007bff;
  padding: 20px 30px;
  color: white;
  font-size: 30px;
`

const StyledLoader = styled(MyLoader)`
  animation: ${spinAnimation} 1s linear infinite;
`;

const StatsBox = styled.div`
  height: auto;
  width: 100%;
  background-color: #eeeeee;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
  margin: 20px 0;
`;

const Stat = styled.div`
  color: black;
  padding: 7px 20px;
  margin: 0 8px;
  font-size: 19px;
  width: auto;
  display: flex;
  align-items: center;
  font-weight: bold;

  & > span {
    margin-left: 5px;
    font-weight: bold;
  }
`;

const HeroContainer = styled.div`
  width: 100vw;
  height: 40vw;
  display: flex;
  justify-content: center; /* Center horizontally */

  font-size:6.2em;
  overflow: hidden;
  margin-top: 20px;
  font-weight: bold;
 
`;

const HeroText = styled.p`
  white-space: nowrap; /* Prevents text from wrapping to the next line */
  background: linear-gradient(to bottom, #007bff , #63aeff );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
`;

const GlobalStyle = createGlobalStyle`
  .fade-enter {
    opacity: 0;
    transform: translateY(100%);
  }

  .fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1s, transform 1s;
  }

  .fade-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-exit-active {
    opacity: 0;
    transform: translateY(-100%);
    transition: opacity 1s, transform 1s;
  }
`;

const messages = ["Get Insights On Your Resume", "Powerful Resume Scanner", "More Accurate Results", "Get Your Percentile Result"];


const ResumeRater = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState({
    grade: null,
    headline: null,
    remarks: null,
    tips: null,
    percentile: null,
    wordcount: null,
    impact_score: null,
    brevity_score: null
  });
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
        console.log(response.data)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        const gradeNode = xmlDoc.getElementsByTagName('grade')[0];
        const gradeValue = gradeNode.textContent;

        const headlineNode = xmlDoc.getElementsByTagName('grade_headline')[0];
        const headlineValue = headlineNode.textContent;

        const percentile = xmlDoc.getElementsByTagName('percentile')[0].textContent;

        const wordcount = xmlDoc.getElementsByTagName('wordcount')[0].textContent;
        const impact_score = xmlDoc.getElementsByTagName('impact_score')[0].textContent;
        const brevity_score = xmlDoc.getElementsByTagName('brevity_score')[0].textContent;




        const remarksNode = xmlDoc.getElementsByTagName('grade_blurb')[0];
        const remarksValue = remarksNode.textContent;

        const tipNode = xmlDoc.getElementsByTagName('tip')[0].getElementsByTagName('long')[0];
        const tipValue = tipNode.textContent;

        setResult({
          grade: gradeValue,
          headline: headlineValue,
          remarks: remarksValue,
          tips: tipValue,
          percentile,
          wordcount,
          impact_score,
          brevity_score
        });
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

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

          <InputContainer>
            <StyledInput type="file" accept=".pdf, .docx" onChange={handleFileChange} />
            <Button disabled={!resumeFile} onClick={handleGradeResume}>Grade Resume</Button>


          </InputContainer>

          {!result.grade && !loading && (
            <HeroContainer>
              <GlobalStyle />
              <TransitionGroup>
                <CSSTransition
                  key={index}
                  timeout={1000}
                  classNames="fade"
                >
                  <HeroText>{messages[index]}</HeroText>
                </CSSTransition>
              </TransitionGroup>
            </HeroContainer>
          )}
        </div>



        {loading ? (
          <LoaderContainer>
            <StyledLoader color="#36D7B7" size={150} />
          </LoaderContainer>
        ) : (
          result.grade && (
            <ResultsContainer>
              <Left>
                <GradeText grade={result.grade}>{result.grade}</GradeText>
              </Left>
              <Right>
                <Headline>Result</Headline>



                <p style={{ fontSize: '30px', marginTop: '14px' }}>{result.headline}</p>
                <h3 style={{ fontSize: '60px', color: '#36D7B7', marginTop: '11px' }} >{result.percentile}%</h3>
                <RemarksText>Remarks: {result.remarks}</RemarksText>

                <StatsBox>
                  <Stat>Total Word Count: <span>{result.wordcount}</span></Stat>
                  <Stat>Impact Score: <span>{result.impact_score}</span></Stat>
                  <Stat>Brevity Score: <span>{result.brevity_score}</span></Stat>
                </StatsBox>

                <TipsText><i><b>Follow These Tips: </b>{result.tips}</i></TipsText>


              </Right>
            </ResultsContainer>
          )
        )}
      </Wrapper>
 
  );
};

export default ResumeRater;
