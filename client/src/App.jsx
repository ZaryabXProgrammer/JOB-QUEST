
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'



const App = () => {
  return (
    <div>

      <Router>

        
        
        <Routes>


          <Route path="/" exact element={<Home />} />



        </Routes>


      </Router>



    </div>
  )
}

export default App
