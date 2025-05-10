import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Calendar, Clock, FileText, MessageSquare, CreditCard, Settings, Users } from 'lucide-react';
import doctorData from '../../data/doctorData';

const DoctorSidebar = () => {
  const navItems = [
    { path: '/doctor-dashboard/manage-slots', name: 'Manage Slots', icon: Clock },
    { path: '/doctor-dashboard/appointments', name: 'Appointments', icon: Calendar },
    { path: '/doctor-dashboard/patient-records', name: 'Patient Records', icon: FileText },
    { path: '/doctor-dashboard/consultations', name: 'Consultations', icon: Users },
    { path: '/doctor-dashboard/messages', name: 'Messages', icon: MessageSquare },
    { path: '/doctor-dashboard/earnings', name: 'Earnings', icon: CreditCard },
    { path: '/doctor-dashboard/profile-settings', name: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Doctor Profile */}
      <div className="p-5 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 rounded-full p-1">
            <User size={32} className="text-gray-500" />
          </div>
          <div>
            <h2 className="font-medium text-gray-800">{doctorData.name}</h2>
            <p className="text-sm text-gray-500">{doctorData.specialization}</p>
            <p className="text-xs text-gray-400">License: {doctorData.licenseNumber}</p>
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

export default DoctorSidebar;