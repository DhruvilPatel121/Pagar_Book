import React from 'react';
import { FaBoxOpen, FaSpinner, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrdersOverview from './components/OrdersOverview';
import OrdersSummary from './components/OrdersSummary';

const OrdersDashboard = () => {
  // Sample data for the dashboard
  const orderStats = [
    {
      title: 'New Orders',
      count: 24,
      icon: <FaBoxOpen className="text-pink-500" />,
      bgColor: 'bg-pink-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'Processing',
      count: 12,
      icon: <FaSpinner className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'Ready to Ship',
      count: 8,
      icon: <FaTruck className="text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'In Progress',
      count: 3,
      icon: <FaSpinner className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-gray-800'
    },
    {
      title: 'Delivered',
      count: 45,
      icon: <FaCheckCircle className="text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-gray-800'
    }
  ];

  // Sample recent orders
  const recentOrders = [
    { id: 'ORD-001', customer: 'Acme Corp', date: '21 May 2025', status: 'Delivered', amount: '₹1,250' },
    { id: 'ORD-002', customer: 'Tech Solutions', date: '20 May 2025', status: 'Processing', amount: '₹2,800' },
    { id: 'ORD-003', customer: 'Global Industries', date: '19 May 2025', status: 'New', amount: '₹950' },
    { id: 'ORD-004', customer: 'Innovative Systems', date: '18 May 2025', status: 'Ready to Ship', amount: '₹1,750' },
    { id: 'ORD-005', customer: 'Prime Enterprises', date: '17 May 2025', status: 'Delivered', amount: '₹3,200' },
  ];

  return (
    <div className="p-6 pt-4 flex flex-col bg-white rounded-lg space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Orders Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {orderStats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} p-4 rounded-lg shadow-sm flex items-center justify-between`}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.count}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        ))}
      </div>
      
      {/* Orders Overview Chart */}
      <OrdersOverview />
      {/* Orders Summary */}
      <OrdersSummary />
      
      {/* Add an empty div at the bottom for spacing */}
      <div className="h-10"></div>
    </div>
  );
};

export default OrdersDashboard;