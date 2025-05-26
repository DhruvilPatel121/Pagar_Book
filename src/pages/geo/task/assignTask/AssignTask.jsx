import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaPlus, FaDownload, FaUser } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Calendar from '../../../../component/Calendar';
import AddAssignTask from './AddAssignTask';
import AssignTaskDetail from './AssignTaskDetail';
import TaskFilter from './TaskFilter';


const AssignTask = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
  status: '',
  staff: ''
});

  // Sample staff data - replace with your actual data
  const staffList = [
    { id: '1038', name: 'HIREN BARIYA', image: '/path/to/image', tasks: [
      { time: '10:13 AM - 10:13 AM', status: 'DONE' },
      { time: '12:13 PM - 12:13 PM', status: 'DONE' },
      { time: '12:45 PM - 12:46 PM', status: 'DONE' },
      { time: '10:13 AM - 10:13 AM', status: 'DONE' },
      { time: '12:13 PM - 12:13 PM', status: 'DONE' },
      { time: '12:45 PM - 12:46 PM', status: 'DONE' }
    ]},
    { id: '1035', name: 'RAUNAKBHAI TANNA', image: '/path/to/image', tasks: [
      { time: '10:13 AM - 10:13 AM', status: 'PENDING' },
      { time: '12:13 PM - 12:13 PM', status: 'PENDING' },
      { time: '12:45 PM - 12:46 PM', status: 'PENDING' },
      { time: '10:13 AM - 10:13 AM', status: 'DONE' },
      { time: '12:13 PM - 12:13 PM', status: 'DONE' },
      { time: '12:45 PM - 12:46 PM', status: 'DONE' }
    ]},
    { id: '1039', name: 'RAJ KAMANI', image: '/path/to/image', tasks: [
      { time: '10:13 AM - 10:13 AM', status: 'DONE' },
      { time: '12:13 PM - 12:13 PM', status: 'DONE' },
      { time: '12:45 PM - 12:46 PM', status: 'DONE' },
      { time: '10:13 AM - 10:13 AM', status: 'DONE' },
      { time: '12:13 PM - 12:13 PM', status: 'DONE' },
      { time: '12:45 PM - 12:46 PM', status: 'DONE' }
    ]},
    { id: '1040', name: 'PANKAJ PATADIYA', image: '/path/to/image', tasks: [
      { time: '10:13 AM - 10:13 AM', status: 'PENDING' },
      { time: '12:13 PM - 12:13 PM', status: 'PENDING' },
      { time: '12:45 PM - 12:46 PM', status: 'PENDING' },
      { time: '10:13 AM - 10:13 AM', status: 'PENDING' },
      { time: '12:13 PM - 12:13 PM', status: 'DONE' },
      { time: '12:45 PM - 12:46 PM', status: 'DONE' }
    ]},
  ];

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

  const handleBulkUpload = () => {
    // Implement bulk upload functionality
  };

  const handleAddTask = (staffData) => {
    setSelectedStaff(staffData);
    setShowAddTask(true);
  };

  const handleSaveTask = (taskData) => {
    // Update your staffList with the new task
    const updatedStaffList = staffList.map(staff => {
      if (staff.id === selectedStaff.id) {
        return {
          ...staff,
          tasks: [...staff.tasks, {
            time: `${taskData.startTime} - ${taskData.endTime}`,
            status: 'PENDING',
            // Add other task data as needed
          }]
        };
      }
      return staff;
    });
    
    // Update your state or make API call here
    // setStaffList(updatedStaffList);
    setShowAddTask(false);
  };

  // Add this function to handle task click
  const handleTaskClick = (staff, task) => {
    setSelectedTask({
      name: staff.name,
      status: task.status,
      assignedBy: staff.name,
      taskId: '1533453', // You should generate or get this from your data
      date: '2025-05-23', // Format your date accordingly
      checkedInTime: task.time,
      scheduledTime: '---',
      customerName: 'Shakti Engineering', // Add these details to your task data
      customerContact: '9574722457',
      customerAddress: '307/1, Jupiter Rd, Makarpura GIDC, Makarpura, Vadodara, Gujarat 390014, India',
      actualAddress: '307/1, Jupiter Rd, Makarpura GIDC, Makarpura, Vadodara, Gujarat 390014, India',
      description: task.description || '---'
    });
    setShowTaskDetail(true);
  };

  // Add filter handling function
  const handleApplyFilters = (filters) => {
  setActiveFilters(filters);
};

  const filteredStaffList = staffList.filter(staff => {
  // Search filter
  if (searchQuery && 
      !staff.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !staff.id.includes(searchQuery)) {
    return false;
  }
  
  // Existing filter logic
  if (activeFilters.staff && staff.id !== activeFilters.staff) {
    return false;
  }
  
  if (activeFilters.status) {
    const hasMatchingTask = staff.tasks.some(task => task.status === activeFilters.status);
    if (!hasMatchingTask) {
      return false;
    }
  }
  
  return true;
}).map(staff => ({
  ...staff,
  tasks: activeFilters.status 
    ? staff.tasks.filter(task => task.status === activeFilters.status)
    : staff.tasks
}));

  // Add this useEffect for handling outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && 
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

  return (
    <div className="relative">
      <div className={showAddTask ? 'pointer-events-none' : ''}>
        <div className={`p-4 bg-white rounded-lg shadow-sm ${showAddTask ? 'blur-sm' : ''}`}>
          <h1 className="text-xl font-semibold mb-2">Assign Task</h1>
          <p className="text-gray-600 mb-6">
            Assign tasks to your employees. You can choose to add tasks one by one, or add them in bulk using our Excel template.
          </p>
  
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex flex-1 max-w-md justify-between gap-3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by name or staff ID"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="flex items-center px-4 py-2.5 text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setShowFilter(true)}>
                <FaFilter className="mr-2" />
                Filter
              </button>
            </div>
  
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden relative">  
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button className="p-2.5 hover:bg-gray-50 text-gray-500 transition-colors"
                   onClick={handlePrevDate}><IoChevronBack size={18} />
                </button>
                <span className="px-3 py-2 font-medium">{formatDate(selectedDate)}</span>
                <button className="p-2.5 hover:bg-gray-50 text-gray-500 transition-colors"
                  onClick={handleNextDate}><IoChevronForward size={18} />
                </button>
                <button className="p-2.5 hover:bg-gray-50 text-blue-500 border-l transition-colors cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                  data-calendar-toggle><FaCalendarAlt size={16} />
                </button>
              </div>
  
              <button className="flex items-center px-4 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
                <FaDownload className="mr-2" />
                Bulk Upload
              </button>
            </div>
            {showCalendar && (
              <div className="absolute top-40 right-20 z-50" ref={calendarRef}>
                <Calendar
                  selectedDate={selectedDate}
                  onSelect={handleDateSelect}
                  onClose={() => setShowCalendar(false)}
                />
              </div>
            )}
          </div>
  
  
          <div className="space-y-4 max-h-[480px] overflow-y-auto">
            {filteredStaffList.length > 0 ? (
              filteredStaffList.map((staff) => (
                <div key={staff.id} className="flex bg-white rounded-lg border border-gray-100">
                  <div className="w-[200px] min-w-[200px] p-4 flex items-center gap-3 border-r border-gray-100">
                    <img
                      src={staff.image || "https://via.placeholder.com/40"}
                      alt={staff.name}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{staff.name}</div>
                      <div className="text-sm text-gray-500">#{staff.id}</div>
                    </div>
                  </div>
  
                  <div className="flex-1 p-4 flex items-center space-x-3">
                    <div className="flex-shrink-0 pl-4">
                      <button className="w-8 h-8 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer"
                        onClick={() => handleAddTask(staff)}>
                        <FaPlus size={16} />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex max-w-[850px] gap-4 overflow-x-auto py-2 px-1">
                        {staff.tasks.map((task, index) => (
                          <div key={index} className="flex-shrink-0 p-3 bg-green-50 rounded-lg border border-green-100 w-[280px]">
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-2 h-2 rounded-full ${task.status === 'DONE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span className={`text-xs font-medium ${task.status === 'DONE' ? 'text-green-700' : 'text-red-700'}`}>{task.status}</span>
                            </div>
                            <div className="space-y-1.5 text-sm">
                              <div className="flex items-center gap-2">
                                <FaUser size={12} className="text-gray-500" />
                                <span className="text-gray-500">Assigned by:</span>
                                <span className="font-medium text-gray-900 cursor-pointer" onClick={() => handleTaskClick(staff, staff.tasks[0])}>{staff.name}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="flex flex-col items-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>
                                  <div className="w-[1px] h-6 bg-gray-300"></div>
                                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                </div>
                                <div className="space-y-4 flex-1">
                                  <div className="flex items-center">
                                    <span className="text-gray-500">Scheduled At:</span>
                                    <span className="ml-2">---</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500">Checked in At:</span>
                                    <span className="ml-2">{task.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
                    `No staff matching "${searchQuery}" were found.` : 
                    'No staff matching the selected filters were found.'}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilters({ status: '', staff: '' });
                    setShowFilter(false);
                  }}
                  className="mt-4 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showAddTask && (
        <AddAssignTask
          staffName={selectedStaff?.name}
          onClose={() => setShowAddTask(false)}
          onSave={handleSaveTask}
        />
      )}
      {showTaskDetail && (
        <AssignTaskDetail
          task={selectedTask}
          onClose={() => setShowTaskDetail(false)}
        />
      )}
      {showFilter && (
        <TaskFilter
          staffList={staffList}
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilters}
        />
      )}
    </div>
  );
};

export default AssignTask
