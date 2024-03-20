import styled from 'styled-components'
import { popularJobCategoriesData } from '../constants/index'


const Container = styled.div`
    
height: 80vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #bcceff;
flex-direction: column;


`
const Wrapper = styled.div`
    width: 80%;

`

const Title = styled.h2`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`
const Span = styled.span`
  color: #1d59ff;
`

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
  width: 220px;
  height: 220px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.32s ease;;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    
    background-color: #3b70ff ;
    color: white;
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
padding: 20px;
height: 70px;
width: 70px;
justify-content: center;
align-items: center;
border-radius: 50%;
background-color: white;
margin-top: 50px;

`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px 8px 0 0;
`;

const CardContent = styled.div`
  padding: 15px;
  margin-bottom: 50px;
`;

const CardTitle = styled.h3`
  font-size: 1 rem;
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 15px;
`;




const JobCategories = () => {

    return (
 
        <div>

            <Container>
                <Title>
                    Popular Job <Span>Categories</Span>
                </Title>
                <Wrapper>
                    <CardList>
                        {popularJobCategoriesData.map((card) => (
                            <CardContainer key={card.id}>
                                <ImageContainer>
                                    <CardImage src={card.image} alt={card.title} />
                                </ImageContainer>

                                <CardContent>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardDescription>{`Vacancies: ${card.vacancies}`}</CardDescription>
                                    {/* <CardDescription>{`Job Title: ${card.jobTitle}`}</CardDescription> */}
                                </CardContent>
                            </CardContainer>
                        ))}
                    </CardList>
                </Wrapper>
            </Container>

        </div>

    )
}

export default JobCategories
