
import Benefits from "../Components/Benefits"
import Features from "../Components/Features"
import Footer from "../Components/Footer"

import JobCategories from "../Components/JobCategories"
import LatestJobs from "../Components/LatestJobs"

import NewsLetter from "../Components/NewsLetter"
import Reviews from "../Components/Reviews"
import Slider from "../Components/Slider"
import styled, { keyframes } from 'styled-components'


const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
  
  animation: ${fadeInAnimation} 0.3s ease;
`

const Home = () => {
  return (


    <Container>



      <Slider />
      <Features />
      <JobCategories />
      <Benefits />
      <LatestJobs />
      <Reviews />
      <NewsLetter />
      <Footer />



    </Container>


  )
}

export default Home
