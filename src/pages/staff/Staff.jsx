import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoPersonAddSharp } from 'react-icons/io5';
import { IoMdArrowDropdown, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { componentStyles, colors, borders, effects, typography } from '../../theme';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    id: '',
    name: '',
    department: 'Production',
    phone: '',
    position: '',
  });
  const navigate = useNavigate();

  // List of departments for dropdown
  const departments = ['Production', 'Admin', 'Sales', 'Marketing', 'HR'];

  const staffList = [
    { id: '1018', name: 'AHMED', department: 'Production' },
    { id: '1023', name: 'AJAYBHAI CHAUHAN', department: 'Production' },
    { id: '1024', name: 'ALIM', department: 'Production' },
    { id: '1022', name: 'AMIT CHANDRAPAL', department: 'Production' },
    { id: '1008', name: 'AMIT KUMAR', department: 'Production' },
    // Adding more staff for scrolling demo
    { id: '1009', name: 'RAHUL SHARMA', department: 'Production' },
    { id: '1010', name: 'VIJAY PATEL', department: 'Production' },
    { id: '1011', name: 'SURESH KUMAR', department: 'Production' },
  ];

  // Handle input changes for new staff form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the staff
    console.log('Adding new staff:', newStaff);

    // Close the modal and reset form
    setShowAddModal(false);
    setNewStaff({
      id: '',
      name: '',
      department: 'Production',
      phone: '',
      position: '',
    });

    // For demo purposes, you could add to the local list
    // This would be replaced by API integration in a real app
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-[1440px]  mx-auto p-4 sm:p-6 w-full">
        {/* Header - Enhanced with theme styles */}
        <div className={`flex justify-between items-center mb-6 ${componentStyles.header} sticky top-0 z-10`}>
          <h1 className={typography.header}>Staff Payment Summary</h1>
          <button
            className={`${colors.secondary.light} px-4 py-2.5 ${borders.rounded} flex items-center gap-2 ${effects.transition}`}
            onClick={() => setShowAddModal(true)}
          >
            <IoPersonAddSharp className="text-lg" />
            Add Staff
          </button>
        </div>

        {/* Search and Actions Bar - Made sticky */}
        <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm sticky top-[80px] z-[5]">
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
            <button className={`px-4 py-2.5 border border-gray-300 ${borders.rounded} flex items-center gap-2 hover:bg-gray-50 ${effects.transition}`}>
              <FaFilter className="text-gray-600" />
              <span className={colors.primary.icon}>Filter</span>
            </button>
            <button className={`px-4 py-2.5 border border-gray-300 ${borders.rounded} flex items-center gap-2 ${colors.primary.icon} hover:bg-gray-50 ${effects.transition} font-medium`}>
              Bulk Actions
              <IoMdArrowDropdown />
            </button>
            <button className={`px-4 py-2.5 border border-gray-300 ${borders.rounded} ${colors.primary.icon} hover:bg-gray-50 ${effects.transition} font-medium`}>
              View Overall Report
            </button>
          </div>
        </div>

        {/* Staff List with scrollable content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {/* Select All - Made sticky */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 sticky z-[4]">
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

          {/* Department Header - Made sticky */}
          <div className="px-4 py-3 bg-blue-50 sticky z-[3]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-700">Production</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {staffList.length}
              </span>
            </div>
          </div>

          {/* Staff Items - Made scrollable */}
          <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
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

      {/* Add Staff Modal - Moved outside the main container div */}
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className={typography.subheader}>Add New Staff</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID</label>
                <input
                  type="text"
                  name="id"
                  value={newStaff.id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter staff ID"
                  required
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  name="department"
                  value={newStaff.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={newStaff.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={newStaff.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter position"
                />
              </div> */}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${colors.primary.button} text-white px-4 py-2 rounded-md`}
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;