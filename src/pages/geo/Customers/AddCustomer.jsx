import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    name: '',
    contactName: '',
    number: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    canEmployeeChangeAddress: 'No',
    visibleTo: 'All Staff'
  });
  const [showVisibilityOptions, setShowVisibilityOptions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value
    });
  };

  const handleRadioChange = (name, value) => {
    setCustomerData({
      ...customerData,
      [name]: value
    });
  };

  const handleVisibilityChange = (option) => {
    setCustomerData({
      ...customerData,
      visibleTo: option
    });
    setShowVisibilityOptions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing customers from localStorage
    const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    
    // Create new customer with generated ID
    const newCustomer = {
      id: existingCustomers.length > 0 ? Math.max(...existingCustomers.map(c => c.id)) + 1 : 1,
      name: customerData.name,
      contactName: customerData.contactName,
      number: customerData.number,
      email: customerData.email || '-',
      address: customerData.address,
      city: customerData.city,
      pincode: customerData.pincode,
      addedBy: 'HIREN BARIYA', // This would come from auth context in a real app
      addedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      visibleTo: customerData.visibleTo
    };
    
    // Add to existing customers
    const updatedCustomers = [...existingCustomers, newCustomer];
    
    // Save to localStorage
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    
    // Navigate back to customers list
    navigate('/geo/customers');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button 
        onClick={() => navigate('/geo/customers')} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Customers
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Customer</h1>
        <p className="text-sm text-gray-600 mt-1">Add customers to Geo, against which tasks can be assigned to your staff.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter customer name"
                value={customerData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                name="contactName"
                placeholder="Enter contact name"
                value={customerData.contactName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Number
              </label>
              <input
                type="text"
                name="number"
                placeholder="Enter customer number"
                value={customerData.number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email id"
                  value={customerData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Can Employee Change Customer Address
              </label>
              <div className="flex space-x-4">
                <div 
                  className={`flex-1 border rounded-md px-4 py-2 cursor-pointer flex items-center justify-center ${
                    customerData.canEmployeeChangeAddress === 'Yes' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                  onClick={() => handleRadioChange('canEmployeeChangeAddress', 'Yes')}
                >
                  <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                    customerData.canEmployeeChangeAddress === 'Yes' 
                      ? 'border-blue-500' 
                      : 'border-gray-400'
                  }`}>
                    {customerData.canEmployeeChangeAddress === 'Yes' && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  Yes
                </div>
                <div 
                  className={`flex-1 border rounded-md px-4 py-2 cursor-pointer flex items-center justify-center ${
                    customerData.canEmployeeChangeAddress === 'No' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                  onClick={() => handleRadioChange('canEmployeeChangeAddress', 'No')}
                >
                  <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                    customerData.canEmployeeChangeAddress === 'No' 
                      ? 'border-blue-500' 
                      : 'border-gray-400'
                  }`}>
                    {customerData.canEmployeeChangeAddress === 'No' && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  No
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visible to
              </label>
              <div className="relative">
                <div 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between cursor-pointer"
                  onClick={() => setShowVisibilityOptions(!showVisibilityOptions)}
                >
                  <span>{customerData.visibleTo}</span>
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {showVisibilityOptions && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    <div 
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onClick={() => handleVisibilityChange('All Staff')}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        customerData.visibleTo === 'All Staff' 
                          ? 'border-blue-500' 
                          : 'border-gray-400'
                      }`}>
                        {customerData.visibleTo === 'All Staff' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      All Staff
                    </div>
                    <div 
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onClick={() => handleVisibilityChange('No staff')}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        customerData.visibleTo === 'No staff' 
                          ? 'border-blue-500' 
                          : 'border-gray-400'
                      }`}>
                        {customerData.visibleTo === 'No staff' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      No staff
                    </div>
                    <div 
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onClick={() => handleVisibilityChange('Selected staff')}
                    >
                      <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        customerData.visibleTo === 'Selected staff' 
                          ? 'border-blue-500' 
                          : 'border-gray-400'
                      }`}>
                        {customerData.visibleTo === 'Selected staff' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      Selected staff
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Search Address"
                value={customerData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city name"
                  value={customerData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={customerData.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Map will be displayed here</span>
            </div>
          </div>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddCustomer;