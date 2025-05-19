import React, { useState }  from 'react';
import { useParams, Outlet } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSidebar';

const StaffProfile = () => {
  const { id } = useParams();
  // const [staffData, setStaffData] = useState(staffList[id] || staffList['1018']);

  const handleUpdateStaff = (updatedData) => {
    // Here you would typically make an API call to update the data
    setStaffData(prev => ({ ...prev, ...updatedData }));
    // Add your API call here
    // api.updateStaff(id, updatedData).then(...);
  };

  // Mock data - this should be fetched based on the ID
  const staffList = {
    '1018': {
      name: 'AHMED',
      id: '1018',
      department: 'Production',
      designation: '-',
      contractType: 'Contractual (monthly)',
      phone: '-',
      email: '-',
      address: '-',
      joiningDate: '-',
      salaryCycle: '1',
      weeklyOffTemplate: '-',
      holidayTemplate: '-',
      leaveTemplate: '-',
      shift: 'PRODUCTION SHIFT',
      salaryAccess: 'Disabled',
      attendanceMode: 'Manual Attendance'
    },
    '1023': {
      name: 'AJAYBHAI CHAUHAN',
      id: '1023',
      department: 'Production',
      designation: '-',
      contractType: 'Contractual (monthly)',
      phone: '-',
      email: '-',
      address: '-',
      joiningDate: '-',
      salaryCycle: '1',
      weeklyOffTemplate: '-',
      holidayTemplate: '-',
      leaveTemplate: '-',
      shift: 'PRODUCTION SHIFT',
      salaryAccess: 'Disabled',
      attendanceMode: 'Manual Attendance'
    },
    // Add other staff members here
  };

  const [staffData, setStaffData] = useState(staffList[id] || staffList['1018']);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto p-4 flex flex-col h-full">
        {/* Fixed Header */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex items-center gap-6 p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-semibold text-blue-600">{staffData.name[0]}</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{staffData.name}</h1>
              <p className="text-base text-gray-600 mt-1 flex items-center gap-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">ID {staffData.id}</span> 
                <span className="text-blue-600 font-medium">{staffData.contractType}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Area with Fixed Sidebar and Scrollable Content */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Fixed Sidebar */}
          <div className="lg:w-72 w-full lg:h-full">
            <div className="lg:sticky lg:top-4">
              <ProfileSidebar />
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 min-h-0">
            <div className="h-full overflow-y-auto pr-2">
              {/* <ProfileInfo staffData={staffData} onUpdate={handleUpdateStaff} /> */}
              <Outlet context={{ staffData, setStaffData, handleUpdateStaff }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile