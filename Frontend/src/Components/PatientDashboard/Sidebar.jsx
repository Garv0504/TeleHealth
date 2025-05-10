import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, FileText, Calendar, Video, MessageSquare, CreditCard, Settings } from 'lucide-react';
import patientData from '../../data/patientData';

const Sidebar = () => {
  const navItems = [
    { path: '/patient-dashboard/medical-records', name: 'Medical Records', icon: FileText },
    { path: '/patient-dashboard/appointments', name: 'Appointments', icon: Calendar },
    { path: '/patient-dashboard/online-consultations', name: 'Online Consultations', icon: Video },
    { path: '/patient-dashboard/feedback', name: 'Feedback', icon: MessageSquare },
    { path: '/patient-dashboard/payments', name: 'Payments', icon: CreditCard },
    { path: '/patient-dashboard/profile-settings', name: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Patient Profile */}
      <div className="p-5 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 rounded-full p-1">
            <User size={32} className="text-gray-500" />
          </div>
          <div>
            <h2 className="font-medium text-gray-800">{patientData.name}</h2>
            <p className="text-sm text-gray-500">{patientData.phone}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 pt-2">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-5 py-3 text-sm transition-colors duration-150 ${
                      isActive 
                        ? 'text-blue-600 border-l-4 border-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon size={18} className="mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar