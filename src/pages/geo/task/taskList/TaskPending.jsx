import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskTable from './components/TaskTable';

const TaskPending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navLinks = [
    { path: '/geo/tasks/list/all', label: 'All Tasks' },
    { path: '/geo/tasks/list/pending', label: 'Pending Verification' },
    { path: '/geo/tasks/list/requests', label: 'Tasks Requests' },
  ];

  const tasks = [
    // ... your pending tasks data ...
  ];

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  }, []);

  const isActiveTab = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
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
        <h1 className="text-xl font-semibold pb-2">Pending Verification</h1>
        <p className="text-sm text-gray-500 pb-4">Access pending tasks of your staff here</p>
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

export default TaskPending;
