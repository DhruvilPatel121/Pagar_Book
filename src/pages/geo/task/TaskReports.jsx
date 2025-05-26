import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Calendar from '../../../component/Calendar';

function TaskReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);

  // Sample report data
  const reports = [
    {
      id: 1,
      name: 'Task Reports',
      description: 'Get an overview of tasks done by employees.',
      icon: 'report-icon.svg'
    },
    {
      id: 2,
      name: 'Task Details',
      description: 'See a detailed view of the tasks done by employees.',
      icon: 'details-icon.svg'
    },
    {
      id: 3,
      name: 'Form Details',
      description: 'See the details of forms filled by employees while completing tasks.',
      icon: 'form-icon.svg'
    }
  ];

  // Handle outside clicks to close calendar
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && 
          !calendarRef.current.contains(event.target) && 
          !event.target.closest('[data-calendar-toggle]')) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handlePrevDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleDownload = (reportId) => {
    // Implement download functionality for the specific report
    console.log(`Downloading report ${reportId}`);
  };

  // Filter reports based on search query
  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h1 className="text-xl font-semibold pb-2">Reports</h1>
        <p className="text-sm text-gray-500 pb-4">Access and download various reports related to tasks</p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-1 max-w-md justify-between gap-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search reports"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center border border-gray-200 rounded-lg">
          <button 
            className="p-2.5 hover:bg-gray-50 text-gray-500 transition-colors"
            onClick={handlePrevDate}
          >
            <IoChevronBack size={18} />
          </button>
          <span className="px-3 py-2 font-medium">{formatDate(selectedDate)}</span>
          <button 
            className="p-2.5 hover:bg-gray-50 text-gray-500 transition-colors"
            onClick={handleNextDate}
          >
            <IoChevronForward size={18} />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-50 text-blue-500 border-l transition-colors cursor-pointer"
            onClick={() => setShowCalendar(!showCalendar)}
            data-calendar-toggle
          >
            <FaCalendarAlt size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[490px]">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <div key={report.id} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                  <img 
                    src={report.icon} 
                    alt={report.name} 
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234F46E5'%3E%3Cpath d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDownload(report.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <FaDownload size={14} />
                <span>Download</span>
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-100">
            <img 
              src="/assets/images/no-results.svg" 
              alt="No results" 
              className="w-32 h-32 mb-4 opacity-60"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/128?text=No+Results";
              }}
            />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No results found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchQuery ? 
                `No reports matching "${searchQuery}" were found.` : 
                'No reports available.'}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Calendar component */}
      {showCalendar && (
        <div className="absolute top-58 right-10 z-50" ref={calendarRef}>
          <Calendar
            selectedDate={selectedDate}
            onSelect={handleDateSelect}
            onClose={() => setShowCalendar(false)}
          />
        </div>
      )}
    </div>
  );
}

export default TaskReports