import {Link} from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(null);

  const navItems = [
    { name: "Home", link: "#" },
    { name: "Find Doctors", link: "#" },
    { name: "Find Medical", link: "#" },
    { name: "Consulto Prime", link: "#" },
    { name: "Help", link: "#" }
  ];

  return (
    <div className="w-full bg-blue-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center mr-2">
            <div className="w-4 h-3 border-2 border-white rounded-sm"></div>
          </div>
          <span className="text-blue-900 font-bold text-xl tracking-tight">TeleHealth</span>
        </div>
        
        {/* Navigation Items */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className={`text-gray-700 hover:text-blue-900 font-medium ${
                isHovered === index ? 'text-blue-900' : ''
              }`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-900 font-medium">Log in</Link>
          <Link to="/register" className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-medium transition-colors duration-200">Sign in</Link>
        </div>
      </div>
    </div>
  );
}