import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import Calendar from '../../../../../component/Calendar';
import TaskFilter from './TaskFilter';

const NoDataMessage = ({ message }) => (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

const TaskTable = ({ tasks, searchQuery, setSearchQuery, showCalendar, setShowCalendar, selectedDate, handleDateSelect }) => {
  const calendarRef = useRef(null);
  const filterRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    assignedBy: ''
  });

  // Handle click outside calendar and filter
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowCalendar]);

  // Apply filters and search
  const filteredTasks = tasks?.filter(task => {
    const matchesSearch = Object.values(task).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesAssignedBy = !filters.assignedBy || task.assignedBy.includes(filters.assignedBy);

    return matchesSearch && matchesStatus && matchesAssignedBy;
  }) || [];

  const handleClearFilters = () => {
    setFilters({ status: '', assignedBy: '' });
    setShowFilter(false);
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header with Search, Filter, Calendar and Download */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center flex-1 min-w-[200px]">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="mr-2" />
                Filter
              </button>
              <TaskFilter
                isOpen={showFilter}
                onClose={() => setShowFilter(false)}
                filters={filters}
                setFilters={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />
            </div>
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FaCalendarAlt className="mr-2 text-blue-600" />
                {selectedDate.toLocaleDateString()}
              </button>
              {showCalendar && (
                <div className="absolute right-0 z-50">
                  <Calendar onClose={() => setShowCalendar(false)} onSelect={handleDateSelect} />
                </div>
              )}
            </div>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <FaDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="w-full overflow-x-auto">
        <div className="max-w-[1000px]">
          {!tasks || tasks.length === 0 ? (
            <NoDataMessage message="No data available" />
          ) : filteredTasks.length > 0 ? (
            <table className="w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task ID</th>
                  <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th>
                  <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th>
                  <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned By</th>
                  <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Type</th>
                  <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                  <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
                  <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Duration</th>
                  <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
                  <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Forms Submitted</th>
                  <th className="w-60 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{task.name}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">{task.taskId}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.checkInTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.checkOutTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.assignedBy}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.taskType}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.startTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.endTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.taskDuration}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{task.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.formsSubmitted}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">{task.address}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{task.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoDataMessage message={`No results found for "${searchQuery}"`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;