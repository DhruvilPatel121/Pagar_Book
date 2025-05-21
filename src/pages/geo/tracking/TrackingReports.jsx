import React from 'react'
import { FiDownload, FiClock } from 'react-icons/fi';
import { componentStyles, borders, effects } from '../../../theme';

function TrackingReports() {
  return (
    <div className={`p-4 bg-white ${borders.roundedLg} ${effects.shadowSm} overflow-hidden`}>
       <h2 className="text-xl font-medium pb-4">Tracking Reports</h2>
       <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          {/* Left side with icon and text */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiClock className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">Timeline Report</h3>
              <p className="text-sm text-gray-500">
                Get the list of timeline activities performed by your staff over a date-range.
              </p>
            </div>
          </div>

          {/* Download button */}
          <button 
            className={`flex items-center space-x-2 ${componentStyles.reviewButton}`}
            onClick={() => {/* Handle download */}}
          >
            <FiDownload className="text-lg" />
            <span>Download</span>
          </button>
        </div>
       {/* Add reports implementation here */}
    </div>
  )
}

export default TrackingReports