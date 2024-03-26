import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import HomeBanner from "../assets/homeVect.png";

const ParentContainer = styled.div`
  background-position: center;
  height: 100vh; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
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
  font-size: 70px;
  text-align: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Desc = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Span = styled.span`
  color: #1d59ff;
  font-weight: bold;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 13px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-right: none;
  font-weight: bold;
  width: 200px;
  font-size: 16px;
  outline: none;
`;

const Button = styled.button`
  outline: none;
  padding: 11px;
  font-size: 20px;
  background-color: transparent;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    background-color: #2660ff;
    color: white;
  }
`;

const Button2 = styled.button`
  padding: 8px;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #ccc;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    background-color: #2660ff;
    color: white;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

const Slider = () => {
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
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  return (
    <ParentContainer>
      <Container>
        <InfoContainer>
          <Title>
            Find <Span>Remote</Span> <br /> Job in <Span>Worldwide</Span>{" "}
          </Title>
          <Desc>Find Perfect Job Now</Desc>
          <SearchBoxContainer>
            <SearchInput type="text" placeholder="Search..." />
            <Button>Find Now!</Button>
          </SearchBoxContainer>
          <Desc>OR SEARCH THROUGH YOUR <Span>RESUME</Span>! </Desc>
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
          {click && <Button2 onClick={handleClick}>Search Now</Button2> } 
        </InfoContainer>
        <ImgContainer>
          <Image src={HomeBanner} />
        </ImgContainer>
      </Container>
    </ParentContainer>
  );
};

export default Slider;
