import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { componentStyles, colors, typography, spacing } from '../../../theme';

const BusinessOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const ds = componentStyles.geoPage.dashboard;  // Make sure this line is present

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      return '';
    }
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const navigateDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className={ds.businessTable.container}>
      <div className={ds.businessTable.header}>
        <h2 className={ds.businessTable.title}>Business Overview</h2>
        <p className={ds.businessTable.subtitle}>See staff punch-in / punch-out times, number of tasks done, and average task duration</p>
      </div>
      
      <div className={ds.businessTable.controls}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by name or staff ID" 
            className={ds.businessTable.search}
          />
          <svg className={ds.businessTable.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center ${spacing.smallGap}`}>
            <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
              <FaChevronLeft />
            </button>
            <div className={`flex items-center ${spacing.smallGap} ${typography.normal} relative`}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd MMM yy"
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                customInput={
                  <button type="button" className="flex items-center justify-between cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 shadow-sm w-44 text-left">
                    <span className="font-medium text-gray-700">{formatDate(selectedDate)}</span>
                    <FaCalendarAlt className={colors.primary.icon} size={16} />
                  </button>
                }
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 8],
                    },
                  },
                  {
                    name: 'preventOverflow',
                    options: {
                      rootBoundary: 'viewport',
                      tether: false,
                      altAxis: true,
                    },
                  },
                ]}
                popperClassName="z-50"
                calendarClassName="shadow-lg border border-gray-200 rounded-lg"
                dayClassName={date => {
                  const isCurrentDay = 
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();
                  
                  const isToday = 
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();
                  
                  if (isCurrentDay) return componentStyles.calendar.currentDay;
                  if (isToday) return componentStyles.calendar.todayIndicator;
                  return componentStyles.calendar.dayButton;
                }}
              />
            </div>
            <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      
      {/* Add the table */}
      <div className="overflow-x-auto">
        <table className={ds.businessTable.table}>
          <thead>
            <tr className={ds.businessTable.tableHeader}>
              <th className={ds.businessTable.tableHeaderCell}>Name</th>
              <th className={ds.businessTable.tableHeaderCell}>Staff ID</th>
              <th className={ds.businessTable.tableHeaderCell}>Punched In At</th>
              <th className={ds.businessTable.tableHeaderCell}>Punched Out At</th>
              <th className={ds.businessTable.tableHeaderCell}>Total Tasks Completed</th>
              <th className={ds.businessTable.tableHeaderCell}>Total Forms Added</th>
              <th className={ds.businessTable.tableHeaderCell}>Average Task Duration</th>
            </tr>
          </thead>
          <tbody className={ds.businessTable.tableBody}>
            <tr>
              <td className={ds.businessTable.nameCell}>
                <div className="flex items-center">
                  <div className={ds.businessTable.avatar.blue}>H</div>
                  <div className={ds.businessTable.nameText}>HIREN BARIYA</div>
                </div>
              </td>
              <td className={ds.businessTable.tableCell}>1038</td>
              <td className={ds.businessTable.tableCell}>09:28 am</td>
              <td className={ds.businessTable.tableCell}>-</td>
              <td className={ds.businessTable.tableCell}>2</td>
              <td className={ds.businessTable.tableCell}>0</td>
              <td className={ds.businessTable.tableCell}>0 min</td>
            </tr>
            <tr>
              <td className={ds.businessTable.nameCell}>
                <div className="flex items-center">
                  <div className={ds.businessTable.avatar.gray}>R</div>
                  <div className={ds.businessTable.nameText}>RAUNAKBHAI TANNA</div>
                </div>
              </td>
              <td className={ds.businessTable.tableCell}>1035</td>
              <td className={ds.businessTable.tableCell}>09:11 am</td>
              <td className={ds.businessTable.tableCell}>-</td>
              <td className={ds.businessTable.tableCell}>0</td>
              <td className={ds.businessTable.tableCell}>0</td>
              <td className={ds.businessTable.tableCell}>0 min</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessOverview;