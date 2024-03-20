import styled from 'styled-components';
import { jobSeekerReviews } from '../constants/index';
import dots from '../assets/reviews/dots.png'

const Container = styled.div`
  background-color: #ebeffa;
  overflow: hidden;
  /* Center the container horizontally */
`;

const Wrapper = styled.div`
  margin: 0 auto; 
  width: 100%;
  height: 80vh;
  max-width: 70%; /* Set max-width to 70% */
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  
  font-size: 50px;
`;

const Desc = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
`;

const Span = styled.span`
  color: #1d59ff;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardContainer = styled.div`
  background-color: rgb(250, 250, 250);
  position: relative;
  display: flex;
  flex-direction: column;
    width: 301px;
    height: 228px;
  justify-content: center;
  
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
  padding: 0 20px;
  height: 70px;
  width: 70px;
  
  border-radius: 50%;
 
  margin-top: 30px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

 
`;

const CardContent = styled.div`
  padding: 0 15px;
  margin-bottom: 50px;
`;

const CardTitle = styled.h3`
  font-size: 1 rem;
  margin: 10px 0;
`;

const Company = styled.div`

color: #616161a7;
font-size: 12px;
font-weight: bold;
margin: 10px 0;
`

const CardDescription = styled.p`
  font-size: 11px;
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
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <img src={dots}  alt="" />
                </div>

            </Wrapper>
        </Container>
    );
};

export default Reviews;
