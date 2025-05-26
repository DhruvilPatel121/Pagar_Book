import React, { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

function TaskSettings() {
  const [otpVerification, setOtpVerification] = useState(false);
  const [geoFence, setGeoFence] = useState(false);

  const settingOptions = [
    {
      id: 'custom-fields',
      icon: '📋',
      title: 'Manage Custom Fields',
      description: 'Manage custom fields to capture additional details on tasks.',
      hasToggle: false,
      hasNavigation: true,
      onClick: () => console.log('Navigate to custom fields')
    },
    {
      id: 'schedule-staff',
      icon: '👥',
      title: 'Staff who can schedule tasks',
      description: 'Select staff who will be able to schedule tasks',
      hasToggle: false,
      hasNavigation: true,
      onClick: () => console.log('Navigate to staff selection')
    },
    {
      id: 'auto-approve',
      icon: '✅',
      title: 'Auto Approve Tasks',
      description: 'Tasks sent by employees will be auto approved.',
      hasToggle: false,
      hasNavigation: true,
      onClick: () => console.log('Navigate to auto approve settings')
    },
    {
      id: 'require-approval',
      icon: '🔍',
      title: 'Require Approval on Completed Tasks',
      description: 'Select staff who will require their tasks to be approved upon completion.',
      hasToggle: false,
      hasNavigation: true,
      onClick: () => console.log('Navigate to approval settings')
    },
    {
      id: 'otp-verification',
      icon: '🔐',
      title: 'Enable OTP Verification',
      description: 'Mandatorily require your staff to complete tasks by filling in a customer-sent OTP',
      hasToggle: true,
      hasNavigation: false,
      value: otpVerification,
      onChange: () => setOtpVerification(!otpVerification)
    },
    {
      id: 'geo-fence',
      icon: '📍',
      title: 'Enable Geo Fence',
      description: 'Mandatorily require your staff to complete tasks within a specified geo-fence.',
      hasToggle: true,
      hasNavigation: false,
      value: geoFence,
      onChange: () => setGeoFence(!geoFence)
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Task Settings</h1>
        <p className="text-sm text-gray-500">Access settings related to task assignment here.</p>
      </div>

      <div className="space-y-3">
        {settingOptions.map((option) => (
          <div 
            key={option.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer"
            onClick={option.hasNavigation ? option.onClick : undefined}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                {option.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
            
            {option.hasToggle && (
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={option.value}
                  onChange={option.onChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            )}
            
            {option.hasNavigation && (
              <div className="text-gray-400">
                <IoChevronForward size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskSettings