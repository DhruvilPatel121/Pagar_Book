import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt,  FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { componentStyles, colors, typography, spacing } from '../../../theme';

const BusinessOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const ds = componentStyles.geoPage.dashboard;
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Calendar component
  const Calendar = () => {
    const [viewDate, setViewDate] = useState(new Date(selectedDate));

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleDateClick = (day) => {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      setSelectedDate(newDate);
      setShowCalendar(false);
    };

    const changeMonth = (increment) => {
      const newDate = new Date(viewDate);
      newDate.setMonth(viewDate.getMonth() + increment);
      setViewDate(newDate);
    };

    return (
      <div className={componentStyles.calendar.container}>
        <div className={componentStyles.calendar.header}>
          <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(-1)}>
            <FaChevronLeft />
          </button>
          <div className={componentStyles.calendar.monthYear}>
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
          <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(1)}>
            <FaChevronRight />
          </button>
        </div>

        <div className={componentStyles.calendar.daysGrid}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
            <div key={i} className={componentStyles.calendar.dayLabel}>{day}</div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className={componentStyles.calendar.emptyDay}>.</div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isCurrentDay =
              day === selectedDate.getDate() &&
              viewDate.getMonth() === selectedDate.getMonth() &&
              viewDate.getFullYear() === selectedDate.getFullYear();

            const isToday =
              day === new Date().getDate() &&
              viewDate.getMonth() === new Date().getMonth() &&
              viewDate.getFullYear() === new Date().getFullYear();

            let className = componentStyles.calendar.dayButton;
            if (isCurrentDay) {
              className = `${className} ${componentStyles.calendar.currentDay}`;
            } else if (isToday) {
              className = `${className} ${componentStyles.calendar.todayIndicator}`;
            }

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={className}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-2 px-2">
          <button
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={() => {
              setSelectedDate(new Date());
              setShowCalendar(false);
            }}
          >
            Today
          </button>
        </div>
      </div>
    );
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
          <div className={`flex items-center ${spacing.smallGap}`} ref={calendarRef}>
            <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
              <FaChevronLeft />
            </button>
            <div className={`flex items-center ${spacing.smallGap} ${typography.normal} relative`}>
              <button 
                type="button" 
                className="flex items-center justify-between cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 shadow-sm w-44 text-left"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span className="font-medium text-gray-700">{formatDate(selectedDate)}</span>
                <FaCalendarAlt className={colors.primary.icon} size={16} />
              </button>
              {showCalendar && <Calendar />}
            </div>
            <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      
      {/* Table content remains the same */}
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