import React, { useState } from 'react';
import { FaCalendarAlt, FaChevronDown, FaDownload, FaSearch } from 'react-icons/fa';
import Calendar from '../../../../component/Calendar';
import { format } from 'date-fns';

const CustomersServedSummary = () => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState('Last 7 days');
  const [dateRange, setDateRange] = useState(format(new Date(), "dd MMM ''yy"));
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    const formattedDate = format(date, "dd MMM ''yy");
    setDateRange(formattedDate);
    setShowCalendar(false);
  };

  // Sample data for the customers summary
  const customersData = [
    { name: 'machine words', taskCount: 2, avgTasksPerDay: 0.29, totalDuration: '0 min', avgDuration: '0 min', totalForm: 0 },
    { name: 'Baring manufacturing company', taskCount: 2, avgTasksPerDay: 0.29, totalDuration: '0 min', avgDuration: '0 min', totalForm: 0 },
    { name: 'pratap engineering', taskCount: 2, avgTasksPerDay: 0.29, totalDuration: '0 min', avgDuration: '0 min', totalForm: 0 },
    { name: 'capiq engineering pvt ltd', taskCount: 3, avgTasksPerDay: 0.43, totalDuration: '0 min', avgDuration: '0 min', totalForm: 0 },
    { name: 'shree om engineering', taskCount: 2, avgTasksPerDay: 0.29, totalDuration: '0 min', avgDuration: '0 min', totalForm: 0 },
    { name: 'shree Ram industries', taskCount: 2, avgTasksPerDay: 0.29, totalDuration: '1 min', avgDuration: '0 min', totalForm: 0 },
    { name: 'yesh electric pvt ltd', taskCount: 1, avgTasksPerDay: 0.14, totalDuration: '0 min', avgDuration: '0 min', totalForm: 0 },
  ];

  // Filter customers based on search term
  const filteredCustomers = customersData.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Customers Served Summary</h2>
          <p className="text-sm text-gray-600">See the details of customers served in a time frame along with task metrics</p>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-3">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Date range dropdown */}
            <div className="relative">
              <button 
                className="flex items-center justify-between w-32 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setShowDateFilter(!showDateFilter)}
              >
                <span>{dateFilter}</span>
                <FaChevronDown className="ml-2 text-gray-500" />
              </button>
              
              {showDateFilter && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setDateFilter('Last 7 days');
                        setShowDateFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Last 7 days
                    </li>
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setDateFilter('Last 30 days');
                        setShowDateFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-transparent mr-2"></div>
                      Last 30 days
                    </li>
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setDateFilter('Custom');
                        setShowDateFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-transparent mr-2"></div>
                      Custom
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Date picker with Calendar */}
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span>{dateRange}</span>
                <FaCalendarAlt className="ml-2 text-gray-500" />
              </button>
              
              {showCalendar && (
                <Calendar 
                  onSelect={handleDateSelect} 
                  onClose={() => setShowCalendar(false)} 
                />
              )}
            </div>
            
            {/* Download button */}
            <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <FaDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto mt-2 rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Count
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg No of Task/Day
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Form
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                        {customer.taskCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.avgTasksPerDay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalDuration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.avgDuration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalForm}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No customers found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (simplified) */}
        <div className="flex justify-between items-center pt-3">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{customersData.length}</span> customers
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-50 text-blue-600 font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersServedSummary;