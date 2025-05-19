import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaFileAlt, FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { colors, componentStyles, typography, spacing } from '../theme.js';

function Reports() {
  // State for date filters
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFromCalendarOpen, setFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setToCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for reports
  const mockReports = [
    { id: 'REP001', name: 'Monthly Payroll Summary', date: '2023-01-15', type: 'Payroll', status: 'Completed' },
    { id: 'REP002', name: 'Attendance Analysis', date: '2023-01-10', type: 'Attendance', status: 'Completed' },
    { id: 'REP003', name: 'Employee Performance', date: '2023-01-05', type: 'Performance', status: 'Pending' },
    { id: 'REP004', name: 'Overtime Report', date: '2022-12-28', type: 'Payroll', status: 'Completed' },
    { id: 'REP005', name: 'Leave Summary', date: '2022-12-20', type: 'Attendance', status: 'Completed' },
    { id: 'REP006', name: 'Tax Deductions', date: '2022-12-15', type: 'Payroll', status: 'Pending' },
    { id: 'REP007', name: 'Department Expenses', date: '2022-12-10', type: 'Finance', status: 'Completed' },
    { id: 'REP008', name: 'Recruitment Costs', date: '2022-12-05', type: 'HR', status: 'Completed' },
  ];
  
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  
  // Refs for calendar dropdowns
  const fromCalendarRef = useRef(null);
  const toCalendarRef = useRef(null);
  
  // Close calendars when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (fromCalendarRef.current && !fromCalendarRef.current.contains(event.target)) {
        setFromCalendarOpen(false);
      }
      if (toCalendarRef.current && !toCalendarRef.current.contains(event.target)) {
        setToCalendarOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    
    const filtered = mockReports.filter(report =>
      report.name.toLowerCase().includes(query) ||
      report.id.toLowerCase().includes(query) ||
      report.type.toLowerCase().includes(query)
    );
    
    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Handle date filter
  const handleDateFilter = () => {
    // In a real app, you would filter based on fromDate and toDate
    // For this mock, we'll just use the original data
    setFilteredReports(mockReports);
  };
  
  // Report action handlers
  const handleViewReport = (reportId) => {
    // Find the report to view
    const reportToView = filteredReports.find(report => report.id === reportId);
    
    // In a real app, this would open a modal or navigate to a detail page
    // For now, we'll create a temporary element to display report details
    const reportDetails = document.createElement('div');
    reportDetails.className = 'fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50';
    reportDetails.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-xl font-bold mb-4">Report Details: ${reportToView.id}</h2>
        <div class="mb-4">
          <p class="text-sm text-gray-500">Name</p>
          <p class="font-medium">${reportToView.name}</p>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">Date Generated</p>
          <p class="font-medium">${formatDate(reportToView.date)}</p>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">Type</p>
          <p class="font-medium">${reportToView.type}</p>
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-500">Status</p>
          <p class="font-medium">${reportToView.status}</p>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
      </div>
    `;
    
    document.body.appendChild(reportDetails);
    
    // Add event listener to close the modal
    reportDetails.querySelector('button').addEventListener('click', () => {
      document.body.removeChild(reportDetails);
    });
    
    // Also close when clicking outside the modal
    reportDetails.addEventListener('click', (e) => {
      if (e.target === reportDetails) {
        document.body.removeChild(reportDetails);
      }
    });
  };
  
  const handleDownloadReport = (reportId) => {
    // Find the report to download
    const reportToDownload = filteredReports.find(report => report.id === reportId);
    
    // Create a blob with report data (in a real app, this would be the actual report content)
    const reportContent = `
Report ID: ${reportToDownload.id}
Name: ${reportToDownload.name}
Date Generated: ${formatDate(reportToDownload.date)}
Type: ${reportToDownload.type}
Status: ${reportToDownload.status}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${reportToDownload.id}_${reportToDownload.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };
  
  const handleDeleteReport = (reportId) => {
    // Create a confirmation dialog
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50';
    confirmDialog.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-6">Are you sure you want to delete report ${reportId}? This action cannot be undone.</p>
        <div class="flex justify-end space-x-4">
          <button class="cancel-btn px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Cancel</button>
          <button class="confirm-btn px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(confirmDialog);
    
    // Add event listeners
    confirmDialog.querySelector('.cancel-btn').addEventListener('click', () => {
      document.body.removeChild(confirmDialog);
    });
    
    confirmDialog.querySelector('.confirm-btn').addEventListener('click', () => {
      // Remove the report from the filtered list
      const updatedReports = filteredReports.filter(report => report.id !== reportId);
      setFilteredReports(updatedReports);
      
      // Show a toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg';
      toast.innerText = `Report ${reportId} has been deleted`;
      document.body.appendChild(toast);
      
      // Remove the confirmation dialog
      document.body.removeChild(confirmDialog);
      
      // Remove the toast after 3 seconds
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 3000);
    });
    
    // Close when clicking outside
    confirmDialog.addEventListener('click', (e) => {
      if (e.target === confirmDialog) {
        document.body.removeChild(confirmDialog);
      }
    });
  };
  
  // Pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Add current date state for navigation
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Navigate date
  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Calendar component
  const Calendar = ({ type }) => {
    const [viewDate, setViewDate] = useState(new Date(currentDate));
    
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const handleDateClick = (day) => {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      if (type === 'from') {
        setFromDate(formattedDate);
        setFromCalendarOpen(false);
      } else {
        setToDate(formattedDate);
        setToCalendarOpen(false);
      }
      
      setCurrentDate(newDate);
    };
    
    const changeMonth = (increment) => {
      const newDate = new Date(viewDate);
      newDate.setMonth(viewDate.getMonth() + increment);
      setViewDate(newDate);
    };
    
    return (
      <div className={componentStyles.calendar?.container || "absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-50 w-64"}>
        <div className={componentStyles.calendar?.header || "bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-md"}>
          <button className={componentStyles.calendar?.navButton || "text-white hover:text-gray-200"} onClick={() => changeMonth(-1)}>
            <FaChevronLeft />
          </button>
          <div className={componentStyles.calendar?.monthYear || "font-medium"}>
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
          <button className={componentStyles.calendar?.navButton || "text-white hover:text-gray-200"} onClick={() => changeMonth(1)}>
            <FaChevronRight />
          </button>
        </div>
        
        <div className="p-2">
          <div className={componentStyles.calendar?.daysGrid || "grid grid-cols-7 gap-1 mb-1"}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
              <div key={i} className={componentStyles.calendar?.dayLabel || "text-center text-xs font-medium text-gray-500 py-1"}>
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className={componentStyles.calendar?.emptyDay || "h-8"}></div>
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const today = new Date();
              
              const isCurrentDay =
                day === currentDate.getDate() &&
                viewDate.getMonth() === currentDate.getMonth() &&
                viewDate.getFullYear() === currentDate.getFullYear();
                
              const isToday =
                day === today.getDate() && 
                viewDate.getMonth() === today.getMonth() && 
                viewDate.getFullYear() === today.getFullYear();
              
              let className = componentStyles.calendar?.dayButton || "h-8 w-full rounded-full flex items-center justify-center text-sm hover:bg-gray-100";
              if (isCurrentDay) {
                className = `${className} ${componentStyles.calendar?.currentDay || "bg-blue-500 text-white font-medium"}`;
              } else if (isToday) {
                className = `${className} ${componentStyles.calendar?.selectedDay || "bg-blue-100 text-blue-600 font-medium"}`;
              }
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={className}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="border-t p-2 flex justify-between">
          <button 
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => {
              if (type === 'from') {
                setFromDate('');
                setFromCalendarOpen(false);
              } else {
                setToDate('');
                setToCalendarOpen(false);
              }
            }}
          >
            Clear
          </button>
          <button 
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => {
              const today = new Date();
              const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              if (type === 'from') {
                setFromDate(formattedDate);
                setFromCalendarOpen(false);
              } else {
                setToDate(formattedDate);
                setToCalendarOpen(false);
              }
            }}
          >
            Today
          </button>
        </div>
      </div>
    );
  };
  
  // Summary data
  const totalReports = filteredReports.length;
  const completedReports = filteredReports.filter(report => report.status === 'Completed').length;
  const pendingReports = filteredReports.filter(report => report.status === 'Pending').length;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 shadow-lg rounded-lg sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className={typography.header}>Reports</h1>
          <button className={componentStyles.primaryButton || "px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors flex items-center"}>
            <FaFileAlt className="mr-2" />
            <span>Create New Report</span>
          </button>
        </div>
      </header>

      <div className={componentStyles.pageContainer || "overflow-y-auto h-[calc(100vh-64px)]"}>
        {/* Filter Bar */}
        <div className="bg-white p-4 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex items-center">
                {/* From Date Picker */}
                <div className={`flex items-center ${spacing.smallGap || 'gap-2'}`} ref={fromCalendarRef}>
                  <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton || "p-2 text-gray-500 hover:text-blue-600"}>
                    <FaChevronLeft />
                  </button>
                  <div className={`flex items-center ${spacing.smallGap || 'gap-2'} ${typography.normal || 'text-sm'} relative`}>
                    <span>{fromDate ? formatDate(fromDate) : 'From Date'}</span>
                    <div
                      onClick={() => {
                        setFromCalendarOpen(prev => !prev);
                        setToCalendarOpen(false);
                      }}
                      className={componentStyles.calendarButton || "cursor-pointer p-1 hover:bg-gray-100 rounded-full"}
                    >
                      <FaCalendarAlt className={colors.primary.icon || "text-blue-500"} />
                    </div>
                    {isFromCalendarOpen && <Calendar type="from" />}
                  </div>
                  <span className="mx-2 text-lg font-medium">to</span>
                </div>

                {/* To Date Picker */}
                <div className={`flex items-center ${spacing.smallGap || 'gap-2'}`} ref={toCalendarRef}>
                  <div className={`flex items-center ${spacing.smallGap || 'gap-2'} ${typography.normal || 'text-sm'} relative`}>
                    <span>{toDate ? formatDate(toDate) : 'To Date'}</span>
                    <div
                      onClick={() => {
                        setToCalendarOpen(prev => !prev);
                        setFromCalendarOpen(false);
                      }}
                      className={componentStyles.calendarButton || "cursor-pointer p-1 hover:bg-gray-100 rounded-full"}
                    >
                      <FaCalendarAlt className={colors.primary.icon || "text-blue-500"} />
                    </div>
                    {isToCalendarOpen && <Calendar type="to" />}
                  </div>
                  <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton || "p-2 text-gray-500 hover:text-blue-600"}>
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              <div className="relative flex-grow">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className={componentStyles.searchInput || "pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"}
                  placeholder="Search reports by name or ID"
                  value={searchQuery}
                  onChange={handleSearch}
                  aria-label="Search reports"
                />
              </div>
            </div>

            <button
              className={componentStyles.primaryButton || "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"}
              onClick={handleDateFilter}
              aria-label="Generate Report"
            >
              <FaFileAlt className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Reports</h3>
            <p className="text-2xl font-bold text-gray-800">{totalReports}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Completed Reports</h3>
            <p className="text-2xl font-bold text-green-600">{completedReports}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Reports</h3>
            <p className="text-2xl font-bold text-yellow-600">{pendingReports}</p>
          </div>
        </div>

        {/* Reports Table */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((report, index) => (
                    <tr key={report.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          report.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewReport(report.id)} 
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleDownloadReport(report.id)} 
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Download
                        </button>
                        <button 
                          onClick={() => handleDeleteReport(report.id)} 
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination - Mobile */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:hidden">
              <div className="flex-1 flex justify-between">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
            
            {/* Pagination - Desktop */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between px-4 py-3 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredReports.length ? filteredReports.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredReports.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {/* Page numbers would go here in a real implementation */}
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;