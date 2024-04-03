import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import HomeBanner from "../assets/homeVect.png";
import { JobsContext } from '../Helpers/JobContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const ParentContainer = styled.div`
  position: relative;
  color: white;
  height: 96vh; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;

background: linear-gradient(90deg, rgba(26,41,189,1) 24%, rgba(0,0,0,1) 100%, rgba(9,9,133,1) 100%, rgba(0,212,255,1) 100%);/* Blue background color */


  @media (max-width: 768px) {
    
    height: 80vh;
    justify-content: flex-start;
    align-items: flex-start;
    
    
  }
`;

const WaveSVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  fill: #e7008a; /* Pink fill color */
`;

const Container = styled.div`
margin: 0 auto;
  max-width: 80%;
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    margin-top: 100px;
    
  }
`;

const ImgContainer = styled.div`
  height: 90%;
  flex: 1;
  background: contain;
  display: flex;
  align-items: center;
  @media (max-width: 768px) { 
    display: none;   
  }
`;

const Image = styled.img`

    height: 90%;
    width: 100%;

`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`

  font-size: 65px;
  text-align: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const Desc = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 15px;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin-top: 15px;
    font-size: 12px;
    text-align: center;
  }
`;

const Span = styled.span`
  color: white;
  font-weight: bold;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px; /* Rounded left corners */
  width: 200px;
  font-size: 16px;
  outline: none;
  @media (max-width: 480px) {
    padding: 13px;
    font-size: 12px;
  }
`;

const Button = styled.button`
  color: white;
  outline: none;
  padding: 11px;
  font-size: 20px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0; /* Rounded right corners */
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    background-color: white;
    color: black;
  }
    @media (max-width: 768px) { 
    padding: 8px;
    border: 0.5 solid white;
      font-size: 10px;
  }
`;

const Button2 = styled.button`
color: white;
  padding: 8px;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
     background-color: white;
    color: black;
  }
  
  @media (max-width: 768px) {
    margin-top: 5px;
    padding: 5px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 5px;
    padding: 3px;
    font-size: 15px;
  }
`;

const InputField = styled.input`
  width: 66%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;




const Slider = () => {

  const navigate = useNavigate();

  const [jobInput, setjobInput] = useState('')

  const { setnewJobs, setPage1JobsActive } = useContext(JobsContext);

  const [click, setClick] = useState(false);
  const [file, setFile] = useState(null);
  const Api_Url = "http://localhost:8080";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(`${Api_Url}/api/parse-resume`, formData);

      setnewJobs(response.data.matchingJobs);
      setPage1JobsActive(true);

      if (response.data.matchingJobs.length > 0) {
        navigate('/jobs')

      } else {
        toast.error('OOPS! No Jobs Found');
      }

      console.log(response.data.matchingJobs);
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  const handleJobSearch = async () => {
    try {
      const response = await axios.get(`${Api_Url}/jobs/search`, {
        params: { title: jobInput }
      });

      setnewJobs(response.data.jobs);
      setPage1JobsActive(true);
      navigate('/jobs')
      

    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('OOPS! No Jobs Found', {
        autoClose: 2500
      });
   
    }
  }



  return (
    <ParentContainer>
      <ToastContainer />
      <WaveSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="white" fillOpacity="1.5" d="M0,224L60,224C120,224,240,224,360,213.3C480,203,600,181,720,197.3C840,213,960,267,1080,240C1200,213,1320,107,1380,53.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </WaveSVG>
      <Container>
        <InfoContainer>
          <Title>
            Find <Span>Remote</Span> <br /> Job in <Span>Worldwide</Span>{" "}
          </Title>
          <Desc>Find Perfect Job Now</Desc>
          <SearchButtonContainer>
            <SearchInput
              type="text"
              placeholder="Search..."
              onChange={(e) => setjobInput(e.target.value)} />
            <Button onClick={handleJobSearch}>Find Now!</Button>
          </SearchButtonContainer>
          <Desc>OR SEARCH THROUGH YOUR <Span><u>RESUME </u></Span></Desc>
          {click ? (
            <InputField
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              placeholder="Attach Resume"
              onChange={handleFileChange}
            />
          ) : (
            <Button2 onClick={() => setClick(!click)}>Choose File!</Button2>
          )}
          {click && <Button2 onClick={handleClick}>Search Now</Button2>}
        </InfoContainer>
        <ImgContainer>
          <Image src={HomeBanner} />
        </ImgContainer>
      </Container>
    </ParentContainer>
  );
};

export default Slider;
