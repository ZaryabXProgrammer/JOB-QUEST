import Announcement from "../Components/Announcement"
import Benefits from "../Components/Benefits"
import Features from "../Components/Features"
import Footer from "../Components/Footer"

import JobCategories from "../Components/JobCategories"
import LatestJobs from "../Components/LatestJobs"
import Navbar from "../Components/Navbar"
import NewsLetter from "../Components/NewsLetter"
import Reviews from "../Components/Reviews"
import Slider from "../Components/Slider"


const Home = () => {
  return (
    <div>


      <Announcement/>
      <Navbar />
      <Slider />
      <Features />
      <JobCategories />
      <Benefits />
      <LatestJobs />
      <Reviews />
      <NewsLetter />
      <Footer/>
     
      

    </div>


  )
}

export default Home
