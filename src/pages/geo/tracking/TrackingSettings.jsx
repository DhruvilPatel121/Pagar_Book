import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';

const TrackingSettings = () => {
  const [selectedStaff, setSelectedStaff] = useState([]);

  const handleStaffSelection = () => {
    // Handle staff selection logic
    console.log('Opening staff selection modal');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Access settings related to task assignment here.
        </p>
      </div>

      {/* Settings Options */}
      <div className="divide-y divide-gray-100">
        {/* Staff Timeline Access Setting */}
        <div 
          onClick={handleStaffSelection}
          className="p-4 hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <BsPeople className="text-xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">
                Select Staff for Timeline Access
              </h3>
              <p className="text-sm text-gray-500">
                Select staff who will be able to see their timeline on the staff app
              </p>
            </div>
          </div>
          <FiChevronRight className="text-gray-400 text-xl" />
        </div>

        {/* You can add more settings options here following the same pattern */}
      </div>
    </div>
  );
};

export default TrackingSettings