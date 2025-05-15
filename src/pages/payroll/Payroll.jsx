import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFileAlt, FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { colors, componentStyles, typography, spacing, borders, effects } from '../../theme.js';

// Sample mock data
const mockEmployees = [
  { id: 'EMP001', name: 'Rahul Sharma', basicSalary: 25000, hra: 5000, overtimeHours: 12, overtimePay: 3600, totalPay: 33600, status: 'Paid' },
  { id: 'EMP002', name: 'Priya Patel', basicSalary: 28000, hra: 5600, overtimeHours: 8, overtimePay: 2800, totalPay: 36400, status: 'Pending' },
  { id: 'EMP003', name: 'Amit Kumar', basicSalary: 30000, hra: 6000, overtimeHours: 5, overtimePay: 1875, totalPay: 37875, status: 'Paid' },
  { id: 'EMP004', name: 'Deepika Singh', basicSalary: 22000, hra: 4400, overtimeHours: 15, overtimePay: 4125, totalPay: 30525, status: 'Paid' },
  { id: 'EMP005', name: 'Vikram Malhotra', basicSalary: 35000, hra: 7000, overtimeHours: 0, overtimePay: 0, totalPay: 42000, status: 'Pending' },
  { id: 'EMP006', name: 'Neha Gupta', basicSalary: 27000, hra: 5400, overtimeHours: 10, overtimePay: 3375, totalPay: 35775, status: 'Paid' },
  { id: 'EMP007', name: 'Rajesh Verma', basicSalary: 24000, hra: 4800, overtimeHours: 6, overtimePay: 1800, totalPay: 30600, status: 'Paid' },
  { id: 'EMP008', name: 'Ananya Reddy', basicSalary: 32000, hra: 6400, overtimeHours: 4, overtimePay: 1600, totalPay: 40000, status: 'Pending' },
  { id: 'EMP009', name: 'Sanjay Joshi', basicSalary: 29000, hra: 5800, overtimeHours: 9, overtimePay: 3262.5, totalPay: 38062.5, status: 'Paid' },
  { id: 'EMP010', name: 'Meera Kapoor', basicSalary: 26000, hra: 5200, overtimeHours: 7, overtimePay: 2275, totalPay: 33475, status: 'Paid' }
];

function Payroll() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  
  // Replace single showCalendar with two separate state hooks
  const [isFromCalendarOpen, setFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setToCalendarOpen] = useState(false);
  
  const [calendarType, setCalendarType] = useState('from');
  
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

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Calculate summary data
  const totalEmployees = filteredEmployees.length;
  const totalPayrollAmount = filteredEmployees.reduce((sum, emp) => sum + emp.totalPay, 0);
  const totalOvertimePay = filteredEmployees.reduce((sum, emp) => sum + emp.overtimePay, 0);

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Navigate date
  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();

    const filtered = mockEmployees.filter(emp =>
      emp.name.toLowerCase().includes(query) ||
      emp.id.toLowerCase().includes(query)
    );

    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle date filter
  const handleDateFilter = () => {
    // In a real app, you would filter based on fromDate and toDate
    // For this mock, we'll just use the original data
    setFilteredEmployees(mockEmployees);
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
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calendar component
  const Calendar = () => {
    const [viewDate, setViewDate] = useState(new Date(currentDate));

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleDateClick = (day) => {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

      if (calendarType === 'from') {
        const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setFromDate(formattedDate);
      } else {
        const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setToDate(formattedDate);
      }

      setCurrentDate(newDate);
      setShowCalendar(false);
    };

    const changeMonth = (increment) => {
      const newDate = new Date(viewDate);
      newDate.setMonth(viewDate.getMonth() + increment);
      setViewDate(newDate);
    };

    return (
      <div className={componentStyles.calendar.container}>
        <div className={componentStyles.calendar.header}>
          <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(-1)}>←</button>
          <div className={componentStyles.calendar.monthYear}>
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
          <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(1)}>→</button>
        </div>

        <div className={componentStyles.calendar.daysGrid}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
            <div key={i} className={componentStyles.calendar.dayLabel}>{day}</div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className={componentStyles.calendar.emptyDay}>.</div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isCurrentDay =
              day === currentDate.getDate() &&
              viewDate.getMonth() === currentDate.getMonth() &&
              viewDate.getFullYear() === currentDate.getFullYear();

            const isToday =
              day === new Date().getDate() &&
              viewDate.getMonth() === new Date().getMonth() &&
              viewDate.getFullYear() === new Date().getFullYear();

            let className = componentStyles.calendar.dayButton;
            if (isCurrentDay) {
              className = `${className} ${componentStyles.calendar.currentDay}`;
            } else if (isToday) {
              className = `${className} ${componentStyles.calendar.selectedDay}`;
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

        <div className="flex justify-between mt-2 px-2">
          <button
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={() => {
              if (calendarType === 'from') {
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
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={() => {
              const today = new Date();
              const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              if (calendarType === 'from') {
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

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <header className={componentStyles.header}>
        <div className="flex justify-between items-center">
          <h1 className={typography.header}>Payroll</h1>
        </div>
      </header>

      <div className={componentStyles.pageContainer || "overflow-y-auto h-[calc(100vh-64px)]"}>
        {/* Filter Bar */}
        <div className="bg-white p-4 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex items-center">
                {/* From Date Picker */}
                <div className={`flex items-center ${spacing.smallGap}`} ref={fromCalendarRef}>
                  <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
                    <FaChevronLeft />
                  </button>
                  <div className={`flex items-center ${spacing.smallGap} ${typography.normal} relative`}>
                    <span>{fromDate ? new Date(fromDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}</span>
                    <div 
                      onClick={() => {
                        setFromCalendarOpen(prev => !prev);
                        setToCalendarOpen(false);
                        setCalendarType('from');
                      }} 
                      className={componentStyles.calendarButton}
                    >
                      <FaCalendarAlt className={colors.primary.icon} />
                    </div>
                    {isFromCalendarOpen && <Calendar calendarType="from" />}
                  </div>
                  <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton}>
                    <FaChevronRight />
                  </button>
                </div>

                <span className="mx-2 text-lg font-medium">to</span>

                {/* To Date Picker */}
                <div className={`flex items-center ${spacing.smallGap}`} ref={toCalendarRef}>
                  <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
                    <FaChevronLeft />
                  </button>
                  <div className={`flex items-center ${spacing.smallGap} ${typography.normal} relative`}>
                    <span>{toDate ? new Date(toDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}</span>
                    <div 
                      onClick={() => {
                        setToCalendarOpen(prev => !prev);
                        setFromCalendarOpen(false);
                        setCalendarType('to');
                      }} 
                      className={componentStyles.calendarButton}
                    >
                      <FaCalendarAlt className={colors.primary.icon} />
                    </div>
                    {isToCalendarOpen && <Calendar calendarType="to" />}
                  </div>
                  <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton}>
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              {/* Search input remains the same... */}
            </div>

            {/* Generate Report button remains the same... */}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Employees</h3>
            <p className="text-2xl font-bold text-gray-800">{totalEmployees}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Payroll Amount</h3>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalPayrollAmount)}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Overtime Pay</h3>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalOvertimePay)}</p>
          </div>
        </div>

        {/* Payroll Table */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      HRA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overtime hrs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overtime pay
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Pay
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(employee.basicSalary)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(employee.hra)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.overtimeHours}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(employee.overtimePay)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(employee.totalPay)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <Link to={`/payroll/${employee.id}`} className="text-blue-600 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 flex items-center justify-between border-t">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">
                      {indexOfLastItem > filteredEmployees.length ? filteredEmployees.length : indexOfLastItem}
                    </span>{' '}
                    of <span className="font-medium">{filteredEmployees.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border ${currentPage === i + 1
                          ? 'z-10 bg-blue-500 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          } text-sm font-medium`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages
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
    </div>
  );
}


export default Payroll;
