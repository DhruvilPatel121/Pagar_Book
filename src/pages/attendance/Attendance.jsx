import React, { useState, useEffect } from 'react'
import { FaFileAlt, FaCog, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaPlus, FaCamera, FaSearch } from 'react-icons/fa'
import { colors, componentStyles, typography, spacing } from '../../theme.js'
import { Link, useNavigate } from 'react-router-dom';
import staffData from '../../data/staff.json';

// Reusable status button component
const StatusButton = ({ status, currentStatus, onClick, children }) => {
  const isActive = status === currentStatus;
  
  let buttonStyle = '';
  switch(status) {
    case 'Present':
      buttonStyle = isActive 
        ? componentStyles.staffTable.actionButtons.activePresent 
        : componentStyles.staffTable.actionButtons.present;
      break;
    case 'Absent':
      buttonStyle = isActive 
        ? componentStyles.staffTable.actionButtons.activeAbsent 
        : componentStyles.staffTable.actionButtons.absent;
      break;
    case 'Half Day':
      buttonStyle = isActive 
        ? componentStyles.staffTable.actionButtons.activeHalfDay 
        : componentStyles.staffTable.actionButtons.halfDay;
      break;
    case 'Overtime':
      buttonStyle = isActive 
        ? componentStyles.staffTable.actionButtons.activeOvertime 
        : componentStyles.staffTable.actionButtons.overtime;
      break;
    case 'Fine':
      buttonStyle = isActive 
        ? componentStyles.staffTable.actionButtons.activeFine 
        : componentStyles.staffTable.actionButtons.fine;
      break;
    default:
      buttonStyle = 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50';
  }
  
  return (
    <button 
      className={`min-w-[100px] px-5 py-2.5 rounded-md transition-all duration-200 font-medium ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  // Add a new state to track all staff statuses
  const [staffStatuses, setStaffStatuses] = useState({});
  // Add fineCounts state to track fine counts for each staff
  const [fineCounts, setFineCounts] = useState({});
  // Add a state to track total fine clicks
  const [totalFineClicks, setTotalFineClicks] = useState(0);
  // Add overtimeCounts state to track overtime counts for each staff
  const [overtimeCounts, setOvertimeCounts] = useState({});
  // Add a state to track total overtime clicks
  const [totalOvertimeClicks, setTotalOvertimeClicks] = useState(0);
  
  const navigate = useNavigate();

  // Load staff data from JSON file
  useEffect(() => {
    setStaffList(staffData);
    // Initialize all staff as absent
    const initialStatuses = {};
    const initialFineCounts = {};
    const initialOvertimeCounts = {};
    staffData.forEach(staff => {
      initialStatuses[staff.id] = 'Absent';
      initialFineCounts[staff.id] = 0;
      initialOvertimeCounts[staff.id] = 0;
    });
    setStaffStatuses(initialStatuses);
    setFineCounts(initialFineCounts);
    setOvertimeCounts(initialOvertimeCounts);
  }, []);

  // Function to handle status change for a specific staff member
  const handleStatusChange = (staffId, newStatus) => {
    setStaffStatuses(prev => ({
      ...prev,
      [staffId]: newStatus
    }));
    
    // If status is changed to Fine, increment the fine count
    if (newStatus === 'Fine') {
      setFineCounts(prev => ({
        ...prev,
        [staffId]: (prev[staffId] || 0) + 1
      }));
      // Increment total fine clicks
      setTotalFineClicks(prev => prev + 1);
    }
    
    // If status is changed to Overtime, increment the overtime count
    if (newStatus === 'Overtime') {
      setOvertimeCounts(prev => ({
        ...prev,
        [staffId]: (prev[staffId] || 0) + 1
      }));
      // Increment total overtime clicks
      setTotalOvertimeClicks(prev => prev + 1);
    }
    
    console.log(`Staff ID ${staffId}'s status changed to ${newStatus}`);
    // Here you would update your backend/state
  };
  // Sample attendance data - in a real app, this would come from an API
  const attendanceStats = [
    { label: 'Total Staff', value: staffList.length.toString(), color: colors.text.dark },
    { label: 'Present', value: '0', color: colors.status.present },
    { label: 'Absent', value: staffList.length.toString(), color: colors.status.absent },
    { label: 'Half Day', value: '0', color: colors.status.halfDay },
    { label: 'Overtime hours', value: '0:00', color: colors.status.overtime },
    { label: 'Fine hours', value: '0:00', color: colors.status.fine },
    { label: 'Paid Leave', value: '0', color: colors.status.leave },
  ];

  // Attendance action handlers
  const handleBulkAddWork = () => {
    // Implementation for bulk adding work
    console.log("Bulk Add Work clicked");
  };

  const handleFine = () => {
    // Navigate to fine page with selected staff, fine counts, and total fine clicks
    navigate('/fine', { state: { selectedStaff, fineCounts, totalFineClicks } });
  };

  const handleOvertime = () => {
    // Navigate to overtime page with selected staff, overtime counts, and total overtime clicks
    navigate('/overtime', { state: { selectedStaff, overtimeCounts, totalOvertimeClicks } });
  };

  const handleMarkAllPresent = () => {
    // Implementation for marking all as present
    const newStatuses = {};
    staffList.forEach(staff => {
      newStatuses[staff.id] = 'Present';
    });
    setStaffStatuses(newStatuses);
    console.log("Mark All Present clicked");
  };

  const handleMarkAllAbsent = () => {
    // Implementation for marking all as absent
    const newStatuses = {};
    staffList.forEach(staff => {
      newStatuses[staff.id] = 'Absent';
    });
    setStaffStatuses(newStatuses);
    console.log("Mark All Absent clicked");
  };

  const handleFaceAttendance = () => {
    // Implementation for face attendance
    console.log("Face Attendance clicked");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implementation for search functionality
    console.log("Searching for:", e.target.value);
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Calendar component
  const Calendar = () => {
    const [viewDate, setViewDate] = useState(new Date(currentDate));

    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleDateClick = (day) => {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      setCurrentDate(newDate);
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
          <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(-1)}>←</button>
          <div className={componentStyles.calendar.monthYear}>
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>
          <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(1)}>→</button>
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
              day === currentDate.getDate() &&
              viewDate.getMonth() === currentDate.getMonth() &&
              viewDate.getFullYear() === currentDate.getFullYear();

            const isToday =
              day === new Date().getDate() &&
              viewDate.getMonth() === new Date().getMonth() &&
              viewDate.getFullYear() === new Date().getFullYear();

            let className = componentStyles.calendar.dayButton;
            if (isCurrentDay) {
              className = `${className} ${componentStyles.calendar.currentDay}`;
            } else if (isToday) {
              className = `${className} ${componentStyles.calendar.selectedDay}`;
            }
            const hasEvent = day % 7 === 0;
            if (hasEvent && !isCurrentDay) {
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
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-50 h-155 flex flex-col overflow-y-auto">
      <header className={`${componentStyles.header} sticky top-0 z-10 bg-white shadow-sm`}>
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

      <div className={`${componentStyles.dateBar} sticky top-16 z-10 bg-white shadow-sm`}>
        <div className={`flex items-center ${spacing.smallGap}`}>
          <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
            <FaChevronLeft />
          </button>
          <div className={`flex items-center ${spacing.smallGap} ${typography.normal} relative`}>
            <span>{formatDate(currentDate)}</span>
            <div onClick={() => setShowCalendar(!showCalendar)} className={componentStyles.calendarButton}>
              <FaCalendarAlt className={colors.primary.icon} />
            </div>
            {showCalendar && <Calendar />}
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

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 p-4">
        {attendanceStats.map((stat, index) => (
          <div key={index} className={componentStyles.statCard.container}>
            <div className={componentStyles.statCard.label}>{stat.label}</div>
            <div className={`${componentStyles.statCard.value} ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Attendance Action Buttons */}
      <div className={componentStyles.attendanceActions.container}>
        <button
          className={componentStyles.faceAttendance.button}
          onClick={handleFaceAttendance}
        >
          <FaCamera className="text-white" /> Face Attendance
        </button>

        <button
          className={componentStyles.attendanceActions.addButton}
          onClick={handleBulkAddWork}
        >
          <FaPlus /> Bulk Add Work (Work Basis)
        </button>

        <button
          onClick={handleFine}
          className={`${componentStyles.attendanceActions.fineButton} relative`}
        >
          F Fine
          {totalFineClicks > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
              {totalFineClicks}
            </span>
          )}
        </button>

        <button
          onClick={handleOvertime}
          className={`${componentStyles.attendanceActions.overtimeButton} relative`}
        >
          OT Overtime
          {totalOvertimeClicks > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
              {totalOvertimeClicks}
            </span>
          )}
        </button>

        <button
          className={componentStyles.attendanceActions.presentButton}
          onClick={handleMarkAllPresent}
        >
          P Mark All Present
        </button>

        <button
          className={componentStyles.attendanceActions.absentButton}
          onClick={handleMarkAllAbsent}
        >
          A Mark All Absent
        </button>
      </div>

      {/* Search */}
      <div className={componentStyles.faceAttendance.container}>
        <div className={componentStyles.faceAttendance.searchContainer}>
          <FaSearch className={componentStyles.faceAttendance.searchIcon} />
          <input
            type="text"
            placeholder="Search Staff by Name, Phone Number or EmployeeID"
            className={componentStyles.faceAttendance.searchInput}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className={spacing.container}>
        {/* Staff Attendance Table */}
        <div className={componentStyles.staffTable.container}>
          <table className={componentStyles.staffTable.table}>
            <tbody>
              {staffList
                .filter(staff =>
                  searchQuery === '' ||
                  staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  staff.id.includes(searchQuery) ||
                  (staff.mobileNumber && staff.mobileNumber.includes(searchQuery))
                )
                .map(staff => {
                  // Get the status from our staffStatuses state
                  const status = staffStatuses[staff.id] || 'Absent';
                  
                  return (
                  <tr key={staff.id} className={componentStyles.staffTable.row}>
                    <td className={componentStyles.staffTable.nameCell}>
                      <div className="flex items-center">
                        <div className={componentStyles.staffTable.avatar}>
                          {staff.image ? (
                            <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                              {staff.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className={componentStyles.staffTable.name}>{staff.name}</div>
                          <div className="text-xs text-gray-500">{staff.department} • {staff.shift}</div>
                        </div>
                      </div>
                    </td>
                    <td className={componentStyles.staffTable.cell}>
                      <span className={`${componentStyles.staffTable.statusBadge} ${
                        status === 'Present' ? 'bg-green-100 text-green-800' :
                        status === 'Half Day' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'Overtime' ? 'bg-blue-100 text-blue-800' :
                        status === 'Fine' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {status}
                        {status === 'Fine' && fineCounts[staff.id] > 0 && (
                          <span className="ml-1 bg-purple-200 text-purple-900 text-xs px-1.5 py-0.5 rounded-full">
                            {fineCounts[staff.id]}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className={componentStyles.staffTable.cell}>
                      <div className="flex flex-wrap gap-4 justify-between">
                        <StatusButton 
                          status="Present" 
                          currentStatus={status} 
                          onClick={() => handleStatusChange(staff.id, 'Present')}
                        >
                          Present
                        </StatusButton>
                        <StatusButton 
                          status="Absent" 
                          currentStatus={status} 
                          onClick={() => handleStatusChange(staff.id, 'Absent')}
                        >
                          Absent
                        </StatusButton>
                        <StatusButton 
                          status="Half Day" 
                          currentStatus={status} 
                          onClick={() => handleStatusChange(staff.id, 'Half Day')}
                        >
                          Half Day
                        </StatusButton>
                        <StatusButton 
                          status="Overtime" 
                          currentStatus={status} 
                          onClick={() => handleStatusChange(staff.id, 'Overtime')}
                        >
                          Overtime
                        </StatusButton>
                        <StatusButton 
                          status="Fine" 
                          currentStatus={status} 
                          onClick={() => handleStatusChange(staff.id, 'Fine')}
                        >
                          Fine
                          {fineCounts[staff.id] > 0 && (
                            <span className="ml-1 bg-purple-200 text-purple-900 text-xs px-1.5 py-0.5 rounded-full">
                              {fineCounts[staff.id]}
                            </span>
                          )}
                        </StatusButton>
                      </div>
                    </td>
                  </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Your attendance content will go here */}
    </div>
    // </div>
  )
}

export default Attendance
