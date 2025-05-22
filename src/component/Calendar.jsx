import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { componentStyles } from '../theme';

const Calendar = ({ onClose, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const styles = componentStyles.calendar;

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="absolute bg-white shadow-xl rounded-lg border border-gray-200 w-64 overflow-hidden right-0 top-full z-50">
      <div className={styles.header}>
        <button onClick={handlePrevMonth} className={styles.navButton}>&lt;</button>
        <span className={styles.monthYear}>
          {format(currentDate, 'MMMM yyyy')}
        </span>
        <button onClick={handleNextMonth} className={styles.navButton}>&gt;</button>
      </div>
      
      <div className={styles.daysGrid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.dayLabel}>{day}</div>
        ))}
        
        {days.map(day => (
          <button
            key={day.toString()}
            className={`${styles.dayButton} ${
              isSameDay(day, new Date()) ? styles.currentDay : ''
            } ${!isSameMonth(day, currentDate) ? styles.emptyDay : ''}`}
            onClick={() => {
              onSelect?.(day);
              onClose?.();
            }}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;