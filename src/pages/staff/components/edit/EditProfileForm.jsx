import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';

const EditProfileForm = ({ data, onSave, onCancel }) => {
  const [formData, setFormData] = useState(data);
  const [profileImage, setProfileImage] = useState(data.profileImage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="bg-white rounded-lg ">
        <div className="p-4">
          <h2 className="font-medium">Profile Picture</h2>
        </div>
        <div className="p-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl text-gray-400">{formData.name?.[0]?.toUpperCase() || 'A'}</span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <FiCamera className="text-white w-5 h-5" />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg">
        <div className="p-4">
          <h2 className="font-medium">Basic Information</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Staff Type</label>
              <select
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Staff Type</option>
                <option value="Regular">Regular</option>
                <option value="Contractual (monthly)">Contractual (monthly)</option>
                <option value="Contractual (daily)">Contractual (daily)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg">
        <div className="p-4">
          <h2 className="font-medium">Contact Information</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white rounded-lg">
        <div className="p-4">
          <h2 className="font-medium">Work Information</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Production">Production</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
              <select
                name="shift"
                value={formData.shift || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Shift</option>
                <option value="PRODUCTION SHIFT">Production Shift</option>
                <option value="NIGHT SHIFT">Night Shift</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Manager</label>
              <input
                type="text"
                name="reportingManager"
                value={formData.reportingManager || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
              <input
                type="text"
                name="workLocation"
                value={formData.workLocation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm