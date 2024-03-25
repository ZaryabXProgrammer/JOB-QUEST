import styled from "styled-components"
import { mobile } from '../Responsive'
import HomeBanner from '../assets/homeVect.png'

const Slider = () => {

    const Container = styled.div`
        width: 100%;
        height: 90vh;
        display: flex;
        position: relative;
        overflow: hidden;
        ${mobile({ height: 'auto', flexDirection: 'column'})}
    `;

    const ImgContainer = styled.div`
        height: 100%;
        flex: 1;
    `;

    // ${mobile({ display: 'none' })}
    
    const Image = styled.img`
        height: 100%;
        width: 100%;
        object-fit: cover;
    `;

    const InfoContainer = styled.div`
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px;
        flex-direction: column;
        ${mobile({ padding: '20px'})}
    `;

    const Title = styled.h1`
        font-size: 70px;
        text-align: center;
        margin-bottom: 20px;
        ${mobile({ fontSize: '40px' })}
    `;

    const Desc = styled.p`
        margin: 10px 0px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 3px;
        text-align: center;
        ${mobile({ fontSize: '16px' })}
    `;

    const Span = styled.span`
        color: #1d59ff;
    `;

    const SearchBoxContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        max-width: 400px;
        width: 100%;
    `;

    const SearchInput = styled.input`
        padding: 13px;
        font-size: 20px;
        border: 1px solid #ccc;
        border-right: none;
        font-weight: bold;
        width: 70%;
        flex: 1;
        ${mobile({ width: '60%', fontSize: '16px' })}
    `;

    const Button = styled.button`
        padding: 11px 20px;
        font-size: 20px;
        background-color: transparent;
        border: 1px solid #ccc;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s ease;
        &:hover {
            background-color: #2660ff;
            color: white;
        }
        ${mobile({ fontSize: '16px', padding: '8px 15px'})}
    `;

    return (
        <Container>
            <InfoContainer>
                <Title>Find <Span>Remote</Span>  <br /> Job in <Span>Worldwide</Span> </Title>
                <Desc>Find Perfect Job Now</Desc>
                <SearchBoxContainer>
                    <SearchInput type="text" placeholder="Search..." />
                    <Button>Find Now!</Button>
                </SearchBoxContainer>
            </InfoContainer>
            <ImgContainer>
                <Image src={HomeBanner} />
            </ImgContainer>
        </Container>
    )
}

export default Slider;
