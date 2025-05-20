import React, { useState, useEffect } from "react";
import { MdSpaceDashboard, MdEmojiPeople, MdLocationOn } from "react-icons/md";
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
  
  // Update blur effect based on sidebar state without changing margin
  useEffect(() => {
    const mainContent = document.querySelector('main');
    const updateContentStyle = () => {
      if (mainContent) {
        // Apply blur effect when sidebar is expanded, but don't change margin
        if (isExpanded || isMobileOpen) {
          mainContent.style.filter = 'blur(2px) brightness(0.95)';
          mainContent.style.transition = 'filter 0.3s ease-in-out';
        } else {
          mainContent.style.filter = 'none';
        }
        
        // Set a fixed left padding for main content regardless of sidebar state
        if (window.innerWidth >= 768) {
          mainContent.style.paddingLeft = '64px'; // Fixed padding for the collapsed sidebar
        } else {
          mainContent.style.paddingLeft = '0';
        }
      }
    };

    updateContentStyle();
    window.addEventListener('resize', updateContentStyle);
    
    return () => window.removeEventListener('resize', updateContentStyle);
  }, [isExpanded, isMobileOpen]);

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
    { 
      label: "PagarBook Geo", 
      icon: <MdLocationOn />, 
      path: "/geo", 
      badge: "New" 
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-[60] md:hidden text-gray-600 hover:text-gray-900"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Backdrop */}
      {(isMobileOpen || isExpanded) && (
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[49] transition-opacity duration-300
            ${isMobileOpen ? 'md:hidden' : 'hidden md:block'} 
            ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => {
            setIsMobileOpen(false);
            if (window.innerWidth >= 768) setIsExpanded(false);
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-[50]
          ${isExpanded ? 'w-64' : 'w-16'}
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

        <nav className="mt-4 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-4 py-3 transition-colors ${!isExpanded ? 'justify-center' : 'justify-between'}
                  ${(location.pathname === item.path || (item.path === '/geo' && location.pathname.startsWith('/geo'))) 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <div className={`flex items-center ${isExpanded ? 'gap-3' : ''}`}>
                  <span className={`text-xl ${(location.pathname === item.path || (item.path === '/geo' && location.pathname.startsWith('/geo'))) 
                    ? 'text-blue-600' 
                    : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {isExpanded && (
                    <div className="flex items-center">
                      <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                      {item.badge && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {!isExpanded && item.badge && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full"></span>
                )}
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