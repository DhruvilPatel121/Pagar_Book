import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaCalendarAlt, FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import Calendar from '../../../../component/Calendar';
import { format } from 'date-fns';

const OrdersOverview = () => {
  const [showOrdersFilter, setShowOrdersFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [ordersFilter, setOrdersFilter] = useState('Orders Received');
  const [dateFilter, setDateFilter] = useState('Last 7 days');
  const [dateRange, setDateRange] = useState(format(new Date(), "dd MMM ''yy"));
  const [showCalendar, setShowCalendar] = useState(false);

  // Sample data for the chart
  const data = [
    { name: '15 May', orders: 10, delivered: 8 },
    { name: '16 May', orders: 15, delivered: 12 },
    { name: '17 May', orders: 12, delivered: 10 },
    { name: '18 May', orders: 8, delivered: 7 },
    { name: '19 May', orders: 14, delivered: 11 },
    { name: '20 May', orders: 16, delivered: 14 },
    { name: '21 May', orders: 9, delivered: 8 },
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
              {entry.name === 'orders' ? 'Orders Received:' : 'Orders Delivered:'} {entry.value}
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
              <h2 className="text-xl font-semibold text-gray-800">Orders Overview</h2>
              <div className="ml-2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" title="Shows order activity trends">
                <FaInfoCircle size={14} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Number of Orders Received per Day</p>
          </div>
          <div className="flex space-x-2">
            {/* Orders Received dropdown */}
            <div className="relative">
              <button 
                className="flex items-center justify-between w-50 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setShowOrdersFilter(!showOrdersFilter)}
              >
                <span>{ordersFilter}</span>
                <FaChevronDown className="ml-2 text-gray-500" />
              </button>
              
              {showOrdersFilter && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <ul className="py-1">
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setOrdersFilter('Orders Received');
                        setShowOrdersFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Orders Received
                    </li>
                    <li 
                      className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        setOrdersFilter('Orders Delivered');
                        setShowOrdersFilter(false);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-transparent mr-2"></div>
                      Orders Delivered
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
                  { value: 'Orders Received', type: 'square', color: '#F3D1FE' },
                  { value: 'Orders Delivered', type: 'square', color: '#B3D1FF' }
                ]}
              />
              <Bar 
                dataKey="orders" 
                name="Orders Received"
                fill="#F3D1FE" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
              />
              <Bar 
                dataKey="delivered" 
                name="Orders Delivered"
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

export default OrdersOverview;