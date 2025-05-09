import './App.css'
import Navbar from './components/Navbar'
import VideoCard from './Components/VideoCard'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <div>
        {/* <h1>TeleHeath Web App</h1> */}
        <Navbar/>
        <Home/>
        <VideoCard/>
      </div>
    </>
  )
}

export default App
