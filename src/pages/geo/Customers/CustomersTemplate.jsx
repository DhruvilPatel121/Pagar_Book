import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaSave, FaTrash, FaInfoCircle, FaGripVertical, FaPencilAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';

const CustomersTemplate = () => {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('Default Template');
  const [isEditingName, setIsEditingName] = useState(false);
  const [fields, setFields] = useState([
    { id: 1, name: 'Customer Name', type: 'Text', required: true, isDefault: true, allowDuplicates: false },
    { id: 2, name: 'Customer Number', type: 'Phone Number', required: false, isDefault: true, allowDuplicates: false },
    { id: 3, name: 'Address', type: 'Address', required: true, isDefault: true, allowDuplicates: false },
    { id: 4, name: 'Email ID', type: 'Email', required: false, isDefault: true, allowDuplicates: false },
    { id: 5, name: 'City', type: 'Text', required: false, isDefault: true, allowDuplicates: false },
    { id: 6, name: 'Pincode', type: 'Number', required: false, isDefault: true, allowDuplicates: false },
    { id: 7, name: 'Contact Name', type: 'Text', required: false, isDefault: false, allowDuplicates: false },
  ]);
  const [newField, setNewField] = useState({ name: '', type: 'Text', required: false, allowDuplicates: false });
  const [showAddField, setShowAddField] = useState(false);

  const handleAddField = () => {
    if (newField.name.trim() === '') return;
    
    setFields([
      ...fields,
      {
        id: Date.now(),
        name: newField.name,
        type: newField.type,
        required: newField.required,
        allowDuplicates: newField.allowDuplicates,
        isDefault: false
      }
    ]);
    setNewField({ name: '', type: 'Text', required: false, allowDuplicates: false });
    setShowAddField(false);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleToggleRequired = (id) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, required: !field.required } : field
    ));
  };

  const handleToggleDuplicates = (id) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, allowDuplicates: !field.allowDuplicates } : field
    ));
  };

  const handleSaveTemplate = () => {
    // In a real app, you would save this to your backend
    console.log('Saving template:', { name: templateName, fields });
    // Show success message and navigate back
    setTimeout(() => {
      navigate('/geo/customers/settings');
    }, 1000);
  };

  return (
    <div className="bg-white px-4 py-6">
      <button 
        onClick={() => navigate('/geo/customers/settings')} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="mb-8 flex items-center">
        {isEditingName ? (
          <div className="flex items-center">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none mr-2"
              autoFocus
            />
            <button 
              onClick={() => setIsEditingName(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaPencilAlt />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 mr-2">{templateName}</h1>
            <button 
              onClick={() => setIsEditingName(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaPencilAlt />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-medium text-gray-800 p-4 border-b border-gray-200">System generated fields</h2>
        
        <div className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
          <div>Display Name</div>
          <div>Value</div>
          <div>Options</div>
        </div>
        
        <div>
          {fields.filter(field => field.isDefault).map(field => (
            <div key={field.id} className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-gray-200">
              <div className="text-gray-700">
                {field.name}
              </div>
              <div className="text-gray-700">
                {field.type}
              </div>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={() => handleToggleRequired(field.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Mandatory Field</span>
                </label>
                
                {field.name === 'Customer Number' && (
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={field.allowDuplicates}
                      onChange={() => handleToggleDuplicates(field.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow Duplicates</span>
                    <FaInfoCircle className="ml-1 text-gray-400 cursor-help" title="Allow duplicate phone numbers for different customers" />
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-medium text-gray-800 p-4 border-b border-gray-200">Custom Fields</h2>
        
        {fields.filter(field => !field.isDefault).length > 0 ? (
          <div>
            {fields.filter(field => !field.isDefault).map(field => (
              <div key={field.id} className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 items-center">
                <div className="col-span-1 flex justify-center">
                  <FaGripVertical className="text-gray-400 cursor-move" />
                </div>
                <div className="col-span-4">
                  <div className="bg-gray-100 rounded-md p-3 text-gray-700">
                    {field.name}
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="bg-gray-100 rounded-md p-3 text-gray-700 flex items-center justify-between">
                    {field.type}
                    <span className="text-gray-500">▼</span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={() => handleToggleRequired(field.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Mandatory Field</span>
                  </label>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button 
                    onClick={() => handleRemoveField(field.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No custom fields added yet.
          </div>
        )}

        {showAddField ? (
          <div className="p-4 border-t border-gray-200">
            <div className="p-4 border border-dashed border-gray-300 rounded-md">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 flex justify-center">
                  <FaGripVertical className="text-gray-400" />
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={newField.name}
                    onChange={(e) => setNewField({...newField, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Field Name"
                    autoFocus
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({...newField, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Email">Email</option>
                    <option value="Phone Number">Phone Number</option>
                    <option value="Date">Date</option>
                    <option value="Dropdown">Dropdown</option>
                    <option value="Address">Address</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newField.required}
                      onChange={(e) => setNewField({...newField, required: e.target.checked})}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Mandatory Field</span>
                  </label>
                </div>
                <div className="col-span-1 flex justify-center space-x-2">
                  <button 
                    onClick={handleAddField}
                    className="text-green-500 hover:text-green-700"
                    title="Add Field"
                  >
                    <IoMdCheckmarkCircle size={20} />
                  </button>
                  <button 
                    onClick={() => setShowAddField(false)}
                    className="text-red-500 hover:text-red-700"
                    title="Cancel"
                  >
                    <IoMdCloseCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setShowAddField(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add Field
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-2 left-78 right-6 bg-white rounded-xl border-t border-gray-800 p-4 flex justify-end z-10">
        <div className="max-w-5xl w-full mx-auto flex justify-between">
          <button
            onClick={() => navigate('/geo/customers/settings')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveTemplate}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaSave className="mr-2" /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTemplate;