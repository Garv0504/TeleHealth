# Telehealth Solution for access to Healthcare from anywhere.


![React](https://img.shields.io/badge/React-Latest-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Express](https://img.shields.io/badge/Express-Latest-lightgrey)
![Node.js](https://img.shields.io/badge/Node.js-Latest-darkgreen)

## 📋 Overview

TeleHealth is a full-stack telemedicine platform that allows patients to seamlessly browse, select, and book appointments with doctors across various specialties. Built using the MERN stack and React with Vite, the platform supports user authentication, doctor profiles, protected patient dashboard, and secure appointment booking — offering a modern, responsive, and intuitive healthcare experience.

### 🌐 Live Demo

<p>
  Check out the live version of the application: 
  <a href="https://telehealth-beta.vercel.app" target="_blank" rel="noopener noreferrer">
    Live Demo
  </a>
</p>

### 📹 Demo Video

Watch a demonstration of our project's features and functionality: [Demo Video](https://drive.google.com/file/d/1Egs6VzUhPx6BK04zAiFGIqIG_NuZ8Vyj/view)

### 📚 Documentation

For comprehensive documentation of the project, including architecture, API endpoints, and more: [Full Documentation](https://drive.google.com/file/d/1htzyCbkWxm-xgoFa7wubzoUBFz36CHsc/view?usp=drive_link)

### 👌Figma Design

Figma design of the TeleHealth Website: [Figma Design](https://www.figma.com/design/5F3HVEC3wmqpqaI3BMKi4i/TeleHealth_FigmaDesign?node-id=12-218&t=3F2jMyPSO2s3JH6H-0)


## 🛠️ Technology Stack

### Frontend
- **React**: Frontend library for building user interfaces
- **Vite**: Next generation frontend tooling
- **JavaScript**: Programming language for logic
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful & consistent icons

### Backend
- **MongoDB**: NoSQL database for storing application data
- **Express.js**: Web application framework for Node.js
- **React**: Frontend library for building user interfaces
- **Node.js**: JavaScript runtime for server-side code

### Additional Tools & Libraries
- **Authentication**: JWT Webtoken
- **State Management**: Context API
- **API Client**: Axios

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.x or higher recommended)
- npm or yarn
- MongoDB (local installation or Atlas account)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Garv0504/TeleHealth.git

# Navigate to the frontend directory
cd TeleHealth/Frontend

# Install dependencies
npm install
# or
yarn

# Start the development server
npm run dev
# or
yarn dev
```

The frontend development server will start at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to the backend directory from the project root
cd TeleHealth/Backend

# Install dependencies
npm install
# or
yarn

# Set up environment variables
# Create a .env file in the Backend directory with the following variables:
NODE_ENV=development
# PORT=your-port-number
# MONGO_URI=your-mongodb-uri
# JWT_SECRET=your-jwt-secret
# JWT_EXPIRE=your-jwt-expiry
# EMAIL_HOST=your-email-host
# EMAIL_PORT=your-email-host
# EMAIL_USERNAME=your-email-username
# EMAIL_PASSWORD=your-email-password
# EMAIL_FROM=your-sending-email
# key_id=your-razorpay-id
# key_secret=your-razorpay-secret


# Start the backend server
npm run dev
# or
yarn dev
```

The backend server will start at `http://localhost:your-port-number`

## 🏗️ Build Commands

### Frontend Build

```bash
# Navigate to the frontend directory
cd TeleHealth/Frontend

# Build for production
npm run build
# or
yarn build

# Preview the build locally
npm run preview
# or
yarn preview
```

### Backend Build

```bash
# Navigate to the backend directory
cd TeleHealth/Backend

# Build for production (if using TypeScript)
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## 📝 Project Structure

```
TeleHealth/
├── Frontend/                 # Frontend React application
│   ├── public/               # Static files
│   ├── src/                  # Source files
│   │   ├── api/              # Fetching api etc.
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── Components/       # Reusable components
│   │   ├── Context/          # React context providers
│   │   ├── Pages/            # Page components
│   │   ├── data/             # Dummy Data
│   │   ├── services/         # API services
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML template
│   ├── .env                  # Environment variables
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
│
├── Backend/                  # Backend Node.js application
│   ├── src/                  # Source files
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   ├── .env                  # Environment variables
│   ├── server.js             # Server file
│   └── package.json          # Backend dependencies
│
├── README.md                 # Project documentation
└── .gitignore                # Git ignore file
```

## 🌟 Features

- **Instant Health Consultation**
- **Patient Information Capture**
- **Secure Payment Processing**
- **Data Privacy and Security**
- **In-App Chat**


## 📱 API Endpoints

Document your backend API endpoints here. For example:

```
Base URL: https://telehealth-qtjz.onrender.com
Authentication:
- Register patient/doctor (POST): /api/auth/register
- Login patient/doctor (POST): /api/auth/login
- Get profile details (GET): /api/auth/me
- Get all doctors (GET): /api/auth/doctors

Availability:
- Create slot (POST): /api/availability/
- Show slots (GET): /api/availability/

Appointments:
- Get available slots for a doctor (GET): /api/appointments/availability/:doctorId
- Get user appointments (GET): /api/appointments/
- Book appointment (POST): /api/appointments/book-appointment/
- Get doctor's appointments (GET): /api/appointments/doctor/:doctorId
- Get patient's appointments (GET): /api/appointments/patient/:patientId

Payment:
- Create Razorpay order (POST): /api/payment/order
- Validate Razorpay payment signature (POST): /api/payment/validate
```

## 🔒 Environment Variables

### Frontend (.env)

```
VITE_REACT_APP_BASE_URL=https://telehealth-qtjz.onrender.com/api
VITE_REACT_RAZORPAY_KEY_ID=your-razorpay-key
VITE_REACT_key_secret=ypur-razorpay-secret
VITE_REACT_APP_ZEGOCLOUD_APP_ID=your-zegocloud-key
VITE_REACT_APP_ZEGOCLOUD_SERVER_SECRET=your-zegocloud-secret
```

### Backend (.env)

```
# PORT=your-port-number
# MONGO_URI=your-mongodb-uri
# JWT_SECRET=your-jwt-secret
# JWT_EXPIRE=your-jwt-expiry
# EMAIL_HOST=your-email-host
# EMAIL_PORT=your-email-host
# EMAIL_USERNAME=your-email-username
# EMAIL_PASSWORD=your-email-password
# EMAIL_FROM=your-sending-email
# key_id=your-razorpay-id
# key_secret=your-razorpay-secret
```

## 🐛 Troubleshooting

Common issues and their solutions:

1. **MongoDB Connection Issues**
   - Ensure your MongoDB instance is running
   - Check if the connection string in .env is correct
   - Make sure network settings allow connections

2. **Node/NPM Issues**
   - Try clearing npm cache: `npm cache clean --force`
   - Use a specific Node version with nvm if needed

3. **Build Errors**
   - Check console for specific error messages
   - Ensure all dependencies are installed: `npm install`
   - Clear the dist or build folder and rebuild

## 👥 Contributors

- [Garv Agarwal](https://github.com/Garv0504) 
- [Aryan Yadav](https://github.com/yaryan1303)
- [Aryan](https://github.com/Aryan3803)
- [Dev Kumar](https://github.com/devk007)
