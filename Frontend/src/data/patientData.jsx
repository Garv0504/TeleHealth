// Patient data
const patientData = {
  id: 1,
  name: "Gary",
  phone: "+919412580552",
  email: "gary@example.com",
  age: 35,
  gender: "Male",
  bloodType: "O+",
  address: "123 Main St, Mumbai, India"
};

// Sample appointments with past and upcoming dates
const appointments = [
  {
    id: 1,
    doctor: "Dr. Sharma",
    specialty: "Cardiologist",
    date: "2025-06-15",
    time: "10:00 AM",
    status: "confirmed",
    location: "City Hospital, Room 302"
  },
  {
    id: 2,
    doctor: "Dr. Patel",
    specialty: "Dermatologist",
    date: "2025-06-22",
    time: "2:30 PM",
    status: "pending",
    location: "Medical Center, Suite 105"
  },
  {
    id: 3,
    doctor: "Dr. Gupta",
    specialty: "General Physician",
    date: "2024-03-05", // Past appointment
    time: "9:15 AM",
    status: "completed",
    location: "Health Clinic, Floor 2"
  },
  {
    id: 4,
    doctor: "Dr. Sharma",
    specialty: "Cardiologist",
    date: "2024-02-15", // Past appointment
    time: "11:30 AM",
    status: "completed",
    location: "City Hospital, Room 302"
  }
];

// Sample medical records
const medicalRecords = [
  {
    id: 1,
    type: "Diagnostic Report",
    description: "Annual Health Checkup",
    date: "2024-12-10",
    doctor: "Dr. Gupta",
    file: "annual_checkup_report.pdf"
  },
  {
    id: 2,
    type: "Prescription",
    description: "Medication for hypertension",
    date: "2025-01-15",
    doctor: "Dr. Sharma",
    file: "blood_pressure_prescription.pdf"
  }
];

// Sample online consultations
const consultations = [
  {
    id: 1,
    doctor: "Dr. Sharma",
    specialty: "Cardiologist",
    date: "June 20, 2025",
    time: "11:30 AM",
    status: "upcoming"
  },
  {
    id: 2,
    doctor: "Dr. Mehta",
    specialty: "Nutritionist",
    date: "May 15, 2025",
    time: "3:00 PM",
    status: "completed"
  }
];

// Sample feedback with doctor-specific reviews
const feedback = [
  {
    id: 1,
    doctor: "Dr. Sharma",
    date: "May 10, 2025",
    rating: 5,
    comment: "Dr. Sharma was very thorough and took time to explain everything about my heart condition.",
    response: "Thank you for your kind feedback! I'm glad I could help explain your condition clearly."
  },
  {
    id: 2,
    doctor: "Dr. Patel",
    date: "April 22, 2025",
    rating: 4,
    comment: "Good consultation, but had to wait a bit longer than expected.",
    response: "Thank you for your feedback. We're working on improving our scheduling system."
  },
  {
    id: 3,
    doctor: "Dr. Sharma",
    date: "March 15, 2025",
    rating: 5,
    comment: "Excellent follow-up consultation. Very satisfied with the treatment plan.",
    response: "I appreciate your feedback. Looking forward to your next follow-up."
  }
];

// Sample payments
const payments = [
  {
    id: 1,
    invoiceNumber: "INV8023",
    description: "Consultation with Dr. Sharma",
    date: "June 2, 2025",
    amount: 75.00,
    status: "Paid"
  },
  {
    id: 2,
    invoiceNumber: "INV8045",
    description: "Online Consultation - Dr. Patel",
    date: "May 25, 2025",
    amount: 50.00,
    status: "Paid"
  },
  {
    id: 3,
    invoiceNumber: "INV8067",
    description: "Follow-up with Dr. Sharma",
    date: "May 22, 2025",
    amount: 45.00,
    status: "Pending"
  }
];

export default patientData;
export { 
  appointments, 
  medicalRecords,
  consultations, 
  feedback, 
  payments 
};