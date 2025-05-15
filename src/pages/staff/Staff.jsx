import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoPersonAddSharp } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);
  const navigate = useNavigate();

  const staffList = [
    { id: '1018', name: 'AHMED', department: 'Production' },
    { id: '1023', name: 'AJAYBHAI CHAUHAN', department: 'Production' },
    { id: '1024', name: 'ALIM', department: 'Production' },
    { id: '1022', name: 'AMIT CHANDRAPAL', department: 'Production' },
    { id: '1008', name: 'AMIT KUMAR', department: 'Production' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Staff Payment Summary</h1>
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <IoPersonAddSharp className="text-lg" />
            Add Staff
          </button>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Staff"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2.5 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <FaFilter className="text-gray-600" />
              <span className="text-blue-600 font-medium">Filter</span>
            </button>
            <button className="px-4 py-2.5 border border-gray-300 rounded-md flex items-center gap-2 text-blue-600 hover:bg-gray-50 transition-colors font-medium">
              Bulk Actions
              <IoMdArrowDropdown />
            </button>
            <button className="px-4 py-2.5 border border-gray-300 rounded-md text-blue-600 hover:bg-gray-50 transition-colors font-medium">
              View Overall Report
            </button>
          </div>
        </div>

        {/* Staff List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {/* Select All */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={selectedStaff.length === staffList.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedStaff(staffList.map(staff => staff.id));
                  } else {
                    setSelectedStaff([]);
                  }
                }}
              />
              <span className="text-sm font-medium text-gray-700">Select All</span>
            </label>
          </div>

          {/* Department Header */}
          <div className="px-4 py-3 bg-blue-50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-700">Production</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {staffList.length}
              </span>
            </div>
          </div>

          {/* Staff Items */}
          <div className="divide-y divide-gray-200">
            {staffList.map((staff) => (
              <div key={staff.id} className="px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedStaff.includes(staff.id)}
                    onChange={() => {
                      if (selectedStaff.includes(staff.id)) {
                        setSelectedStaff(selectedStaff.filter(id => id !== staff.id));
                      } else {
                        setSelectedStaff([...selectedStaff, staff.id]);
                      }
                    }}
                  />
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-600 font-medium">
                    {staff.name.charAt(0)}
                  </div>
                  <span 
                    className="font-medium text-sm cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => navigate(`/staff/${staff.id}/personal`)}
                  >
                    {staff.name}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-500">ID: {staff.id}</span>
                  <button className="text-blue-600 text-sm hover:text-blue-700 font-medium px-3 py-1.5 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                    Add Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;