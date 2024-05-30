
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import Register from './Pages/Register'
import Announcement from './Components/Announcement'
import Navbar from './Components/Navbar'
import SignIn from './Pages/SignIn'
import CreateJob from './Pages/CreateJob'
import { JobsProvider } from './Helpers/JobContext';
import JobApply from './Pages/JobApply'
import ResumeRater from './Pages/ResumeRater'
import JobGraph from './Pages/JobGraph'
import SkillsGap from './Pages/SkillsGap'
import RoadMap from './Pages/RoadMap'




const App = () => {
  return (
    <div>

      <Router>

        <JobsProvider>

          <Announcement />
          <Navbar />

          <Routes>


            <Route path="/" exact element={<Home />} />
            <Route path='/jobs' exact element={<Jobs />} />
            <Route path='/createJob' exact element={<CreateJob />} />
            <Route path='/apply/:id' exact element={<JobApply />} />

            <Route path='/register' exact element={<Register />} />
            <Route path='/login' exact element={<SignIn />} />

            <Route path='/rate' exact element={<ResumeRater />} />
            <Route path='/jobGraph' exact element={<JobGraph />} />
            <Route path='/skillsGap' exact element={<SkillsGap />} />
            <Route path='/roadMap' exact element={<RoadMap/>} />

          </Routes>

        </JobsProvider>
      </Router>



    </div>
  )
}

export default App
