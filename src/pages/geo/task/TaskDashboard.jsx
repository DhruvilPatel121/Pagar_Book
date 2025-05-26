import React, { useState, useEffect, useRef } from 'react';
import { FaTasks, FaHourglassStart, FaClock, FaCheckCircle } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Calendar from '../../../component/Calendar';
import { colors } from '../../../theme';


const TaskDashboard = () => {
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [showCalendar3, setShowCalendar3] = useState(false);
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [selectedStaff, setSelectedStaff] = useState('All Staff');
  const [searchQuery, setSearchQuery] = useState('');

  const calendarRef1 = useRef(null);
  const calendarRef2 = useRef(null);
  const calendarRef3 = useRef(null);

  // Sample staff data
  const staffData = [
    {
      name: 'HIREN BARIYA',
      staffId: '1038',
      taskCount: 13,
      avgTasksPerDay: 1.86,
      totalDuration: '1 min',
      avgDuration: '0 min',
      totalFormsAdded: 0
    },
    {
      name: 'RAUNAKBHAI TANNA',
      staffId: '1035',
      taskCount: 25,
      avgTasksPerDay: 3.25,
      totalDuration: '1 min',
      avgDuration: '0 min',
      totalFormsAdded: 0
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef1.current && !calendarRef1.current.contains(event.target)) {
        setShowCalendar1(false);
      }
      if (calendarRef2.current && !calendarRef2.current.contains(event.target)) {
        setShowCalendar2(false);
      }
      if (calendarRef3.current && !calendarRef3.current.contains(event.target)) {
        setShowCalendar3(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter staff based on search query
  const filteredStaff = staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusCards = [
    { title: 'Total Tasks', count: 1, icon: <FaTasks />, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    { title: 'Not yet Started', count: 0, icon: <FaHourglassStart />, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { title: 'Delayed Tasks', count: 0, icon: <FaClock />, bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { title: 'Completed Tasks', count: 1, icon: <FaCheckCircle />, bgColor: 'bg-green-50', iconColor: 'text-green-600' },
  ];

  const taskData = [
    { date: '14 May', tasks: 2 },
    { date: '15 May', tasks: 1 },
    { date: '16 May', tasks: 2 },
    { date: '17 May', tasks: 3 },
    { date: '18 May', tasks: 0 },
    { date: '19 May', tasks: 2 },
    { date: '20 May', tasks: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-semibold mb-6">Tasks Dashboard</h1>
      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {statusCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm mb-2">{card.title}</p>
                <p className="text-2xl font-bold">{card.count}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-full ${card.iconColor}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks per Day Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 pb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Tasks per Day</h2>
            <p className="text-sm text-gray-500">A breakdown of tasks, status wise per day</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5"
            >
              <option>All Staff</option>
            </select>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5"
            >
              <option>Last 7 days</option>
            </select>
            <div className="relative" ref={calendarRef1}>
              <button 
                onClick={() => setShowCalendar1(!showCalendar1)}
                className="border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer"
              >
                14 May '25 - 20 May '25 <FaCalendarAlt className={colors.primary.icon}/>
              </button>
              {showCalendar1 && (
                <div className="absolute right-0 mt-2 z-[1000]">
                  <Calendar onClose={() => setShowCalendar1(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={taskData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} ticks={[0, 0.75, 1.5, 2.25, 3]} />
            <Bar dataKey="tasks" fill="#86efac" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Top Performers</h2>
            <p className="text-sm text-gray-500">Your top performers based on the selected time frame</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5"
            >
              <option>Last 7 days</option>
            </select>
            <div className="relative" ref={calendarRef2}>
              <button 
                onClick={() => setShowCalendar2(!showCalendar2)}
                className="border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer"
              >
                14 May '25 - 20 May '25 <FaCalendarAlt className={colors.primary.icon}/>
              </button>
              {showCalendar2 && (
                <div className="absolute right-0 mt-2 z-[1000]">
                  <Calendar onClose={() => setShowCalendar2(false)} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative group cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span>HIREN BARIYA</span>
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">13</span>
          </div>
          <div className="w-full h-full bg-purple-100 rounded-full">
            <div className="h-[30px] w-full bg-sky-500 rounded-full">13</div>
          </div>
          <div className="hidden group-hover:block absolute top-0 left-0 bg-gray-900 text-white p-2 rounded text-sm">
            Staff Name: HIREN BARIYA<br />
            Completed Tasks: 13
          </div>
        </div>
      </div>

      {/* Completed Tasks Summary section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="pb-6">
          <h2 className="text-lg font-semibold">Completed Tasks Summary</h2>
          <p className="text-sm text-gray-500">Your employee productivity with task details and performance metrics</p>
          <div className="flex items-center justify-between space-x-4 pt-5">
            <input 
              type="text" 
              placeholder="Search by Staff Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5 w-64"
            />
            <div className="flex items-center space-x-4">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-1.5"
            >
              <option>Last 7 days</option>
            </select>
            <div className="relative" ref={calendarRef3}>
              <button 
                onClick={() => setShowCalendar3(!showCalendar3)}
                className="border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer"
              >
                14 May '25 - 20 May '25 <FaCalendarAlt className={colors.primary.icon}/>
              </button>
              {showCalendar3 && (
                <div className="absolute right-0 mt-2 z-[1000]">
                  <Calendar onClose={() => setShowCalendar3(false)} />
                </div>
              )}
            </div>
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md">
              Download
            </button>
            </div>
          </div>
        </div>
        
        {filteredStaff.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Staff ID</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Task Count</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Average No of Tasks/Day</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Total Duration</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Average Duration</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Total Forms Added</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => (
                <tr key={index}>
                  <td className="p-3 text-sm">
                    <div className="flex items-center">
                      <img src="path/to/avatar" alt="" className="w-8 h-8 rounded-full mr-3" />
                      {staff.name}
                    </div>
                  </td>
                  <td className="p-3 text-sm">{staff.staffId}</td>
                  <td className="p-3 text-sm">{staff.taskCount}</td>
                  <td className="p-3 text-sm">{staff.avgTasksPerDay}</td>
                  <td className="p-3 text-sm">{staff.totalDuration}</td>
                  <td className="p-3 text-sm">{staff.avgDuration}</td>
                  <td className="p-3 text-sm">{staff.totalFormsAdded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard