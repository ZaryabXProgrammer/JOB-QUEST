import styled from 'styled-components'
import rightArrow from '../assets/benefits/rightArrow.png'
import leftArrow from '../assets/benefits/leftArrow.png'
import JobCard from './JobCard';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Link } from 'react-router-dom'

const Container = styled.div`
background-color: #ebeffa;
overflow: hidden;
  /* Center the container horizontally */
`;

const Wrapper = styled.div`
margin: 0 auto; 
width: 100%;
  height: 100vh;
max-width: 70%; /* Set max-width to 70% */
  display: flex;
  flex-direction: column;
  
`;

const Title = styled.h1`
text-align: center;
margin-top: 40px;
    font-size: 50px;
    
`

const Span = styled.span`
color: #1d59ff;
`

const Top = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
align-items: center;
height: 20vh;

`
const LeftButtons = styled.div`

display: flex;

`
const LeftBtn = styled.button`

color: black;
margin-right: 10px;
font-size: 13px;
height: 40px;
width: 120px;
padding: 10px 15px;
background-color: white;
border: 2px solid #1d59ff;
border-radius: 20px;
&:hover {
    cursor: pointer;
}

`
const RightButtons = styled.div`
display: flex;
background-color: transparent;


`
const Arrow = styled.img`

margin-left: 12px;
width: 60px;
height:60px;
border-radius: 50%;
padding: 10px;
background-color: transparent;
&:hover {
    cursor: pointer;
}
`


const Center = styled.div`
margin-bottom: 50px;
display: flex;
justify-content: space-around;
margin-right: 10px;
`

const Bottom = styled.div`

display: flex;
justify-content: center;
align-items: center;
`

const LowerButton = styled.button`
  color: white;
  margin-right: 12px;
  font-size: 13px;
  
  padding: 8px 15px;
  background-color: #1d59ff;
border: none;
  border-radius: 40px;
  display: flex; /* Use Flexbox */
  justify-content: space-between; /* Space between button content and icon */
  align-items: center; /* Center vertically */
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
text-decoration: none;
  color: white;
`

const LatestJobs = () => {

  return (


    <Container>

      <Wrapper>

        <Title>Latest Jobs <Span>Here</Span> </Title>

        <Top>
          <LeftButtons>
            <LeftBtn>Hot Jobs</LeftBtn>
            <LeftBtn>Popular Jobs</LeftBtn>
            <LeftBtn>Recent Jobs</LeftBtn>
          </LeftButtons>

          <RightButtons>
            <Arrow src={leftArrow} />
            <Arrow src={rightArrow} />


          </RightButtons>
        </Top>

        <Center>

          <JobCard />
          <JobCard />
          <JobCard />
        </Center>

        <Bottom>

          <LowerButton><StyledLink to='/jobs'>View all Jobs </StyledLink> <DoubleArrowIcon style={{ color: 'white' }} /></LowerButton>



        </Bottom>





      </Wrapper>

    </Container>
  )
}

export default LatestJobs
