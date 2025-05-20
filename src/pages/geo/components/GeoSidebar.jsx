import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdLocationOn, MdDescription, MdAssignment } from 'react-icons/md';
import { FaUsers, FaShoppingCart, FaQuestionCircle, FaCog } from 'react-icons/fa';

const GeoSidebar = ({ mainSidebarWidth }) => {
  const location = useLocation();
  
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard className="text-xl" />, path: '/geo' },
    { id: 'tracking', label: 'Tracking', icon: <MdLocationOn className="text-xl" />, path: '/geo/tracking' },
    { id: 'forms', label: 'Forms', icon: <MdDescription className="text-xl" />, path: '/geo/forms' },
    { id: 'tasks', label: 'Tasks', icon: <MdAssignment className="text-xl" />, path: '/geo/tasks' },
    { id: 'customers', label: 'Customers', icon: <FaUsers className="text-xl" />, path: '/geo/customers' },
    { id: 'orders', label: 'Orders', icon: <FaShoppingCart className="text-xl" />, path: '/geo/orders' },
    { id: 'help', label: 'Help', icon: <FaQuestionCircle className="text-xl" />, path: '/geo/help' },
    { id: 'settings', label: 'Settings', icon: <FaCog className="text-xl" />, path: '/geo/settings' },
  ];

  return (
    <div 
      className="h-screen bg-white border-r border-gray-200 z-10 overflow-y-auto fixed top-0 ml-5 mt-6"
      style={{ left: mainSidebarWidth, width: '220px' }}
    >
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center mr-2">OE</div>
        <span className="text-blue-600 font-medium">Book Geo</span>
      </div>
      <nav className="mt-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm ${
              location.pathname === item.path || 
              (item.id === 'dashboard' && location.pathname.startsWith('/geo') && location.pathname === '/geo')
                ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-500'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className={`mr-3 ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default GeoSidebar;