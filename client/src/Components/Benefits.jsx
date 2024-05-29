import styled, { keyframes } from 'styled-components';
import benefit from '../assets/categories/benefit.png';
import { companiesData } from '../constants/index';

const Container = styled.div`
      background-color: #f9fafe;
  overflow: hidden;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 70vh; /* Change height to auto */
  max-width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
 /* Change flex-direction to column for responsiveness */

  @media screen and (max-width: 768px) {
     flex-direction: column;
     height: auto;
     
  }
`;

const ImgContainer = styled.div`
  height: auto; /* Change height to auto */
  flex: 1;
`;

const move = keyframes`
  from{
    transform: translateY(-15px);
  }
  to{
transform: translateY(0px) scale(1.03);

  }


`

const Image = styled.img`
  height: auto; /* Change height to auto */
  width: 75%;
  margin-top: 30px; /* Add width to occupy full width of the container */
  animation: ${move} 3s ease infinite alternate;
`;


const InfoContainer = styled.div`
  padding: 20px; /* Adjust padding for smaller devices */
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column; /* Change flex-direction to column for responsiveness */
  @media screen and (max-width: 768px) {
     margin-top: 40px;
     
  }
`;

const Title = styled.h1`
  font-size: 30px; /* Decrease font size for smaller devices */
  text-align: center; /* Center align text */
`;

const Desc = styled.p`
  margin: 10px 0px;
  font-size: 14px; /* Decrease font size for smaller devices */
  font-weight: 500;
  letter-spacing: 1px; /* Decrease letter spacing for smaller devices */
  text-align: center; /* Center align text */
   @media screen and (max-width: 768px) {
     font-size: 14px;
     margin: 2px 0;

   }
`;

const Span = styled.span`
  color: #1d59ff;
`;

const CompanyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 70%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const CompanyContainer = styled.div`
  margin: 10px; /* Adjust margin for smaller devices */
  display: flex;
  align-items: center;
 
  @media screen and (max-width: 414px){
   margin: 30px 10px;
   
  }
`;

const Logo = styled.img`
  width: 70px; /* Decrease width for smaller devices */
  height: 70px; /* Decrease height for smaller devices */
  margin-right: 10px;

  @media screen and (max-width: 414px){
    width: 40px;
    height: 40px;
   
  }
  
`;

const CompanyTitle = styled.p`
  font-weight: 700; /* Adjust font weight for smaller devices */
  font-size: 16px; /* Decrease font size for smaller devices */
`;

const Benefits = () => {
  return (
    <Container>
      <Wrapper>
        <InfoContainer>
          <Title>We Help You Connect With <br /><Span>The Organisation</Span> </Title>
          <Desc>Explore a diverse range of popular job categories tailored to match your skills and interests. Discover exciting opportunities in Software Development, Data Science, Digital Marketing, Graphic Design, Customer Support, Web Development, Finance, and Human Resources. <br /><br />We connect you with leading organizations and open doors to rewarding career paths. Find your perfect job and take the next step towards success</Desc>
        </InfoContainer>
        <ImgContainer>
          <Image src={benefit} />
        </ImgContainer>
      </Wrapper>
      <CompanyWrapper>
        {companiesData.map((company) => (
          <CompanyContainer key={company.id}>
            <Logo src={company.image} alt={company.title} />
            <CompanyTitle>{company.title}</CompanyTitle>
          </CompanyContainer>
        ))}
      </CompanyWrapper>
    </Container>
  );
};

export default Benefits;
