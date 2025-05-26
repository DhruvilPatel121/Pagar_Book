import React from 'react';
import DashboardCard from './components/DashboardCard';
import CustomerOverview from './components/CustomerOverview';
import TopCustomersServed from './components/TopCustomersServed';
import CustomersServedSummary from './components/CustomersServedSummary';
import { FaClipboardList, FaClock, FaExclamationTriangle, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const CustomersDashboard = () => {
  // Card data based on the image
  const cardData = [
    {
      title: 'Serving Today',
      count: 2,
      icon: <FaClipboardList className="text-pink-500" />,
      bgColor: 'bg-pink-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'Not yet Started',
      count: 0,
      icon: <FaClock className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'Delayed Tasks',
      count: 1,
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'In progress',
      count: 0,
      icon: <FaSpinner className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'Completed Tasks',
      count: 1,
      icon: <FaCheckCircle className="text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-gray-800'
    }
  ];

  return (
    <div className="p-6 pt-4 flex flex-col bg-white rounded-lg space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Customers Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            count={card.count}
            icon={card.icon}
            bgColor={card.bgColor}
            textColor={card.textColor}
          />
        ))}
      </div>
      
      {/* Customer Overview Chart */}
      <CustomerOverview />
      
      {/* Top Customers Served */}
      <TopCustomersServed />
      
      {/* Customers Served Summary */}
      <CustomersServedSummary />
      
      {/* Add an empty div at the bottom for spacing */}
      <div className="h-10"></div>
    </div>
  );
};

export default CustomersDashboard;