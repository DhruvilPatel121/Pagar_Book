import React, { useState } from 'react'
import { FaFileAlt, FaCog, FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa'
import { colors, componentStyles, typography, spacing } from '../theme.js'

function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full">
      <header className={componentStyles.header}>
        <div className="flex justify-between items-center">
          <h1 className={typography.header}>Attendance Summary</h1>
          <div className={`flex items-center ${spacing.gap}`}>
            <button className={componentStyles.reportButton}>
              <FaFileAlt />
              <span>Daily Report</span>
            </button>
            <button className={componentStyles.actionButton}>
              <FaCog className="text-lg" />
            </button>
          </div>
        </div>
      </header>
      
      <div className={componentStyles.dateBar}>
        <div className={`flex items-center ${spacing.smallGap}`}>
          <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
            <FaChevronLeft />
          </button>
          <div className={`flex items-center ${spacing.smallGap} ${typography.normal}`}>
            <span>{formatDate(currentDate)}</span>
            <FaCalendarAlt className={colors.primary.icon} />
          </div>
          <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton}>
            <FaChevronRight />
          </button>
        </div>
        
        <div className={`flex items-center ${spacing.gap}`}>
          <div className="flex items-center">
            <span className={`${colors.text.alert} mr-2`}>●</span>
            <span>Total Pending for Approval : 1</span>
          </div>
          <button className={componentStyles.reviewButton}>
            Review
          </button>
        </div>
      </div>
      
      <div className={spacing.container}> 
        {/* Your attendance content will go here */}
      </div>
    </div>
  )
}

export default Attendance
