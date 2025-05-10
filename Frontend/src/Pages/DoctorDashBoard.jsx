import { useState } from 'react';
import { Calendar, Users, Radio, BarChart2, Settings, User, Award, ThumbsUp, Share2, MessageSquare, FileText } from 'lucide-react';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName, setUserName] = useState('Dr. Garv Agarwal');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <User className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
    { id: 'communications', label: 'Communications', icon: <Radio className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'profiles', label: 'Profiles', icon: <User className="w-5 h-5" /> },
    { id: 'prime', label: 'Prime', icon: <Award className="w-5 h-5" /> },
    { id: 'feedback', label: 'Feedback', icon: <ThumbsUp className="w-5 h-5" /> },
    { id: 'reach', label: 'Reach', icon: <Share2 className="w-5 h-5" /> },
    { id: 'consult', label: 'Consult', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'healthfeed', label: 'Healthfeed', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center">
          <div className="text-orange-500 font-bold text-2xl">
            <span className="text-orange-500">•</span>
            practo
            <span className="text-orange-500">•</span>
          </div>
        </div>
        
        {/* User name */}
        <div className="px-4 py-2 border-b border-indigo-800">
          <div className="text-lg font-semibold">{`${userName}`}</div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
                  activeTab === item.id ? 'bg-indigo-800' : 'hover:bg-indigo-800'
                }`}
              >
                <div className="mr-3">{item.icon}</div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 text-sm text-center border-t border-indigo-800">
          practo.com
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Profile</h1>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Hello {userName}! Let's build your dedicated profile.</h2>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Section A: Profile details</h3>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <div className="flex">
                      <div className="w-1/4 mr-2">
                        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Dr./Mr./Ms.</option>
                          <option>Dr.</option>
                          <option>Mr.</option>
                          <option>Ms.</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          placeholder="Please enter your Name" 
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Specialization</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Specialization</option>
                      <option>Cardiology</option>
                      <option>Dentistry</option>
                      <option>Dermatology</option>
                      <option>Neurology</option>
                      <option>Orthopedics</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input type="radio" name="gender" className="mr-2" />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="gender" className="mr-2" />
                        <span>Female</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="gender" className="mr-2" />
                        <span>Other</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">City</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select City</option>
                      <option>Mumbai</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                      <option>Chennai</option>
                      <option>Kolkata</option>
                    </select>
                  </div>
                  
                  <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors">
                    Continue
                  </button>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    If you are not a doctor and owns an establishment <span className="text-blue-500 cursor-pointer">Click here</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Preview</h3>
                <div className="flex items-start">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mr-6 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">{userName}</h4>
                    <p className="text-gray-600">Select your specialization to complete your profile</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'dashboard' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">{menuItems.find(item => item.id === activeTab)?.label} Page</h2>
                <p className="text-gray-600">This section is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}