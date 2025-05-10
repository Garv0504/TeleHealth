import './App.css'
import Navbar from './Components/Navbar'
import VideoCard from './Components/VideoCard'
import Home from './Pages/Home'
import Login from './Pages/login'
import Register from './Pages/Register'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import DoctorDashboard from './Pages/DoctorDashBoard'
import VideoCall from './Components/VideoCall'
import PaymentGateway from './Components/PaymentGateway'
import ChatRoom from './Components/Chatroom'
function App() {

  return (
      <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> */}
          <Route path="/" element={<ChatRoom/>}/>
          <Route path="/room/:roomId" element={<VideoCall/>}/>
      </Routes>
  )
}

export default App