import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import GeoSidebar from '../components/GeoSidebar';
import { componentStyles, colors, borders, effects } from '../../../theme';
import FormsHeader from './components/FormsHeader';

const FormReports = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    // Simulate download process
    setTimeout(() => {
      setLoading(false);
      alert('Report downloaded successfully');
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <GeoSidebar />
      <div className="ml-[230px] w-[calc(100%-250px)] flex flex-col h-screen overflow-hidden">
        <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} m-6 flex flex-col flex-1 overflow-hidden`}>
          {/* Use FormsHeader component */}
          <FormsHeader />

          {/* Content */}
          <div className="p-6 flex flex-col h-auto flex-1 overflow-hidden">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Reports</h2>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Form Details</h3>
                    <p className="text-sm text-gray-600">See the details of forms filled by employees while completing tasks.</p>
                  </div>
                </div>
                <button 
                  onClick={handleDownload}
                  className={`${colors.primary.button} text-white px-4 py-2 ${borders.rounded} flex items-center ${effects.transition}`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FaDownload className="mr-2" />
                  )}
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormReports;