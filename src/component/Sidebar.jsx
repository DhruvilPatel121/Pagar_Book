import React, { useState, useEffect } from "react";
import { MdSpaceDashboard, MdEmojiPeople } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5"; 
import { TbReport } from "react-icons/tb";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  
  // When sidebar state changes, update the main content margin
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.marginLeft = isExpanded ? '256px' : '64px'; // 256px = 16rem (w-64), 64px = 4rem (w-16)
    }
  }, [isExpanded]);

  const navItems = [
    { label: "Dashboard", icon: <MdSpaceDashboard />, path: "/" },
    { label: "Staff", icon: <IoPeopleSharp />, path: "/staff" },
    { label: "Attendance", icon: <MdEmojiPeople />, path: "/attendance" },
    { label: "Payroll", icon: <FaMoneyCheckAlt />, path: "/payroll" },
    { label: "Reports", icon: <TbReport />, path: "/reports" },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-20
        ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`p-4 border-b ${!isExpanded && 'flex justify-center'}`}>
        {isExpanded ? (
          <h1 className="text-xl font-semibold flex items-center justify-between">
            OM ENTERPRISE
            <span className="text-xs">▼</span>
          </h1>
        ) : (
          <h1 className="text-xl font-semibold">OE</h1>
        )}
      </div>
      <nav className="mt-4 flex flex-col h-[calc(100vh-5rem)]">
        <div className="flex-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center ${!isExpanded ? 'justify-center' : 'justify-between'} 
                py-3 px-4 transition-colors hover:bg-gray-50
                ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
            >
              <div className={`flex items-center ${isExpanded ? 'gap-3' : 'justify-center'}`}>
                <span className={`text-xl ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {isExpanded && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </div>
            </Link>
          ))}
        </div>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center ${!isExpanded ? 'justify-center' : 'gap-3'} px-4 py-3 
            text-gray-700 hover:bg-gray-50 border-t
            ${isActive ? 'bg-blue-50 text-blue-600' : ''}`
          }
        >
          <FiSettings className="w-5 h-5" />
          {isExpanded && <span className="whitespace-nowrap">Settings</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar