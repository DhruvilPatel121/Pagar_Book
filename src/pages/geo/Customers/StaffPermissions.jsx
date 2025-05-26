import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaSave, FaFilter, FaTimes } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const StaffPermissions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectionMode, setSelectionMode] = useState('all'); // 'all', 'none', or 'select'
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    salaryType: '',
    shift: '',
    department: '',
    groupBy: ''
  });
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'HIREN BARIYA', employeeId: '1038', phone: '7600767549', selected: true, category: 'Monthly', department: 'Production', shift: 'PRODUCTION SHIFT' },
    { id: 2, name: 'RAUNAKBHAI TANNA', employeeId: '1035', phone: '8401258397', selected: true, category: 'Monthly', department: 'Sales', shift: 'SALES SHIFT' },
    { id: 3, name: 'ARJUN PATEL', employeeId: '1042', phone: '9876543210', selected: false, category: 'Daily', department: 'Production', shift: 'PRODUCTION SHIFT' },
    { id: 4, name: 'RAHUL SHARMA', employeeId: '1044', phone: '8765432109', selected: false, category: 'Daily', department: 'Sales', shift: 'SALES SHIFT' },
    { id: 5, name: 'PRIYA PATEL', employeeId: '1046', phone: '7654321098', selected: false, category: 'Weekly', department: 'Unassigned', shift: 'PRODUCTION SHIFT' },
  ]);

  // Handle selection mode change
  const handleSelectionModeChange = (mode) => {
    setSelectionMode(mode);
    
    // Update staff selection based on mode
    if (mode === 'all') {
      setStaffList(staffList.map(staff => ({ ...staff, selected: true })));
    } else if (mode === 'none') {
      setStaffList(staffList.map(staff => ({ ...staff, selected: false })));
    }
    // For 'select', we don't change anything automatically
  };

  const toggleStaffSelection = (id) => {
    // Only allow toggling in 'select' mode
    if (selectionMode === 'select') {
      setStaffList(staffList.map(staff => 
        staff.id === id ? { ...staff, selected: !staff.selected } : staff
      ));
    }
  };

  const filteredStaff = staffList.filter(staff => {
    // First apply search filter
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeId.includes(searchQuery) ||
      staff.phone.includes(searchQuery);
    
    // Then apply other filters
    const matchesSalaryType = !filters.salaryType || staff.category === filters.salaryType;
    const matchesShift = !filters.shift || staff.shift === filters.shift;
    const matchesDepartment = !filters.department || staff.department === filters.department;
    
    return matchesSearch && matchesSalaryType && matchesShift && matchesDepartment;
  });

  // Group staff by category or department based on groupBy filter
  const groupedStaff = filteredStaff.reduce((acc, staff) => {
    const groupKey = filters.groupBy === 'Department' ? staff.department : 
                    filters.groupBy === 'Shift Template' ? staff.shift : 
                    filters.groupBy === 'Salary Type' ? staff.category : 
                    'All Staff';
    
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(staff);
    return acc;
  }, {});

  const handleApplyFilter = () => {
    setShowFilterModal(false);
  };

  const handleClearFilter = () => {
    setFilters({
      salaryType: '',
      shift: '',
      department: '',
      groupBy: ''
    });
    setShowFilterModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      <button 
        onClick={() => navigate('/geo/customers/settings')} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Staff who can add customers</h1>
        <p className="text-sm text-gray-600 mt-1">Select staff who will be able to add customers to Geo.</p>
      </div>

      {/* Selection Mode Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => handleSelectionModeChange('all')}
          className={`flex items-center px-6 py-2 border rounded-md transition-colors ${
            selectionMode === 'all' 
              ? 'border-blue-500 text-blue-600 bg-blue-50' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
            selectionMode === 'all' ? 'border-blue-500' : 'border-gray-400'
          }`}>
            {selectionMode === 'all' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
          </div>
          All
        </button>
        
        <button
          onClick={() => handleSelectionModeChange('none')}
          className={`flex items-center px-6 py-2 border rounded-md transition-colors ${
            selectionMode === 'none' 
              ? 'border-blue-500 text-blue-600 bg-blue-50' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
            selectionMode === 'none' ? 'border-blue-500' : 'border-gray-400'
          }`}>
            {selectionMode === 'none' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
          </div>
          None
        </button>
        
        <button
          onClick={() => handleSelectionModeChange('select')}
          className={`flex items-center px-6 py-2 border rounded-md transition-colors ${
            selectionMode === 'select' 
              ? 'border-blue-500 text-blue-600 bg-blue-50' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
            selectionMode === 'select' ? 'border-blue-500' : 'border-gray-400'
          }`}>
            {selectionMode === 'select' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
          </div>
          Select Staff
        </button>
      </div>

      {/* Staff List Table - Only show when Select Staff is selected */}
      {selectionMode === 'select' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search by name or staff ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              onClick={() => setShowFilterModal(true)}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              <FaFilter className="mr-2" /> Filter
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
            <div>Name</div>
            <div>Employee ID</div>
            <div>Phone Number</div>
            <div>Has access to add customer</div>
          </div>

          {/* Table Content */}
          <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
            {Object.entries(groupedStaff).length > 0 ? (
              Object.entries(groupedStaff).map(([category, staffs]) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="sticky top-0 px-4 py-2 bg-blue-50 border-b border-gray-200 text-sm font-medium text-gray-700 z-10">
                    {category} ({staffs.length})
                  </div>
                  
                  {/* Staff Rows */}
                  {staffs.map(staff => (
                    <div 
                      key={staff.id}
                      className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{staff.name}</div>
                      <div className="text-gray-700">{staff.employeeId}</div>
                      <div className="text-gray-700">{staff.phone}</div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={staff.selected}
                            onChange={() => toggleStaffSelection(staff.id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 
                            peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                            after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-blue-600">
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No staff members match your search or filter criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm backdrop-opacity-90  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Filter By</h2>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Salary Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Type</label>
                <div className="relative">
                  <select
                    value={filters.salaryType}
                    onChange={(e) => setFilters({...filters, salaryType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select salary type</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Work Basis">Work Basis</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Monthly Regular">Monthly Regular</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Shifts Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shifts</label>
                <div className="relative">
                  <select
                    value={filters.shift}
                    onChange={(e) => setFilters({...filters, shift: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select Shift</option>
                    <option value="PRODUCTION SHIFT">PRODUCTION SHIFT</option>
                    <option value="SALES SHIFT">SALES SHIFT</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <div className="relative">
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Select a Department</option>
                    <option value="Unassigned">Unassigned</option>
                    <option value="Production">Production</option>
                    <option value="Sales">Sales</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Group By Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
                <div className="relative">
                  <select
                    value={filters.groupBy}
                    onChange={(e) => setFilters({...filters, groupBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Group by</option>
                    <option value="Salary Type">Salary Type</option>
                    <option value="Shift Template">Shift Template</option>
                    <option value="Department">Department</option>
                    <option value="None">None</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex p-4 border-t">
              <button
                onClick={handleClearFilter}
                className="flex-1 px-4 py-2 border border-gray-300 text-blue-600 rounded-md mr-2 hover:bg-gray-50 transition-colors"
              >
                Clear Filter
              </button>
              <button
                onClick={handleApplyFilter}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="fixed bottom-0 left-83 right-7 bg-white rounded-xl border-t border-gray-200 p-4 flex justify-end z-10">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-gray-600">
            {staffList.filter(s => s.selected).length} staff members selected
          </div>
          <button
            onClick={() => {
              // Save logic here
              setTimeout(() => navigate('/geo/customers/settings'), 500);
            }}
            className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffPermissions;