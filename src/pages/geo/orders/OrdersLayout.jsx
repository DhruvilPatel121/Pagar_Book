import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaClipboardList, FaPlus, FaCog, FaChartBar } from 'react-icons/fa';

const OrdersLayout = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">PagarBook Orders</h1>
        <p className="text-gray-600 mb-6">Manage all your orders in one place - create, track, and analyze your order data.</p>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <NavLink
            to="/geo/orders"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <FaChartBar className="mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="/geo/orders/list"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <FaClipboardList className="mr-2" />
            Orders List
          </NavLink>
          <NavLink
            to="/geo/orders/add"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <FaPlus className="mr-2" />
            Add Order
          </NavLink>
          <NavLink
            to="/geo/orders/settings"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <FaCog className="mr-2" />
            Settings
          </NavLink>
        </div>
      </div>
      
      <Outlet />
    </div>
  );
};

export default OrdersLayout;