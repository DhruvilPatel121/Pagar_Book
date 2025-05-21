import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaDownload, FaEye, FaSync, FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import GeoSidebar from '../components/GeoSidebar';
import { componentStyles } from '../../../theme';

const FormResponses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const templateId = queryParams.get('templateId') || '';
  const dateParam = queryParams.get('date') || '';

  const [date, setDate] = useState(dateParam || new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formTemplates, setFormTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(templateId);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('responses');

  // Fetch form templates
  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockTemplates = [
      { id: '15280', name: 'Customer Feedback Form' },
      { id: '15281', name: 'Site Visit Report' },
      { id: '15282', name: 'Employee Check-in Form' },
      { id: '11', name: 'Default Template 11' }
    ];
    setFormTemplates(mockTemplates);
    
    if (templateId && !selectedTemplate) {
      setSelectedTemplate(templateId);
    }
  }, [templateId, selectedTemplate]);

  // Fetch responses based on selected template and date
  useEffect(() => {
    if (selectedTemplate) {
      setLoading(true);
      
      // Mock data - in a real app, this would be an API call
      setTimeout(() => {
        const mockResponses = [
          {
            id: '1',
            respondent: 'John Doe',
            taskId: 'T-1001',
            location: 'Mumbai, Maharashtra',
            timestamp: '2025-05-20T09:30:00Z',
            status: 'Completed',
            customerVisit: 'Yes',
            industryType: 'Retail',
            companyName: 'ABC Retail Ltd',
            nextCallDate: '2025-06-15',
            contact: '+91 9876543210'
          },
          {
            id: '2',
            respondent: 'Jane Smith',
            taskId: 'T-1002',
            location: 'Delhi, Delhi',
            timestamp: '2025-05-20T10:15:00Z',
            status: 'Completed',
            customerVisit: 'Yes',
            industryType: 'IT',
            companyName: 'Tech Solutions Inc',
            nextCallDate: '2025-06-10',
            contact: '+91 9876543211'
          },
          {
            id: '3',
            respondent: 'Raj Kumar',
            taskId: 'T-1003',
            location: 'Bangalore, Karnataka',
            timestamp: '2025-05-20T11:45:00Z',
            status: 'Pending',
            customerVisit: 'No',
            industryType: 'Manufacturing',
            companyName: 'Kumar Industries',
            nextCallDate: '2025-06-05',
            contact: '+91 9876543212'
          }
        ];
        
        setResponses(mockResponses);
        setLoading(false);
      }, 800);
      
      // Update URL with current parameters
      const newParams = new URLSearchParams();
      newParams.set('templateId', selectedTemplate);
      newParams.set('date', date);
      navigate(`/geo/forms/responses?${newParams.toString()}`);
    }
  }, [selectedTemplate, date, navigate]);

  // Filter responses based on search term
  const filteredResponses = responses.filter(response => 
    response.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format date for display in calendar format
  const formatCalendarDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Handle template change
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  // Export to CSV
  const handleDownload = () => {
    // Implementation for exporting data to CSV
    alert('Downloading data as CSV...');
  };

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  // Add these new state variables for the calendar
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if a date is selected
  const isSelectedDate = (dateToCheck) => {
    const selectedDate = new Date(date);
    return dateToCheck.getDate() === selectedDate.getDate() &&
           dateToCheck.getMonth() === selectedDate.getMonth() &&
           dateToCheck.getFullYear() === selectedDate.getFullYear();
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Select a date from calendar
  const selectDate = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setDate(newDate.toISOString().split('T')[0]);
    setShowFullCalendar(false);
  };
  
  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Create blank days for start of month
    let days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={componentStyles.calendar.emptyDay}></div>);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const isCurrentDay = isToday(dateObj);
      const isSelected = isSelectedDate(dateObj);
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => selectDate(day)}
          className={`
            ${componentStyles.calendar.dayButton}
            ${isCurrentDay ? componentStyles.calendar.currentDay : ''}
            ${isSelected ? componentStyles.calendar.selectedDay : ''}
            ${isCurrentDay && !isSelected ? componentStyles.calendar.todayIndicator : ''}
          `}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="absolute top-full left-0 mt-1 z-50 bg-white shadow-xl rounded-lg border border-gray-200 w-64 overflow-hidden">
        <div className={componentStyles.calendar.header}>
          <button onClick={prevMonth} className={componentStyles.calendar.navButton}>
            <FaChevronLeft />
          </button>
          <div className={componentStyles.calendar.monthYear}>
            {monthNames[month]} {year}
          </div>
          <button onClick={nextMonth} className={componentStyles.calendar.navButton}>
            <FaChevronRight />
          </button>
        </div>
        
        <div className={componentStyles.calendar.daysGrid}>
          {dayNames.map(day => (
            <div key={day} className={componentStyles.calendar.dayLabel}>{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <GeoSidebar />
      <div className="ml-[230px] w-[1050px] flex flex-col h-screen overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm m-6 flex flex-col flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'responses' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('responses')}
            >
              Responses
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'templates' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'reports' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 overflow-hidden">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Forms</h2>
            <p className="text-gray-600 mb-6">See form responses of forms filled by staff while completing a task.</p>
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search by staff name or task ID"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <div className="relative">
                  <button 
                    className="border border-gray-300 rounded-md px-3 py-2 flex items-center gap-2 bg-white"
                    onClick={() => setShowFullCalendar(!showFullCalendar)}
                  >
                    <FaRegCalendarAlt className="text-blue-500" />
                    <span>{formatCalendarDate(date)}</span>
                  </button>
                  
                  {showFullCalendar && renderCalendar()}
                </div>
                
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                >
                  <option value="">Default Template 11</option>
                  {formTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={handleRefresh}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <FaSync className="mr-2" />
                  <span>Refresh</span>
                </button>
                
                <button 
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <FaDownload className="mr-2" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md flex-1 overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center p-8 h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="overflow-auto max-h-[calc(100vh-320px)]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Task ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Industry Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Next Call or Visit Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredResponses.length > 0 ? (
                        filteredResponses.map(response => (
                          <tr key={response.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{response.respondent}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{response.taskId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{response.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{response.customerVisit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                response.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {response.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{response.industryType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{response.companyName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{formatDate(response.nextCallDate)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{response.contact}</div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                            No responses found
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

export default FormResponses;