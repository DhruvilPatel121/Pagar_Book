import React, { useState, useEffect } from "react";
import { MdSpaceDashboard, MdEmojiPeople } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5"; 
import { TbReport } from "react-icons/tb";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  
  // Update margin based on screen size and sidebar state
  useEffect(() => {
    const mainContent = document.querySelector('main');
    const updateMargin = () => {
      if (mainContent) {
        if (window.innerWidth >= 768) {
          // Desktop view
          mainContent.style.marginLeft = isExpanded ? '256px' : '64px';
        } else {
          // Mobile view
          mainContent.style.marginLeft = '0';
        }
      }
    };

    updateMargin();
    window.addEventListener('resize', updateMargin);
    
    return () => window.removeEventListener('resize', updateMargin);
  }, [isExpanded]);

  // Close sidebar on route change in mobile view
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navItems = [
    { label: "Dashboard", icon: <MdSpaceDashboard />, path: "/" },
    { label: "Staff", icon: <IoPeopleSharp />, path: "/staff" },
    { label: "Attendance", icon: <MdEmojiPeople />, path: "/attendance" },
    { label: "Payroll", icon: <FaMoneyCheckAlt />, path: "/payroll" },
    { label: "Reports", icon: <TbReport />, path: "/reports" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-60 md:hidden text-gray-600 hover:text-gray-900"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

    {/* Backdrop */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-50" 
            onClick={() => setIsMobileOpen(false)}
          />
        )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-[50]
          w-16 hover:w-64
          ${window.innerWidth >= 768 ? 'translate-x-0' : isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onMouseEnter={() => window.innerWidth >= 768 && setIsExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsExpanded(false)}
      >
        <div className={`p-4 border-b flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
          {isExpanded ? (
            <>
            <h1 className="text-xl font-semibold">
              OM ENTERPRISE
            </h1>
            <button 
                className="text-gray-600 hover:text-gray-900 md:hidden"
                onClick={() => setIsMobileOpen(false)}
              >
                <FiX size={20} />
              </button>
              </>
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
                className={`flex items-center px-4 py-3 transition-colors ${!isExpanded ? 'justify-center' : 'justify-between'}
                  ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <div className={`flex items-center ${isExpanded ? 'gap-3' : ''}`}>
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
              `flex items-center px-4 py-3 border-t ${!isExpanded ? 'justify-center' : 'gap-3'} 
              ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            <FiSettings className="w-5 h-5" />
            {isExpanded && <span className="whitespace-nowrap">Settings</span>}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar