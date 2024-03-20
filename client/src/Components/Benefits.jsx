import styled from 'styled-components'
import benefit from '../assets/categories/benefit.png';
import { companiesData } from '../constants/index'



const Container = styled.div`
background-color: #f2f5ff;
overflow: hidden;
  /* Center the container horizontally */
`;

const Wrapper = styled.div`
margin: 0 auto; 
width: 100%;
  height: 90vh;
max-width: 70%; /* Set max-width to 70% */
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ImgContainer = styled.div`
height: 80%;
    flex: 1;
`

const Image = styled.img`
height: 80%;

 
`
const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 50px;
    flex-direction: column;
`

const Title = styled.h1`
    font-size: 50px;
    
`
const Desc = styled.p`
    margin: 10px 0px;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 3px;

`
const Span = styled.span`
    color: #1d59ff;
`
const CompanyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allow wrapping of items */
 /* Add margin for spacing */
  max-width: 70%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const CompanyContainer = styled.div`
  margin: 0 30px;
  display: flex;

  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 4px;
`;

const CompanyTitle = styled.p`
  font-weight: 1000;
  font-size: 23px;
 
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



  )
}

export default Benefits
