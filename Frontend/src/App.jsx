import "./App.css";
import Navbar from "./Components/Navbar";
import VideoCard from "./Components/VideoCard";
import Home from "./Pages/Home";
import Login from "./Pages/login";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./Components/PatientDashboard/DashboardLayout";
import MedicalRecords from "./Components/PatientDashboard/pages/MedicalRecords";
import Appointment from "./Components/PatientDashboard/pages/Appointment";
import OnlineConsultations from "./Components/PatientDashboard/pages/OnlineConsultations";
import Feedback from "./Components/PatientDashboard/pages/Feedback";
import Payments from "./Components/PatientDashboard/pages/Payments";
import ProfileSettings from "./Components/PatientDashboard/pages/ProfileSettings";
import ConsultationPage from "./Pages/ConsultationPage";
import DoctorRegister from "./Pages/DoctorRegister";
import BookAppointment from "./Components/PatientDashboard/pages/Appointments/BookAppointment"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/doctor-register" element={<DoctorRegister/>} />
			<Route path="/consultation/:specialty" element={<ConsultationPage />} />

			<Route path="/patient-dashboard" element={<DashboardLayout />}>
				<Route
					index
					element={<Navigate to="/patient-dashboard/appointments" replace />}
				/>
				<Route path="medical-records" element={<MedicalRecords />} />
				<Route path="appointments" element={<Appointment />} />
				<Route path="online-consultations" element={<OnlineConsultations />} />
				<Route path="feedback" element={<Feedback />} />
				<Route path="payments" element={<Payments />} />
				<Route path="profile-settings" element={<ProfileSettings />} />
				<Route path="book-appointments" element={<BookAppointment />} />

			</Route>

		</Routes>
	);
}

export default App;
