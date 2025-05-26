import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomersHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', path: '/geo/customers' },
    { id: 'list', name: 'Customers List', path: '/geo/customers/list' },
    { id: 'settings', name: 'Customers Settings', path: '/geo/customers/settings' },
    // { id: 'howto', name: 'How To Use', path: '/geo/customers/how-to-use' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm w-full">
      <div className="overflow-x-auto">
        <nav className="flex p-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`px-6 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap mx-1 rounded-md flex items-center
                ${currentPath === tab.path
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab.name}
              {currentPath === tab.path && (
                <span className="ml-2 bg-blue-500 px-1.5 py-0.5 rounded-full text-xs">
                  Active
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CustomersHeader;