import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskTable from './components/TaskTable';

const TaskList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to check active tab
  const isActiveTab = (path) => {
    return location.pathname.includes(path);
  };

  // Navigation links data
  const navLinks = [
    { path: '/geo/tasks/list/all', label: 'All Tasks' },
    { path: '/geo/tasks/list/pending', label: 'Pending Verification' },
    { path: '/geo/tasks/list/requests', label: 'Tasks Requests' },
  ];

  const tasks = [
    {
      name: 'HIREN BARIYA',
      taskId: '#1521323',
      status: 'Done',
      checkInTime: '10:13 AM',
      checkOutTime: '10:13 AM',
      assignedBy: 'Self Assigned',
      taskType: '-',
      startTime: '-',
      endTime: '-',
      taskDuration: '-',
      customerName: 'pratap engineering',
      formsSubmitted: '-',
      address: 'J44/9, Industrial Ar...',
      createdAt: '21 May 2025, 10:13 AM'
    },
    {
      name: 'RAUNAKBHAI TANNA',
      taskId: '#1521313',
      status: 'Done',
      checkInTime: '10:13 AM',
      checkOutTime: '10:13 AM',
      assignedBy: 'Self Assigned',
      taskType: '-Self Assigned',
      startTime: '-Self Assigned',
      endTime: '-Self Assigned',
      taskDuration: '-Self Assigned',
      customerName: 'pratap engineering',
      formsSubmitted: '-Self Assigned',
      address: 'J44/9, Industrial Ar...',
      createdAt: '15 May 2025, 10:13 AM'
    },
    // Add more tasks as needed
  ];

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Navigation Links */}
      <div className="mb-6">
        <nav className="flex space-x-6 border-b">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(link.path);
              }}
              className={`px-4 py-2 ${
                isActiveTab(link.path)
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <h1 className="text-xl font-semibold pb-2">Task List</h1>
        <p className="text-sm text-gray-500 pb-4">Access Tasks completed by your staff here</p>
      </div>

      <TaskTable
        tasks={tasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        selectedDate={selectedDate}
        handleDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default TaskList;