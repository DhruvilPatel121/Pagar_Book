import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';

const SalaryStructure = () => {
  const { staffData } = useOutletContext();
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white rounded-lg">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Salary Structure</h1>
          <div className="flex gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 border rounded-lg hover:bg-gray-50"
              >
                Actions
                <IoMdArrowDropdown className={`transition-transform ${showActions ? 'rotate-180' : ''}`} />
              </button>
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-100">
                    Download
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-blue-100">
                    Print
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Salary Template Components Section */}
      <div className="p-6">
        <h2 className="text-lg font-medium mb-6">Salary Template Components</h2>
        <div className="grid grid-cols-2 gap-x-8">
          {/* Salary Template */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Salary Template</p>
              <p className="font-medium">Default (Daily)</p>
          </div>

          {/* Flex-Benefit Plan Template */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Flex-Benefit Plan Template</p>
              <p className="font-medium">NA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructure