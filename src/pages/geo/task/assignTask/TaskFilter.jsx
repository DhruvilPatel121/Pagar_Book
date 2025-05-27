import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const TaskFilter = ({ onClose, onApply, staffList }) => {
  const [filters, setFilters] = useState({
    status: '',
    staff: ''
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1002]" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-lg z-[1003] shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filter</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Status</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">All</option>
                <option value="DONE">Done</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Staff</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={filters.staff}
                onChange={(e) => setFilters(prev => ({ ...prev, staff: e.target.value }))}
              >
                <option value="">All Staff</option>
                {staffList.map(staff => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                onClick={handleApply}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
              <button 
                onClick={onClose}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskFilter;