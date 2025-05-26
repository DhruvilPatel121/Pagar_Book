import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaFileAlt, FaUsers } from 'react-icons/fa';

const CustomersSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Navigation Tabs */}
      {/* <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-2 rounded-lg">
        <Link 
          to="/geo/customers" 
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          to="/geo/customers/list" 
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md transition-colors"
        >
          Customers List
        </Link>
        <Link 
          to="/geo/customers/settings" 
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white shadow-sm rounded-md transition-colors"
        >
          Customers Settings
        </Link>
        <Link 
          to="#" 
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md transition-colors"
        >
          How To Use
        </Link>
      </div> */}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Manage settings related to customer management in Geo.</p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        {/* Customers Template Card */}
        <div 
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate('/geo/customers/template')}
        >
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FaFileAlt className="text-indigo-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Customers Template</h3>
                <p className="text-gray-600 text-sm">Add custom fields to capture additional information about your customers.</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
        </div>

        {/* Staff who can add customers Card */}
        <div 
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate('/geo/customers/staff-permissions')}
        >
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Staff who can add customers</h3>
                <p className="text-gray-600 text-sm">Select staff who will be able to add customers to Geo.</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Additional Settings Section (can be expanded later) */}
      {/* <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Advanced Settings</h2>
        <p className="text-gray-600">
          Additional customer management settings will appear here as they become available.
        </p>
      </div> */}
    </div>
  );
};

export default CustomersSettings;