import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import GeoSidebar from '../components/GeoSidebar';
import { colors, borders, effects } from '../../../theme';
import FormsHeader from './components/FormsHeader';

const FormTemplateEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [templateName, setTemplateName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [fields, setFields] = useState([
    { id: 1, label: 'Client Name', type: 'Text', mandatory: false },
    { id: 2, label: 'Client Phone Number', type: 'Text', mandatory: false },
    { id: 3, label: 'Proof', type: 'Image', mandatory: false, cameraOnly: false },
    { id: 4, label: 'Remarks', type: 'Dropdown', mandatory: false, options: ['Good', 'Bad'] }
  ]);
  const [isFormMandatory, setIsFormMandatory] = useState(false);

  // Field types available for selection
  const fieldTypes = ['Text', 'Number', 'Date', 'Time', 'Dropdown', 'Checkbox', 'Radio', 'Image', 'Signature', 'Location'];

  useEffect(() => {
    // If editing an existing template, fetch data
    if (id) {
      // Mock fetch for demo
      setTemplateName('Template Name');
      // In a real app, you would fetch the template data from an API
    }
  }, [id]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setTemplateName(value);
    setIsNameValid(value.trim() !== '');
  };

  const handleAddField = () => {
    const newField = {
      id: Date.now(),
      label: 'New Field',
      type: 'Text',
      mandatory: false
    };
    setFields([...fields, newField]);
  };

  const handleFieldLabelChange = (id, value) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, label: value } : field
    ));
  };

  const handleFieldTypeChange = (id, value) => {
    setFields(fields.map(field => {
      if (field.id === id) {
        const updatedField = { ...field, type: value };
        
        // Add type-specific properties
        if (value === 'Dropdown' && !field.options) {
          updatedField.options = ['Option 1', 'Option 2'];
        } else if (value === 'Image' && field.cameraOnly === undefined) {
          updatedField.cameraOnly = false;
        }
        
        return updatedField;
      }
      return field;
    }));
  };

  const handleToggleMandatory = (id) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, mandatory: !field.mandatory } : field
    ));
  };

  const handleToggleCameraOnly = (id) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, cameraOnly: !field.cameraOnly } : field
    ));
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleAddOption = (fieldId) => {
    setFields(fields.map(field => {
      if (field.id === fieldId) {
        const options = field.options || [];
        return { ...field, options: [...options, `Option ${options.length + 1}`] };
      }
      return field;
    }));
  };

  const handleOptionChange = (fieldId, optionIndex, value) => {
    setFields(fields.map(field => {
      if (field.id === fieldId && field.options) {
        const newOptions = [...field.options];
        newOptions[optionIndex] = value;
        return { ...field, options: newOptions };
      }
      return field;
    }));
  };

  const handleDeleteOption = (fieldId, optionIndex) => {
    setFields(fields.map(field => {
      if (field.id === fieldId && field.options) {
        const newOptions = field.options.filter((_, index) => index !== optionIndex);
        return { ...field, options: newOptions };
      }
      return field;
    }));
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      setIsNameValid(false);
      return;
    }

    // Create template object
    const newTemplate = {
      id: id || Date.now().toString(),
      name: templateName,
      createdOn: new Date().toISOString().split('T')[0],
      createdBy: 'OM ENTERPRISE',
      deactivatedAt: null,
      status: true,
      mandatory: isFormMandatory,
      fields: fields
    };

    // In a real app, you would save the template to an API
    console.log('Saving template:', newTemplate);
    
    // Store in localStorage to persist between page navigations
    const existingTemplates = JSON.parse(localStorage.getItem('formTemplates') || '[]');
    
    if (id) {
      // Update existing template
      const updatedTemplates = existingTemplates.map(template => 
        template.id === id ? newTemplate : template
      );
      localStorage.setItem('formTemplates', JSON.stringify(updatedTemplates));
    } else {
      // Add new template
      localStorage.setItem('formTemplates', JSON.stringify([...existingTemplates, newTemplate]));
    }
    
    // Navigate back to templates list
    navigate('/geo/forms/templates');
  };

  const handleCancel = () => {
    navigate('/geo/forms/templates');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <GeoSidebar />
      <div className="ml-[230px] w-[calc(100%-250px)] flex flex-col h-screen overflow-hidden">
        <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} m-6 flex flex-col flex-1 overflow-hidden`}>
          {/* Use FormsHeader component */}
          <FormsHeader />
          
          {/* Header with back button */}
          <div className="p-4 border-b border-gray-200">
            <button 
              onClick={() => navigate('/geo/forms/templates')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaArrowLeft className="mr-2" />
              <span>Back</span>
            </button>
          </div>

          <div className="p-6 flex flex-col flex-1 overflow-auto">
            {/* Template name input */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Template Name"
                  value={templateName}
                  onChange={handleNameChange}
                  className={`w-full p-3 border ${isNameValid ? 'border-gray-200' : 'border-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all`}
                />
                {!isNameValid && (
                  <p className="mt-1 text-sm text-red-500">Template name is required</p>
                )}
              </div>
            </div>

            {/* Field Properties Section */}
            <div className={`${borders.card} ${borders.roundedLg} p-6 mb-6`}>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Field Properties</h2>
              
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                    <div className="p-2 cursor-move">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Field Label */}
                      <div>
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => handleFieldLabelChange(field.id, e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="Field Label"
                        />
                      </div>
                      
                      {/* Field Type */}
                      <div className="relative">
                        <select
                          value={field.type}
                          onChange={(e) => handleFieldTypeChange(field.id, e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                        >
                          {fieldTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Dropdown Options */}
                      {field.type === 'Dropdown' && field.options && (
                        <div className="col-span-2 mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-700">Options</h3>
                            <button
                              type="button"
                              onClick={() => handleAddOption(field.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                            >
                              <FaPlus className="mr-1" size={12} />
                              Add Option
                            </button>
                          </div>
                          
                          <div className="space-y-2 pl-2 border-l-2 border-gray-200">
                            {field.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(field.id, optionIndex, e.target.value)}
                                  className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDeleteOption(field.id, optionIndex)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Field Options */}
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.mandatory}
                          onChange={() => handleToggleMandatory(field.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Mandatory Field</span>
                      </label>
                      
                      {field.type === 'Image' && (
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={field.cameraOnly}
                            onChange={() => handleToggleCameraOnly(field.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Camera Only</span>
                        </label>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => handleDeleteField(field.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={handleAddField}
                className={`mt-4 ${colors.primary.button} text-white px-4 py-2 ${borders.rounded} flex items-center ${effects.transition}`}
              >
                <FaPlus className="mr-2" />
                Add Fields
              </button>
            </div>
            
            {/* Form Settings */}
            <div className="flex items-center mb-6">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isFormMandatory}
                  onChange={() => setIsFormMandatory(!isFormMandatory)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Make form mandatory</span>
              </label>
              <div className="ml-2 text-gray-500 cursor-help">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Footer with action buttons */}
          <div className="p-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`${colors.primary.button} text-white px-6 py-2 ${borders.rounded} ${effects.transition}`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTemplateEditor;