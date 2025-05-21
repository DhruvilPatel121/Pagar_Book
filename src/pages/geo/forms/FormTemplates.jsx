import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPen, FaPlus } from 'react-icons/fa';
import GeoSidebar from '../components/GeoSidebar';
import { componentStyles, colors, borders, effects } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import FormsHeader from './components/FormsHeader';

const FormTemplates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch templates
  useEffect(() => {
    // Check localStorage for any saved templates
    const savedTemplates = JSON.parse(localStorage.getItem('formTemplates') || '[]');
    
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockTemplates = [
        { 
          id: '11', 
          name: 'Default Template 11', 
          createdOn: '2024-06-17', 
          createdBy: 'OM ENTERPRISE', 
          deactivatedAt: null, 
          status: true, 
          mandatory: false 
        },
        { 
          id: '15280', 
          name: 'Customer Feedback Form', 
          createdOn: '2024-06-15', 
          createdBy: 'OM ENTERPRISE', 
          deactivatedAt: null, 
          status: true, 
          mandatory: true 
        },
        { 
          id: '15281', 
          name: 'Site Visit Report', 
          createdOn: '2024-06-10', 
          createdBy: 'OM ENTERPRISE', 
          deactivatedAt: null, 
          status: true, 
          mandatory: false 
        },
        { 
          id: '15282', 
          name: 'Employee Check-in Form', 
          createdOn: '2024-06-05', 
          createdBy: 'OM ENTERPRISE', 
          deactivatedAt: null, 
          status: true, 
          mandatory: false 
        }
      ];
      
      // Combine mock templates with saved templates
      // Use a Map to ensure no duplicates by ID
      const templatesMap = new Map();
      
      // Add mock templates to map
      mockTemplates.forEach(template => {
        templatesMap.set(template.id, template);
      });
      
      // Add saved templates to map (will overwrite mock templates with same ID)
      savedTemplates.forEach(template => {
        templatesMap.set(template.id, template);
      });
      
      // Convert map values back to array
      setTemplates(Array.from(templatesMap.values()));
      setLoading(false);
    }, 800);
  }, []);

  // Filter templates based on search term
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle create template
  const handleCreateTemplate = () => {
    console.log('Creating new template...');
    navigate('/geo/forms/templates/new');
  };
  
  // Update the handleEditTemplate function
  const handleEditTemplate = (id) => {
    navigate(`/geo/forms/templates/edit/${id}`);
  };

  // Toggle template status
  const toggleStatus = (id) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, status: !template.status } : template
    ));
  };

  // Toggle mandatory status
  const toggleMandatory = (id) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, mandatory: !template.mandatory } : template
    ));
  };

  return (
    <div className="flex h-screen w-auto overflow-hidden">
      <GeoSidebar />
      <div className="ml-[230px] w-[calc(100%-250px)] flex flex-col h-full overflow-hidden">
        <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} m-6 flex flex-col flex-1 overflow-hidden`}>
          {/* Use FormsHeader component */}
          <FormsHeader />

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">Form Templates</h2>
                <p className="text-gray-600">Create form templates that will be visible to staff while adding forms to their assigned tasks.</p>
              </div>
              <button 
                onClick={handleCreateTemplate}
                className={`${colors.primary.button} text-white px-4 py-2 ${borders.rounded} flex items-center ${effects.transition}`}
              >
                <FaPlus className="mr-2" />
                <span>Create Template</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search template name"
                  className={componentStyles.faceAttendance.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className={componentStyles.faceAttendance.searchIcon} />
              </div>
              
              <button className={`${borders.card} ${borders.rounded} px-3 py-2 flex items-center gap-2 bg-white`}>
                <FaFilter className={colors.primary.icon} />
                <span>Filter</span>
              </button>
            </div>
            
            <div className={`${borders.card} ${borders.rounded} flex-1 overflow-hidden`}>
              {loading ? (
                <div className="flex justify-center items-center p-8 h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-auto max-h-[calc(100vh-320px)]">
                  <table className={componentStyles.staffTable.table}>
                    <thead className={componentStyles.staffTable.header}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Template Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created on
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deactivated at
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mandatory
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTemplates.length > 0 ? (
                        filteredTemplates.map(template => (
                          <tr key={template.id} className={componentStyles.staffTable.row}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{template.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{formatDate(template.createdOn)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{template.createdBy}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{template.deactivatedAt ? formatDate(template.deactivatedAt) : '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <label className="inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={template.status}
                                  onChange={() => toggleStatus(template.id)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <label className="inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={template.mandatory}
                                  onChange={() => toggleMandatory(template.id)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </td>
                           
                            <td className="px-9 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                onClick={() => handleEditTemplate(template.id)}
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                <FaPen className="mr-1" />
                                <span>Edit</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                            No templates found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTemplates;