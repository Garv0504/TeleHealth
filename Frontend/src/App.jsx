import "./App.css";
import Navbar from "./Components/Navbar";
import VideoCard from "./Components/VideoCard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
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
import BookAppointment from "./Components/PatientDashboard/pages/Appointments/BookAppointment";
import DoctorAppointments from "./Components/DoctorDashboard/pages/DoctorAppointments";
import DocDashboardLayout from "./Components/DoctorDashboard/DocDashboardLayout";
import ManageSlots from "./Components/DoctorDashboard/pages/ManageSlots";
import VideoCall from "./Components/PatientDashboard/pages/VideoCall";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/doctor-register" element={<DoctorRegister />} />
			<Route path="/consultation/:specialty" element={<ConsultationPage />} />

			<Route
				path="/patient-dashboard"
				element={
					<PrivateRoute>
						<DashboardLayout />
					</PrivateRoute>
				}
			>
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
			<Route
				path="/doctor-dashboard"
				element={
					<PrivateRoute>
						<DocDashboardLayout />
					</PrivateRoute>
				}
			>
				<Route
					index
					element={<Navigate to="/doctor-dashboard/appointments" replace />}
				/>
				<Route path="manage-slots" element={<ManageSlots />} />
				<Route path="appointments" element={<DoctorAppointments />} />
			</Route>
			<Route path="/room/:roomId" element={<VideoCall />} />
		</Routes>
	);
}

export default App;