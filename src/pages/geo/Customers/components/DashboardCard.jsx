import React from 'react';

const DashboardCard = ({ title, count, icon, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <div className="p-2 rounded-full bg-white bg-opacity-70">
          {icon}
        </div>
      </div>
      <div className={`text-3xl font-bold ${textColor}`}>{count}</div>
    </div>
  );
};

export default DashboardCard;