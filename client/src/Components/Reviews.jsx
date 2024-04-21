import styled from 'styled-components';
import { jobSeekerReviews } from '../constants/index';
import dots from '../assets/reviews/dots.png';

const Container = styled.div`
      background-color: #f3f6ff;
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
margin-top: 20px;
  text-align: center;
  font-size: 40px; /* Decrease font size for smaller devices */
`;

const Desc = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px; /* Decrease font size for smaller devices */
`;

const Span = styled.span`
  color: #1d59ff;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px; /* Add margin for better spacing */
`;

const CardContainer = styled.div`
  background-color: rgb(250, 250, 250);
  position: relative;
  display: flex;
  flex-direction: column;
  width: 280px; /* Adjust width for smaller devices */
  height: auto; /* Set height to auto */
  margin: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.32s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background-color: #f4f7ff;
    color: black;
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  max-width: 100%; /* Set max-width to prevent overflow */
  max-height: 100%; /* Set max-height to prevent overflow */
  object-fit: cover;
  border-radius: 50%;
`;

const CardContent = styled.div`
  padding: 0 15px;
  margin-bottom: 20px; /* Decrease margin for smaller devices */
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 10px 0;
`;

const Company = styled.div`
  color: #616161a7;
  font-size: 12px;
  font-weight: bold;
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 12px; /* Increase font size for better readability */
`;

const Reviews = () => {
  return (
    <Container>
      <Wrapper>
        <Title>What Says Job Seekers <Span>About Us </Span></Title>
        <Desc>Here are some reviews from job seekers:</Desc>
        <CardList>
          {jobSeekerReviews.map((review) => (
            <CardContainer key={review.id}>
              <ImageContainer>
                <CardImage src={review.image} alt={review.personaName} />
              </ImageContainer>
              <CardContent>
                <CardTitle>{review.personaName}</CardTitle>
                <Company>{review.company}</Company>
                <CardDescription>{review.review}</CardDescription>
              </CardContent>
            </CardContainer>
          ))}
        </CardList>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img src={dots} alt="" />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Reviews;
