import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TaskNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/geo/tasks' },
    { id: 'list', label: 'Tasks List', path: '/geo/tasks/list' },
    { id: 'assign', label: 'Assign Task', path: '/geo/tasks/assign' },
    { id: 'reports', label: 'Reports', path: '/geo/tasks/reports' },
    { id: 'settings', label: 'Settings', path: '/geo/tasks/settings' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 sticky top-6 z-50 border-b border-gray-200">
      <div className="overflow-x-auto">
        <nav className="flex space-x-1 p-2 min-w-max md:min-w-0 md:justify-start">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 whitespace-nowrap
                ${currentPath === item.path 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TaskNav