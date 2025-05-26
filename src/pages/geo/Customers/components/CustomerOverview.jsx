import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaCalendarAlt, FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import Calendar from '../../../../component/Calendar';
import { format } from 'date-fns';

const CustomerOverview = () => {
  const [showCustomersFilter, setShowCustomersFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [customersFilter, setCustomersFilter] = useState('Customers Added');
  const [dateFilter, setDateFilter] = useState('Last 7 days');
  const [dateRange, setDateRange] = useState(format(new Date(), "dd MMM ''yy"));
  const [showCalendar, setShowCalendar] = useState(false);

  // Sample data for the chart
  const data = [
    { name: '15 May', customers: 10, served: 8 },
    { name: '16 May', customers: 10, served: 7 },
    { name: '17 May', customers: 12, served: 9 },
    { name: '18 May', customers: 0, served: 0 },
    { name: '19 May', customers: 14, served: 11 },
    { name: '20 May', customers: 16, served: 13 },
    { name: '21 May', customers: 9, served: 7 },
  ];

  // Custom tooltip component for hover effect
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-3 rounded-md shadow-lg">
          <p className="text-sm font-medium mb-1">Date: {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {entry.name === 'customers' ? 'Customers Added:' : 'Customers Served:'} {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    // Format the selected date
    const formattedDate = `${format(date, "dd MMM ''yy")}`;
    setDateRange(formattedDate);
    setShowCalendar(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full border border-gray-100">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">Customers Overview</h2>
              <div className="ml-2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" title="Shows customer activity trends">
                <FaInfoCircle size={14} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Number of Customers Added per Day</p>
          </div>
          <div className="flex space-x-2">
            {/* Customers Added dropdown */}
            <div className="relative">
              <button 
                className="flex items-center justify-between w-50 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setShowCustomersFilter(!showCustomersFilter)}
              >
                <span>{customersFilter}</span>
                <FaChevronDown className="ml-2 text-gray-500" />
              </button>
              
              {showCustomersFilter && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setCustomersFilter('Customers Added');
                        setShowCustomersFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Customers Added
                    </li>
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setCustomersFilter('Customers Served');
                        setShowCustomersFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-transparent mr-2"></div>
                      Customers Served
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
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
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 16]} ticks={[0, 4, 8, 12, 16]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Legend 
                wrapperStyle={{ paddingTop: 10 }}
                payload={[
                  { value: 'Customers Added', type: 'square', color: '#F3D1FE' },
                  { value: 'Customers Served', type: 'square', color: '#B3D1FF' }
                ]}
              />
              <Bar 
                dataKey="customers" 
                name="Customers Added"
                fill="#F3D1FE" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
              />
              <Bar 
                dataKey="served" 
                name="Customers Served"
                fill="#B3D1FF" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;