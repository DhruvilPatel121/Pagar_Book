import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { colors } from '../../../../theme';

const FormsHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { id: 'responses', name: 'Responses', path: '/geo/forms/responses' },
    { id: 'templates', name: 'Templates', path: '/geo/forms/templates' },
    { id: 'reports', name: 'Reports', path: '/geo/forms/reports' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <div className="overflow-x-auto">
        <nav className="flex p-2 min-w-max md:min-w-0 md:justify-start">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`px-6 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap mx-1
                ${(currentPath === tab.path || 
                  (tab.path.includes('/templates') && currentPath.includes('/templates/')))
                  ? 'bg-blue-500 text-white rounded-md' 
                  : 'text-gray-600 hover:bg-gray-100 rounded-md'
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

export default FormsHeader;