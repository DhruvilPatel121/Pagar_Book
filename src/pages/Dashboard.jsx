import React from 'react';

const Dashboard = () => {
  // Dummy data (replace with actual data later)
  const stats = {
    totalStaff: 25,
    presentToday: 20,
    absentToday: 5,
    recentActivities: [
      { id: 1, activity: 'Staff Meeting', time: 'Today, 10:00 AM' },
      { id: 2, activity: 'Payroll Generated', time: 'Yesterday, 5:30 PM' },
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Staff</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalStaff}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">{stats.presentToday}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">{stats.absentToday}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {stats.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <span>{activity.activity}</span>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
