import React, { useState } from 'react';
import { FaCalendarAlt, FaTimes, FaInfoCircle, FaChevronDown, FaPlus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Calendar from '../../../../component/Calendar';
import 'leaflet/dist/leaflet.css';
import CustomFieldDialog from './CustomFieldDialog';
const AddAssignTask = ({ onClose, staffName, onSave }) => {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString(),
    customerName: '',
    contactNumber: '',
    address: '',
    startTime: '',
    endTime: '',
    description: '',
    isRepeat: false
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [location, setLocation] = useState([22.3072, 73.1812]); // Default location
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [customFields, setCustomFields] = useState({
  forStaff: { field: 'OM ENTERPRISE', value: '' },
  forEmployers: []
  });
  const [showCustomFieldDialog, setShowCustomFieldDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateSelect = (date) => {
    setFormData(prev => ({ ...prev, date: date.toLocaleDateString() }));
    setShowCalendar(false);
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCustomFieldChange = (type, field, value) => {
  setCustomFields(prev => ({
    ...prev,
    [type]: type === 'forStaff' 
      ? { ...prev.forStaff, value }
      : [...prev.forEmployers, { field, value }]
  }));
};

  // Add new handler
  const handleCustomFieldSave = (fieldData) => {
  setCustomFields(prev => ({
    ...prev,
    forEmployers: [...prev.forEmployers, fieldData]
  }));
  setShowCustomFieldDialog(false);
};

  return (
    <>
      {/* Update the overlay to cover entire viewport */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000]" />
      <div className="fixed inset-y-0 right-5 top-6 bottom-6 w-[700px] bg-white shadow-lg z-[1001] overflow-y-auto rounded-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Add Task <span className="text-gray-500">| {staffName}</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FaTimes size={20} />
            </button>
          </div>
    
          {/* Form */}
          <div className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-sm mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.date}
                  readOnly
                  className="w-full p-2 border rounded-lg pr-10"
                />
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <FaCalendarAlt className="text-blue-600 cursor-pointer" />
                </button>
                {showCalendar && (
                  <div className="absolute right-0 top-full mt-1 z-50">
                    <Calendar onSelect={handleDateSelect} onClose={() => setShowCalendar(false)} />
                  </div>
                )}
              </div>
            </div>
    
            {/* Customer Name */}
            <div>
              <label className="block text-sm mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <select
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg cursor-pointer"
              >
                <option value="">Select Customer</option>
                {/* Add your customer options here */}
              </select>
            </div>
    
            {/* Contact Number */}
            <div>
              <label className="block text-sm mb-1">Customer contact number</label>
              <div className="flex">
                <span className="bg-gray-50 border rounded-l-lg px-3 py-2 text-gray-500">+91</span>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter customer's contact number"
                  className="flex-1 p-2 border rounded-r-lg"
                />
              </div>
            </div>
    
            {/* Address */}
            <div>
              <label className="block text-sm mb-1">Address</label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Search Address"
                  className="w-full p-2 border rounded-lg pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaTimes />
                </button>
              </div>
              {/* Map */}
              <div className="h-[200px] mt-2 rounded-lg overflow-hidden">
                <MapContainer
                  center={location}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={location} />
                </MapContainer>
              </div>
            </div>
    
            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg cursor-pointer"
                />
              </div>
            </div>
    
            {/* Description */}
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="w-full p-2 border rounded-lg h-24"
              />
            </div>
    
            {/* Custom Fields */}
            <div>
              <button className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer"
                onClick={() => setShowCustomFields(!showCustomFields)}>
                <span className="text-sm">Custom Fields</span>
                <FaChevronDown  className="text-gray-400 cursor-pointer" />
              </button>
              {showCustomFields && (
    <div className="mt-2 border rounded-lg p-4 space-y-6">
      {/* For Staff Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">For Staff</span>
          <FaInfoCircle  className="text-gray-400 text-sm" />
        </div>
        <div className="flex gap-2">
          <select 
            className="flex-1 p-2 border rounded-lg text-sm"
            value={customFields.forStaff.field}
            onChange={(e) => handleCustomFieldChange('forStaff', 'field', e.target.value)}
          >
            <option value="OM ENTERPRISE">OM ENTERPRISE</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="text"
            placeholder="Value : Text"
            className="flex-1 p-2 border rounded-lg text-sm"
            value={customFields.forStaff.value}
            onChange={(e) => handleCustomFieldChange('forStaff', 'value', e.target.value)}
          />
          <button className="text-red-500 hover:text-red-600 cursor-pointer">
            <MdDelete size={20} />
          </button>
        </div>
      </div>
      {/* For Employers Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">For Employers</span>
          <FaInfoCircle className="text-gray-400 text-sm" />
        </div>
        <button 
          className="flex items-center gap-2 text-blue-600 text-sm cursor-pointer"
          onClick={() => setShowCustomFieldDialog(true)}
        >
          <FaPlus size={14} />
          Add Custom Field
        </button>
      </div>
    </div>
  )}
  {showCustomFieldDialog && (
  <CustomFieldDialog
    onClose={() => setShowCustomFieldDialog(false)}
    onSave={handleCustomFieldSave}
  />
)}
            </div>
    
            {/* Repeat Task */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isRepeat"
                checked={formData.isRepeat}
                onChange={handleInputChange}
                className="rounded border-gray-300 cursor-pointer"
              />
              <label className="text-sm flex items-center gap-2">
                Is this Task supposed to Repeat?
                <FaInfoCircle className="text-gray-400" />
              </label>
            </div>
    
            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white text-blue-600 py-2 rounded-lg border border-blue-600 hover:bg-blue-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssignTask;
