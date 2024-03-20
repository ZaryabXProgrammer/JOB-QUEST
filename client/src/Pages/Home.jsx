import Announcement from "../Components/Announcement"
import Benefits from "../Components/Benefits"
import Features from "../Components/Features"

import JobCategories from "../Components/JobCategories"
import Navbar from "../Components/Navbar"
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
     
      

    </div>


  )
}

export default Home
