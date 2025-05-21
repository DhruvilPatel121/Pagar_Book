import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaShare, FaFilter } from 'react-icons/fa';
import { IoRefresh } from 'react-icons/io5';
import { componentStyles } from '../../../theme';

const TrackingDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('19 May 2025');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const calendarRef = useRef(null);
  
  const [stats] = useState({
    totalDistance: '75.1 kms',
    totalTime: '6 hrs 55 mins',
    timeInMotion: '4 hrs 1 min',
    timeInRest: '2 hrs 54 mins',
    staffData: [
      {
        name: 'HIREN BARIYA',
        status: 'On Trip',
        percentage: 75,
        distance: '26.8 kms',
        totalTime: '3 hrs 47 mins',
        motionTime: '1 hr 49 mins',
        restTime: '1 hr 57 mins'
      },
      {
        name: 'RAUNAKBHAI TANNA',
        status: 'On Trip',
        percentage: 60,
        distance: '48.3 kms',
        totalTime: '3 hrs 8 mins',
        motionTime: '2 hrs 11 mins',
        restTime: '56 mins'
      }
    ]
  });


useEffect(() => {
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const handleShare = (staffName) => {
    navigator.share({
      title: `${staffName}'s Tracking Details`,
      text: `Tracking details for ${staffName} on ${selectedDate}`,
      url: window.location.href,
    }).catch(console.error);
  };

  const handleRefresh = () => {
    // Add refresh logic here
    console.log('Refreshing data...');
  };

  const handleDownload = () => {
    // Add download logic here
    console.log('Downloading report...');
  };

  const filteredStaff = stats.staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <h1 className="text-xl font-semibold pb-4">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <span className="text-gray-700">{selectedDate}</span>
              <FaCalendarAlt className="text-gray-500" />
            </button>
            {isCalendarOpen && (
              <div className="absolute right-0 top-full mt-[-350px] z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-64">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setIsCalendarOpen(false);
              }}
            />
          </div>
        </div>
            )}
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center bg-blue-50 gap-1 px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
          >
            <IoRefresh size={18} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className={componentStyles.geoPage.dashboard.statCard.green}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total Distance</div>
              <div className="text-2xl font-semibold mt-1">{stats.totalDistance}</div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total Time</div>
              <div className="text-2xl font-semibold mt-1">{stats.totalTime}</div>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Time Spent in Motion</div>
              <div className="text-2xl font-semibold mt-1">{stats.timeInMotion}</div>
            </div>
            <div className="bg-pink-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Time Spent in Rest</div>
              <div className="text-2xl font-semibold mt-1">{stats.timeInRest}</div>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4">
        <div className="flex items-center gap-2 max-w-md">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name or staff ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Distance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time in motion</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time at rest</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.length > 0 ? (
              filteredStaff.map((staff, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-1 rounded-full ${staff.percentage >= 70 ? 'bg-green-500' : 'bg-yellow-500'} mr-3`}></div>
                      <span className="font-medium text-gray-900">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-green-600">{staff.status}</td>
                  <td className="px-4 py-4">{staff.distance}</td>
                  <td className="px-4 py-4">{staff.totalTime}</td>
                  <td className="px-4 py-4">{staff.motionTime}</td>
                  <td className="px-4 py-4">{staff.restTime}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleShare(staff.name)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <FaShare />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No results found for "{searchQuery}"
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Calendar component
const Calendar = ({ selectedDate, onDateSelect }) => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const changeMonth = (increment) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + increment);
    setViewDate(newDate);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const formattedDate = `${day} ${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
    onDateSelect(formattedDate);
  };

  return (
    <div className={componentStyles.calendar.container}>
      <div className={componentStyles.calendar.header}>
        <button onClick={() => changeMonth(-1)} className={componentStyles.calendar.navButton}>
          ‹
        </button>
        <span className={componentStyles.calendar.monthYear}>
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button onClick={() => changeMonth(1)} className={componentStyles.calendar.navButton}>
          ›
        </button>
      </div>
      <div className={componentStyles.calendar.daysGrid}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className={componentStyles.calendar.dayLabel}>{day}</div>
        ))}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} className={componentStyles.calendar.emptyDay} />
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = new Date().getDate() === day;
          const isSelected = selectedDate === `${day} ${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`${componentStyles.calendar.dayButton} ${isToday ? componentStyles.calendar.todayIndicator : ''} ${isSelected ? componentStyles.calendar.selectedDay : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingDashboard
