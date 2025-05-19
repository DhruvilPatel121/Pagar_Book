import React, { useState } from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiClock, FiCalendar, FiDollarSign, FiActivity } from 'react-icons/fi';
import { colors, typography, spacing, borders, effects, componentStyles } from '../theme';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('Today');
  
  // Dummy data (replace with actual data later)
  const stats = {
    totalStaff: 25,
    presentToday: 20,
    absentToday: 5,
    lateArrivals: 3,
    earlyDepartures: 2,
    overtime: 4,
    pendingApprovals: 2,
    recentActivities: [
      { id: 1, activity: 'Staff Meeting', time: 'Today, 10:00 AM', user: 'Admin', type: 'meeting' },
      { id: 2, activity: 'Payroll Generated', time: 'Yesterday, 5:30 PM', user: 'System', type: 'payroll' },
      { id: 3, activity: 'New Staff Added', time: 'Yesterday, 2:15 PM', user: 'Admin', type: 'staff' },
      { id: 4, activity: 'Attendance Report Generated', time: '2 days ago', user: 'Varun', type: 'report' },
      { id: 5, activity: 'Leave Request Approved', time: '3 days ago', user: 'Admin', type: 'leave' },
    ]
  };

  // Activity icon mapping
  const activityIcons = {
    meeting: <FiUsers className="text-blue-500" />,
    payroll: <FiDollarSign className="text-green-500" />,
    staff: <FiUserCheck className="text-purple-500" />,
    report: <FiActivity className="text-orange-500" />,
    leave: <FiCalendar className="text-teal-500" />
  };

  // Date range options
  const dateRangeOptions = ['Today', 'This Week', 'This Month', 'Last Month'];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Fixed Header */}
      <header className={`${componentStyles.header} sticky top-0 z-30`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <h1 className={typography.header}>Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-3 pr-8 py-2 bg-white/20 border border-white/30 rounded-md focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white appearance-none cursor-pointer"
              >
                {dateRangeOptions.map(option => (
                  <option key={option} value={option} className="text-gray-800">{option}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <button className={componentStyles.reportButton}>
              <FiActivity className="w-4 h-4" />
              <span>Reports</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className={`container mx-auto ${spacing.container}`}>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={componentStyles.statCard.container}>
              <FiUsers className="text-blue-500 w-6 h-6 mb-2" />
              <span className={componentStyles.statCard.label}>Total Staff</span>
              <p className={`${componentStyles.statCard.value} text-blue-600`}>{stats.totalStaff}</p>
            </div>

            <div className={componentStyles.statCard.container}>
              <FiUserCheck className="text-green-500 w-6 h-6 mb-2" />
              <span className={componentStyles.statCard.label}>Present Today</span>
              <p className={`${componentStyles.statCard.value} text-green-600`}>{stats.presentToday}</p>
            </div>

            <div className={componentStyles.statCard.container}>
              <FiUserX className="text-red-500 w-6 h-6 mb-2" />
              <span className={componentStyles.statCard.label}>Absent Today</span>
              <p className={`${componentStyles.statCard.value} text-red-600`}>{stats.absentToday}</p>
            </div>

            <div className={componentStyles.statCard.container}>
              <FiClock className="text-orange-500 w-6 h-6 mb-2" />
              <span className={componentStyles.statCard.label}>Late Arrivals</span>
              <p className={`${componentStyles.statCard.value} text-orange-600`}>{stats.lateArrivals}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
            {/* Recent Activity - Keeping this section */}
            <div className={`lg:col-span-2 bg-white ${borders.roundedLg} ${effects.shadowSm} overflow-hidden`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className={typography.subheader}>Recent Activity</h3>
                <button className="text-blue-600 text-sm hover:underline">View All</button>
              </div>
              <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {stats.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="p-2 rounded-full bg-gray-100 mr-4">
                      {activityIcons[activity.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{activity.activity}</span>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <span className="text-sm text-gray-500">by {activity.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New right column - replacing Quick Actions and Pending Approvals */}
            <div className="space-y-6">
              {/* Staff Performance Summary - replacing Attendance Overview */}
              <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} overflow-hidden`}>
                <div className="p-4 border-b border-gray-200">
                  <h3 className={typography.subheader}>Staff Performance</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FiUsers className="text-blue-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Top Performers</h4>
                      <div className="flex -space-x-2 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                        <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600">
                          +3
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Productivity</span>
                        <span className="text-sm font-medium text-green-600">92%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Punctuality</span>
                        <span className="text-sm font-medium text-blue-600">88%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Task Completion</span>
                        <span className="text-sm font-medium text-purple-600">95%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 text-center text-blue-600 text-sm hover:underline">
                    View Performance Reports
                  </button>
                </div>
              </div>

              {/* Upcoming Events - keeping this section */}
              <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} overflow-hidden`}>
                <div className="p-4 border-b border-gray-200">
                  <h3 className={typography.subheader}>Upcoming Events</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[50px] h-[50px] bg-red-100 text-red-600 rounded-md">
                      <span className="text-xs font-medium">JUN</span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Monthly Review Meeting</h4>
                      <p className="text-sm text-gray-500">10:00 AM - 11:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[50px] h-[50px] bg-blue-100 text-blue-600 rounded-md">
                      <span className="text-xs font-medium">JUN</span>
                      <span className="text-lg font-bold">18</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Salary Processing</h4>
                      <p className="text-sm text-gray-500">All Day</p>
                    </div>
                  </div>
                  
                  <button className="w-full text-center text-blue-600 text-sm hover:underline mt-2">
                    View Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
