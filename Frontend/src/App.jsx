import './App.css'
import Navbar from './components/Navbar'
import VideoCard from './Components/VideoCard'
import Home from './Pages/Home'
import Login from './Pages/login'
import Register from './Pages/Register'
import Footer from './Components/Footer'
function App() {

  return (
    <>
      <div>
        {/* <h1>TeleHeath Web App</h1> */}

        {/* <Home/> */}
        {/* <Register/> */}
        <Footer/>
        {/* <Login/> */}
        {/* <VideoCard/> */}

        <Navbar/>
        <Home/>
        <VideoCard/>
      </div>
    </>
  )
}

export default App
