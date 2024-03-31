import styled from 'styled-components'
import { popularJobCategoriesData } from '../constants/index'

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
 /* background-color: #eaf0ff; */
    flex-direction: column;
`;

const Wrapper = styled.div`
    width: 90%;
`;

const Title = styled.h2`
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    @media (max-width: 480px) {
        font-size: 30px;
    }
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
    background-color: rgb(248, 248, 248);
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(50% - 20px); /* Two cards per row on mobile */
    max-width: 160px; /* Limit maximum width */
    height: 200px; /* Adjust height for mobile */
    justify-content: center;
    align-items: center;
    margin: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, background-color 0.32s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        background-color: #3b70ff;
        color: white;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: calc(50% - 20px); /* Two cards per row on tablet devices */
    }

    @media (min-width: 768px) {
        width: calc(33.33% - 20px); /* Three cards per row on desktop */
        max-width: 200px; /* Adjust maximum width for desktop */
        height: 220px; /* Adjust height for desktop */
    }
`;

const ImageContainer = styled.div`
    padding: 10px;
    height: 60px; /* Adjust height for smaller image */
    width: 60px; /* Adjust width for smaller image */
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: white;
    margin-top: 10px; /* Adjust margin */
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%; /* Ensure circular shape */
`;

const CardContent = styled.div`
    padding: 10px;
    text-align: center; /* Center align content */
`;

const CardTitle = styled.h3`
    font-size: 14px; /* Decrease font size */
    margin: 5px 0;
`;

const CardDescription = styled.p`
    font-size: 12px; /* Decrease font size */
    margin: 5px 0;
`;

const JobCategories = () => {
    return (
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
                            </CardContent>
                        </CardContainer>
                    ))}
                </CardList>
            </Wrapper>
        </Container>
    );
};

export default JobCategories;
