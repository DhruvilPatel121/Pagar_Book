import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft,  FaSave } from 'react-icons/fa';
import {  componentStyles, typography } from '../../theme.js';
import staffData from '../../data/staff.json';

function Fine() {
  const location = useLocation();
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [fineCounts, setFineCounts] = useState({});
  const [fineAmount, setFineAmount] = useState('');
  const [fineHours, setFineHours] = useState('00:12');
  const [fineReason, setFineReason] = useState('');
  const [fineType, setFineType] = useState('1x Salary');
  const [staffList, setStaffList] = useState([]);
  
  // Load staff data and fine counts from navigation state
  useEffect(() => {
    setStaffList(staffData);
    
    if (location.state) {
      if (location.state.selectedStaff) {
        setSelectedStaff(location.state.selectedStaff);
      }
      if (location.state.fineCounts) {
        setFineCounts(location.state.fineCounts);
      }
    }
  }, [location.state]);
  
  // Group fine entries by staff
  const getStaffFineEntries = () => {
    const staffWithFines = staffList.filter(staff => fineCounts[staff.id] && fineCounts[staff.id] > 0);
    
    return staffWithFines.map(staff => ({
      staff,
      fineCount: fineCounts[staff.id] || 0,
      // Generate sample entries based on fine count
      entries: Array.from({ length: fineCounts[staff.id] || 0 }, (_, i) => ({
        id: `${staff.id}-${i}`,
        date: new Date(Date.now() - i * 86400000).toISOString(), // One day apart
        hours: '00:12',
        fineType: '1x Salary',
        shift: 'PRODUCTION SHIFT'
      }))
    }));
  };
  
  const handleStaffSelection = (staffId) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter(id => id !== staffId));
    } else {
      setSelectedStaff([...selectedStaff, staffId]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedStaff.length === staffList.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(staffList.map(staff => staff.id));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementation for submitting fine data
    console.log({
      selectedStaff,
      fineAmount,
      fineHours,
      fineReason,
      fineType
    });
    // In a real app, you would send this data to your backend
    alert('Fine applied successfully!');
  };
  
  // Sample fine entries (in a real app, this would come from an API)
  const fineEntries = [
    { 
      id: 1, 
      date: '2025-05-13T10:23:09.683Z', 
      hours: '00:12', 
      fineType: '1x Salary', 
      shift: 'PRODUCTION SHIFT' 
    },
    { 
      id: 2, 
      date: '2025-05-12T10:37:34.031Z', 
      hours: '00:12', 
      fineType: '1x Salary', 
      shift: 'PRODUCTION SHIFT' 
    },
    { 
      id: 3, 
      date: '2025-05-03T14:18:58.660Z', 
      hours: '00:12', 
      fineType: '1x Salary', 
      shift: 'PRODUCTION SHIFT' 
    }
  ];
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0].replace(/-/g, '-');
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toTimeString().split(' ')[0];
  };
  
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white sticky top-0 z-30 p-4">
        <div className="flex justify-between items-center">
          <h1 className={typography.header}>Fine Management</h1>
        </div>
      </header>

      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <div className={componentStyles.finePage.container}>
          <div className={componentStyles.finePage.header}>
            <Link to="/attendance" className={componentStyles.finePage.backButton}>
              <FaArrowLeft className="mr-2" /> Back
            </Link>
            <h2 className={componentStyles.finePage.title}>Review Fines</h2>
          </div>
        </div>
        
        {/* Staff Fine Summary */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Staff Fine Summary</h3>
          
          {getStaffFineEntries().length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">
                  {getStaffFineEntries().length} staff member{getStaffFineEntries().length !== 1 ? 's' : ''} with fines
                </div>
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSelectedStaff([]);
                      // Clear fine counts for all staff
                      const clearedFineCounts = {};
                      Object.keys(fineCounts).forEach(id => {
                        clearedFineCounts[id] = 0;
                      });
                      setFineCounts(clearedFineCounts);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getStaffFineEntries().map(({ staff, fineCount }) => (
                  <div 
                    key={staff.id} 
                    className={`flex items-center p-3 border rounded-md transition-all cursor-pointer ${
                      selectedStaff.includes(staff.id) 
                        ? 'bg-purple-50 border-purple-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleStaffSelection(staff.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 overflow-hidden">
                      {staff.image ? (
                        <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-purple-800 font-medium">{staff.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{staff.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {staff.department || 'No Department'} 
                        {staff.shift && <span className="mx-1">•</span>}
                        {staff.shift}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium text-sm">
                        {fineCount} {fineCount === 1 ? 'Fine' : 'Fines'}
                      </div>
                      {fineCount > 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Last: {formatDate(new Date().toISOString())}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-gray-400 text-2xl">!</span>
              </div>
              <h4 className="text-gray-700 font-medium mb-1">No Fines Applied</h4>
              <p className="text-gray-500 text-sm max-w-md">
                No staff members have been marked with fines. Return to the attendance page to apply fines.
              </p>
              <Link 
                to="/attendance" 
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Go to Attendance
              </Link>
            </div>
          )}
        </div>
        
        {/* Fine entries list */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Fine Details</h3>
          
          {getStaffFineEntries().length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {getStaffFineEntries().map(({ staff, entries }) => (
                <div key={staff.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 overflow-hidden">
                        {staff.image ? (
                          <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-purple-800 font-medium">{staff.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="font-medium text-gray-800">{staff.name}</div>
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium text-sm">
                      {entries.length} {entries.length === 1 ? 'Fine' : 'Fines'}
                    </div>
                  </div>
                  
                  {entries.map((entry, index) => (
                    <div key={entry.id} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                        <div className="text-gray-700">
                          <span className="font-medium">in:</span> {formatTime(entry.date).substring(0, 5)} 
                          <span className="mx-2 font-medium">out:</span> {formatTime(new Date(new Date(entry.date).getTime() + 12*60*60*1000)).substring(0, 5)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-700">{formatDate(entry.date)}</div>
                          <div className="text-sm text-purple-600">{entry.shift}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Hours</label>
                          <div className="flex">
                            <input 
                              type="text" 
                              value={entry.hours} 
                              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-300"
                              readOnly
                            />
                            <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-2 flex items-center text-gray-600">
                              hrs
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Fine Amount</label>
                          <select 
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-300"
                            value={entry.fineType}
                            readOnly
                          >
                            <option>1x Salary</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Per Hour</label>
                          <div className="flex">
                            <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-2 flex items-center text-gray-600">
                              ₹
                            </span>
                            <input 
                              type="text" 
                              defaultValue={(staff.salary || 100) / 8}
                              className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-purple-300"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <button className={componentStyles.finePage.saveButton}>
                          <FaSave className="mr-1" /> Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-500">No fine entries available. Select staff members to apply fines.</p>
            </div>
          )}
        </div>
        
        {/* New fine form */}
        <form onSubmit={handleSubmit} className={componentStyles.finePage.form}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={componentStyles.finePage.formGroup}>
              <label className={componentStyles.finePage.label}>
                Fine Hours
              </label>
              <div className="flex">
                <input
                  type="text"
                  className={componentStyles.finePage.input}
                  value={fineHours}
                  onChange={(e) => setFineHours(e.target.value)}
                  placeholder="HH:MM (e.g. 01:30)"
                  required
                />
                <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center text-gray-600">
                  hrs
                </span>
              </div>
            </div>
            
            <div className={componentStyles.finePage.formGroup}>
              <label className={componentStyles.finePage.label}>
                Fine Amount
              </label>
              <select
                className={componentStyles.finePage.select}
                value={fineType}
                onChange={(e) => setFineType(e.target.value)}
                required
              >
                <option value="1x Salary">1x Salary</option>
                <option value="2x Salary">2x Salary</option>
                <option value="Fixed Amount">Fixed Amount</option>
              </select>
            </div>
            
            <div className={componentStyles.finePage.formGroup}>
              <label className={componentStyles.finePage.label}>
                Per Hour
              </label>
              <div className="flex">
                <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-3 flex items-center text-gray-600">
                  ₹
                </span>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  value={fineAmount}
                  onChange={(e) => setFineAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
          
          <div className={componentStyles.finePage.buttonGroup}>
            <Link to="/attendance" className={componentStyles.finePage.cancelButton}>
              Cancel
            </Link>
            <button type="submit" className={componentStyles.finePage.submitButton}>
              Apply Fine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Fine;