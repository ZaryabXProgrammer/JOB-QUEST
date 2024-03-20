import styled from 'styled-components'
import 

const Container = styled.div`
background-color: #f2f5ff;
overflow: hidden;
  /* Center the container horizontally */
`;

const Wrapper = styled.div`
margin: 0 auto; 
width: 100%;
  height: 100vh;
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
    margin: 30px 0px;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 3px;

`
const Span = styled.span`
    color: #1d59ff;
`

const NewsLetter = () => {
  return (
    
      <Container>
          
          <Wrapper>
              

              <InfoContainer>
                  <Title>SUBSCRIBE NEWSLETTER</Title>

              </InfoContainer>

              <ImgContainer>
              <Image/>
              </ImgContainer>
</Wrapper>

      </Container>
      
      
  )
}

export default NewsLetter
