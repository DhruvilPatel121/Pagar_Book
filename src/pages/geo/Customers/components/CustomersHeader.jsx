import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomersHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', path: '/geo/customers' },
    { id: 'list', name: 'Customers List', path: '/geo/customers/list' },
    { id: 'settings', name: 'Customers Settings', path: '/geo/customers/settings' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 sticky top-6 z-50 border-b border-gray-200">
      <div className="overflow-x-auto">
        <nav className="flex space-x-1 p-2 min-w-max md:min-w-0 md:justify-start">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 whitespace-nowrap
                ${currentPath === tab.path
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CustomersHeader