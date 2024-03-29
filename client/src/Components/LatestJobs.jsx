import styled from 'styled-components';
import rightArrow from '../assets/benefits/rightArrow.png';
import leftArrow from '../assets/benefits/leftArrow.png';
import JobCard from './JobCard';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import { Link } from 'react-router-dom'


const Container = styled.div`
  background: rgb(215, 219, 255);

  overflow: hidden;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 40px;
`;

const Span = styled.span`
  color: #1d59ff;
`;

const Top = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;

const LeftButtons = styled.div`
  display: flex;
`;

const LeftBtn = styled.button`
  color: black;
  margin-right: 10px;
  font-size: 12px;
  height: 30px;
  width: 100px;
  padding: 5px 10px;
  background-color: white;
  border: 2px solid #1d59ff;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const RightButtons = styled.div`
  display: flex;
`;

const Arrow = styled.img`
  margin-left: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 10px;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Center = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* Ensure cards wrap on smaller screens */
  @media (max-width: 480px) { /* Adjust styles for mobile */
    gap: 20px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LowerButton = styled.button`
  color: white;
  margin-right: 12px;
  font-size: 12px;
  padding: 5px 10px;
  background-color: #1d59ff;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

// const StyledLink = styled(Link)`
// text-decoration: none;
//   color: white;
// `

const LatestJobs = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Latest Jobs <Span>Here</Span></Title>
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
          <LowerButton>View all Jobs <DoubleArrowIcon style={{ color: 'white' }} /></LowerButton>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default LatestJobs;