import styled from 'styled-components'
import rightArrow from '../assets/benefits/rightArrow.png'
import leftArrow from '../assets/benefits/leftArrow.png'

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

const Title = styled.h1`
    font-size: 50px;
    
`

const Span = styled.span`
color: #1d59ff;
`

const Top = styled.div`
display: flex;
justify-content: space-between;
height: 20vh;

`
const LeftButtons = styled.div`

display: flex;

`
const LeftBtn = styled.button`

height: 10px;
width: 50px;
padding: 8px 10px;


`
const RightButtons = styled.button`
display: flex;


`
const Arrow = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
padding: 10px;

`


const Center = styled.div`
height: 70vh;
`

const Bottom = styled.div`
height: 10vh;
`

const LowerButton = styled.button`

`

const LatestJobs = () => {

    return (


        <Container>

            <Wrapper>

                <Title>Latest Jobs <Span>Here</Span> </Title>

                <Top>
                    <LeftButtons>
                        <LeftBtn />
                        <LeftBtn />
                    </LeftButtons>

                    <RightButtons>
                        <Arrow src={leftArrow} />
                        <Arrow src={rightArrow} />


                    </RightButtons>
                </Top>

                <Center>


                </Center>

                <Bottom>

                    <LowerButton />
                    
                </Bottom>





            </Wrapper>

        </Container>
    )
}

export default LatestJobs
