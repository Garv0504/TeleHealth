import './App.css'
import Navbar from './components/Navbar'
import VideoCard from './Components/VideoCard'
import Home from './Pages/Home'
import Login from './Pages/login'
import Register from './Pages/Register'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Specialties from './Components/Specialities'
function App() {

  return (
      // <Routes>
      //     <Route path="/" element={<Home />} />
      //     <Route path="/login" element={<Login />} /> 
      //     <Route path="/register" element={<Register />} />
      // </Routes>
      <Specialties/>
  )
}

export default App
