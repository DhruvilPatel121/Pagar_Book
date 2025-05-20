import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { componentStyles, colors } from '../../../theme';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DistanceChart = () => {
  const ds = componentStyles.geoPage.dashboard;
  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 6)), 
    new Date()
  ]);
  const [startDate, endDate] = dateRange;
  
  const distanceData = [
    { name: '12 May', distance: 75 },
    { name: '13 May', distance: 50 },
    { name: '14 May', distance: 70 },
    { name: '15 May', distance: 68 },
    { name: '16 May', distance: 120 },
    { name: '17 May', distance: 75 },
    { name: '18 May', distance: 10 },
  ];

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

  const formatDateRange = (start, end) => {
    if (!(start instanceof Date) || !(end instanceof Date)) {
      return '12 May \'25 - 18 May \'25';
    }
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const [selectedOption, setSelectedOption] = useState('Last 7 days');

  // Update date range when dropdown option changes
  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    
    const today = new Date();
    
    if (option === 'Last 7 days') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 6);
      setDateRange([weekAgo, today]);
    } else if (option === 'Last 30 days') {
      const monthAgo = new Date();
      monthAgo.setDate(today.getDate() - 29);
      setDateRange([monthAgo, today]);
    } else if (option === 'Custom') {
      setShowCalendar(true);
    }
  };

  // Calendar component for date range selection
  const Calendar = () => {
    const [viewDate, setViewDate] = useState(new Date(startDate));
    const [selecting, setSelecting] = useState(false);
    const [tempRange, setTempRange] = useState([startDate, endDate]);

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleDateClick = (day) => {
      const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      
      if (!selecting) {
        // Start new selection
        setTempRange([clickedDate, null]);
        setSelecting(true);
      } else {
        // Complete selection
        let newRange;
        if (clickedDate < tempRange[0]) {
          newRange = [clickedDate, tempRange[0]];
        } else {
          newRange = [tempRange[0], clickedDate];
        }
        setTempRange(newRange);
        setDateRange(newRange);
        setSelecting(false);
        setShowCalendar(false);
      }
    };

    const changeMonth = (increment) => {
      const newDate = new Date(viewDate);
      newDate.setMonth(viewDate.getMonth() + increment);
      setViewDate(newDate);
    };

    const isInRange = (day) => {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const range = selecting ? tempRange : dateRange;
      
      return range[0] && range[1] && 
             date >= new Date(range[0].setHours(0,0,0,0)) && 
             date <= new Date(range[1].setHours(23,59,59,999));
    };

    const isRangeEnd = (day) => {
      if (!dateRange[0] || !dateRange[1]) return false;
      
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const start = new Date(dateRange[0].setHours(0,0,0,0));
      const end = new Date(dateRange[1].setHours(0,0,0,0));
      
      return date.getTime() === start.getTime() || date.getTime() === end.getTime();
    };

    return (
      <div className={componentStyles.calendar.container} style={{ position: 'absolute', right: 0, bottom: '-320px', zIndex: 1000, }}>
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
            const isToday =
              day === new Date().getDate() &&
              viewDate.getMonth() === new Date().getMonth() &&
              viewDate.getFullYear() === new Date().getFullYear();

            let className = componentStyles.calendar.dayButton;
            
            if (isRangeEnd(day)) {
              className = `${className} ${componentStyles.calendar.currentDay}`;
            } else if (isInRange(day)) {
              className = `${className} ${componentStyles.calendar.selectedDay}`;
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
              const today = new Date();
              const weekAgo = new Date();
              weekAgo.setDate(today.getDate() - 6);
              setDateRange([weekAgo, today]);
              setShowCalendar(false);
            }}
          >
            Last 7 days
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={() => {
              const today = new Date();
              const monthAgo = new Date();
              monthAgo.setMonth(today.getMonth() - 1);
              setDateRange([monthAgo, today]);
              setShowCalendar(false);
            }}
          >
            Last 30 days
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={ds.chart.container}>
      <div className={ds.chart.header}>
        <div>
          <h2 className={ds.chart.title}>Distance Travelled</h2>
          <p className={ds.chart.subtitle}>See the distance travelled by your employees for the selected time frame</p>
        </div>
        <div className={ds.chart.controls}>
          {/* <select className={ds.chart.select}>
            <option>All Staff</option>
          </select> */}
          <select 
            className={ds.chart.select}
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Custom</option>
          </select>
          <div className="relative" ref={calendarRef}>
            <button 
              type="button" 
              className={ds.chart.dateRange}
              onClick={() => {
                setShowCalendar(!showCalendar);
                if (!showCalendar && selectedOption !== 'Custom') {
                  setSelectedOption('Custom');
                }
              }}
            >
              {formatDateRange(startDate, endDate)}
              <FaCalendarAlt className="ml-2 text-indigo-500" size={18} />
            </button>
            {showCalendar && <Calendar />}
          </div>
        </div>
      </div>
      
      <div className={ds.chart.chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={distanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Km', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className={ds.chart.customTooltip}>
                      Total Distance: {payload[0].value.toFixed(2)} Km
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="distance" fill="#e9d5ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-end mt-2">
        <div className={ds.chart.totalBadge}>
          Total Distance: 119.49 Km
        </div>
      </div>
    </div>
  );
};

export default DistanceChart;