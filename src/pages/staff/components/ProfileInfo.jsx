import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import EditProfileForm from './edit/EditProfileForm';
import EditGeneralForm from './edit/EditGeneralForm';

const ProfileInfo = () => {

    const { staffData, setStaffData } = useOutletContext();
    const [editMode, setEditMode] = useState(null); // 'profile' or 'general'

    const handleSave = (updatedData) => {
    setStaffData(prev => ({ ...prev, ...updatedData }));
    setEditMode(null);
  };

  const profileFields = [
    { label: 'Name', value: staffData.name, required: true },
    { label: 'ID', value: staffData.id, required: true },
    { label: 'Designation', value: staffData.designation || '-' },
    { label: 'Department', value: staffData.department },
    { label: 'Phone Number', value: staffData.phone || '-' },
    { label: 'Email', value: staffData.email || '-' },
    { label: 'Address', value: staffData.address || '-' },
    { label: 'Joining Date', value: staffData.joiningDate || '-' },
  ];

  const generalFields = [
    { label: 'Salary Cycle', value: staffData.salaryCycle, required: true },
    { label: 'Weekly-off Template', value: staffData.weeklyOffTemplate || '-' },
    { label: 'Holiday Template', value: staffData.holidayTemplate || '-' },
    { label: 'Leave Template', value: staffData.leaveTemplate || '-' },
    { label: 'Shift', value: staffData.shift || '-' },
    { label: 'Salary Access', value: staffData.salaryAccess, required: true },
    { label: 'Attendance Mode', value: staffData.attendanceMode || '-' },
  ];

  const InfoSection = ({ title, fields, section }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200" 
          onClick={() => setEditMode(section)}>
          <FiEdit2 className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mt-6">
        {fields.map((field, index) => (
          <div key={index} className="space-y-2">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {field.label}
              {field.required && <span className="text-red-500 text-xs">*</span>}
            </p>
            <p className={`font-medium ${field.value === '-' ? 'text-gray-400' : 'text-gray-800'}`}>
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  if (editMode === 'profile') {
    return (
      <EditProfileForm
        data={staffData}
        onSave={handleSave}
        onCancel={() => setEditMode(null)}
      />
    );
  }

  if (editMode === 'general') {
    return (
      <EditGeneralForm
        data={staffData}
        onSave={handleSave}
        onCancel={() => setEditMode(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <InfoSection title="Profile Information" fields={profileFields} section="profile" />
      <InfoSection title="General Information" fields={generalFields} section="general" />
    </div>
  );
};

export default ProfileInfo