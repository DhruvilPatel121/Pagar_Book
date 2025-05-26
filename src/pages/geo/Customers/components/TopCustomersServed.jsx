import React, { useState } from 'react';
import { FaCalendarAlt, FaChevronDown, FaInfoCircle, FaEllipsisV, FaExternalLinkAlt } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from '../../../../component/Calendar';
import { format } from 'date-fns';

const TopCustomersServed = () => {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [dateFilter, setDateFilter] = useState('Last 7 days');
  const [dateRange, setDateRange] = useState(format(new Date(), "dd MMM ''yy"));
  const [showCalendar, setShowCalendar] = useState(false);

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    const formattedDate = format(date, "dd MMM ''yy");
    setDateRange(formattedDate);
    setShowCalendar(false);
  };

  // Sample data for the customers
  const customersData = [
    { name: 'capiq engineering pvt ltd', tasks: 3 },
    { name: 'Baring manufacturing', tasks: 2 },
    { name: 'pratap engineering', tasks: 2 },
    { name: 'machine words', tasks: 2 },
    { name: 'shree om engineering', tasks: 2 },
    { name: 'shree Ram industries', tasks: 2 },
    { name: 'yesh electric pvt ltd', tasks: 1 },
  ];

  // Custom tooltip component for Recharts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-3 rounded-md shadow-lg">
          <p className="text-sm font-medium">Customer Name: {payload[0].payload.name}</p>
          <p className="text-sm font-medium">Total Tasks: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Top Customers Served</h2>
            <div className="ml-2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" title="Shows customers with the most tasks">
              <FaInfoCircle size={14} />
            </div>
          </div>
          <p className="text-sm text-gray-600">See the number of tasks performed against customers</p>
        </div>
        <div className="flex space-x-2">
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
          
          {/* More options dropdown */}
          <div className="relative">
            <button 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
            >
              <FaEllipsisV />
            </button>
            
            {showMoreOptions && (
              <div className="absolute z-20 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-48">
                <ul className="py-1">
                  <li 
                    className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setShowMoreOptions(false);
                    }}
                  >
                    <FaExternalLinkAlt className="mr-2 text-gray-500" size={12} />
                    View Full Report
                  </li>
                  <li 
                    className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setShowMoreOptions(false);
                    }}
                  >
                    <svg className="mr-2 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add to Dashboard
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Recharts horizontal bar chart */}
      <div className="mt-6" style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={customersData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              axisLine={false} 
              tickLine={false}
              domain={[0, 'dataMax + 1']}
              tickCount={4}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={150}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Bar 
              dataKey="tasks" 
              fill="#e6f0ff" 
              stroke="#b3d1ff"
              barSize={30}
              radius={[0, 4, 4, 0]}
              label={{ 
                position: 'right', 
                fill: '#666', 
                fontSize: 12, 
                fontWeight: 'bold',
                formatter: (value) => `${value} ${value === 1 ? 'task' : 'tasks'}`
              }}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCustomersServed;