import styled from "styled-components"
import { mobile } from '../Responsive'
import HomeBanner from '../assets/homeVect.png'
import { useState } from "react"
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import app from '../Firebase'



const Container = styled.div`
    
    width: 100%;
    height: 90vh; // 100 vh is used to give the device width for landing page
    display: flex;

    position: relative;
    overflow: hidden;
    /* ${mobile({ display: 'none' })} */
`
const ImgContainer = styled.div`
height: 100%;
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
    font-size: 70px;
    
`
const Desc = styled.p`
    margin: 10px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;

`

const Span = styled.span`
    color: #1d59ff;
    font-weight: bold;
`
const SearchBoxContainer = styled.div`
    display: flex;
    align-items: center;
    
  `

const SearchInput = styled.input`
    padding: 13px;
   font-size: 20px;
    border: 1px solid #ccc;
    border-right: none;
    font-weight: bold;
    
  
    width: 200px;
    font-size: 16px;
  `
const Button = styled.button`
    padding: 11px;
   
    font-size: 20px;
    background-color: transparent;
    border: 1px solid #ccc;
    font-weight: bold;
   
cursor: pointer;
transition: 0.3s ease;
 &:hover {
    background-color:#2660ff;
    color: white;
    
  
  }
`
const Button2 = styled.button`
    padding: 8px;
   
    font-size: 14px;
    background-color: transparent;
    border: 1px solid #ccc;
    font-weight: bold;
   
cursor: pointer;
transition: 0.3s ease;
 &:hover {
    background-color:#2660ff;

    color: white;
    
  
  }
`
const InputField = styled.input`
  width: 30%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;


const Slider = () => {


    const [click, setclick] = useState(false)

    
    return (
        <Container>

            <InfoContainer>

                <Title>Find <Span>Remote</Span>  <br /> Job in <Span>Worldwide</Span> </Title>
                <Desc>Find Perfect Job Now</Desc>

                <SearchBoxContainer>
                    <SearchInput type="text" placeholder="Search..." />
                    <Button >Find Now! </Button>
                </SearchBoxContainer>

                <Desc>OR SEARCH THROUGH YOUR <Span>RESUME</Span>! </Desc>


                {click ? (
                    <InputField
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        placeholder="Attach Resume"
                        
                    />
                ) : (
                        <Button2 onClick={() => setclick(!click)}>Choose File!</Button2>
                )}

            </InfoContainer>

            <ImgContainer>
                <Image src={HomeBanner} />
            </ImgContainer>


        </Container>


    )
}

export default Slider
