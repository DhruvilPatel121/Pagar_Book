import React from 'react';

const TaskFilter = ({ isOpen, onClose, filters, setFilters, onApply, onClear }) => {
  if (!isOpen) return null;

  const taskStatusOptions = [
    'Yet to Start',
    'Done',
    'In progress',
    'Delayed',
    'Rescheduled',
    'Expired',
    'Rejected'
  ];

  const assigneeTypeOptions = [
    'Self',
    'Manager',
    'Admin/Owner'
  ];

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filter</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        {/* Task Status Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Task Status</option>
            {taskStatusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Assigned By Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assigned by
          </label>
          <select
            value={filters.assignedBy || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, assignedBy: e.target.value }))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select assignee type</option>
            {assigneeTypeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={onClear}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;