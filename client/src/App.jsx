
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'




const App = () => {
  return (
    <div>

      <Router>



        <Routes>


          <Route path="/" exact element={<Home />} />
          <Route path='/jobs' exact element={<Jobs />} />


        </Routes>


      </Router>



    </div>
  )
}

export default App
