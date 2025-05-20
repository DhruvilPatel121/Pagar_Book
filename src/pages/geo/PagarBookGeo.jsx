// import React, { useState, useRef, useEffect } from 'react';
// import GeoSidebar from './components/GeoSidebar';
// import { useLocation } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { MdPeople, MdAccessTime, MdLogin, MdLogout, MdArrowUpward } from 'react-icons/md';
// import { FaCalendarAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { componentStyles, colors, typography, spacing } from '../../theme';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'; // Add this import
// import GeoTracking from './components/GeoTracking';

// const PagarBookGeo = () => {
//   const [locations] = useState([
//     { id: 1, name: 'Main Office', address: '123 Main St, City', radius: 100, staffCount: 15 },
//     { id: 2, name: 'Site A', address: '456 Work Ave, City', radius: 50, staffCount: 8 },
//     { id: 3, name: 'Site B', address: '789 Project Rd, City', radius: 75, staffCount: 12 },
//   ]);
  
//   // Add state for tooltip visibility and position
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   // Add state for tracking hovered task - moved from JSX to component level
//   const [hoveredTask, setHoveredTask] = useState(null);
  
//   // Update calendar related states to use Date objects
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isCalendarOpen, setCalendarOpen] = useState(false);
//   const calendarRef = useRef(null);
  
//   // Add separate states for business table calendar
//   const [isBusinessCalendarOpen, setBusinessCalendarOpen] = useState(false);
//   const businessCalendarRef = useRef(null);
  
//   // Format date for display
//   function formatDate(date) {
//     if (!(date instanceof Date)) {
//       return '';
//     }
//     const options = { day: 'numeric', month: 'short', year: '2-digit' };
//     return date.toLocaleDateString('en-US', options);
//   }
  
//   // Navigate date function
//   const navigateDate = (days) => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + days);
//     setCurrentDate(newDate);
//     setSelectedDate(newDate);
//   };
  
//   // Close calendar when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setCalendarOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
  
//   // Calendar component - moved inside the main component
//   const Calendar = () => {
//     const [viewDate, setViewDate] = useState(new Date(currentDate));

//     const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
//     const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//     const handleDateClick = (day) => {
//       const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
//       setCurrentDate(newDate);
//       setSelectedDate(formatDate(newDate));
//       setCalendarOpen(false);
//     };

//     const changeMonth = (increment) => {
//       const newDate = new Date(viewDate);
//       newDate.setMonth(viewDate.getMonth() + increment);
//       setViewDate(newDate);
//     };

//     return (
//       <div className={componentStyles.calendar.container}>
//         <div className={componentStyles.calendar.header}>
//           <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(-1)}>←</button>
//           <div className={componentStyles.calendar.monthYear}>
//             {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
//           </div>
//           <button className={componentStyles.calendar.navButton} onClick={() => changeMonth(1)}>→</button>
//         </div>

//         <div className={componentStyles.calendar.daysGrid}>
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
//             <div key={i} className={componentStyles.calendar.dayLabel}>{day}</div>
//           ))}

//           {Array.from({ length: firstDayOfMonth }).map((_, i) => (
//             <div key={`empty-${i}`} className={componentStyles.calendar.emptyDay}>.</div>
//           ))}

//           {Array.from({ length: daysInMonth }).map((_, i) => {
//             const day = i + 1;
//             const isCurrentDay =
//               day === currentDate.getDate() &&
//               viewDate.getMonth() === currentDate.getMonth() &&
//               viewDate.getFullYear() === currentDate.getFullYear();

//             const isToday =
//               day === new Date().getDate() &&
//               viewDate.getMonth() === new Date().getMonth() &&
//               viewDate.getFullYear() === new Date().getFullYear();

//             let className = componentStyles.calendar.dayButton;
//             if (isCurrentDay) {
//               className = `${className} ${componentStyles.calendar.currentDay}`;
//             } else if (isToday) {
//               className = `${className} ${componentStyles.calendar.todayIndicator}`;
//             }

//             return (
//               <button
//                 key={day}
//                 className={className}
//                 onClick={() => handleDateClick(day)}
//               >
//                 {day}
//               </button>
//             );
//           })}
//         </div>

//         <div className="flex justify-between mt-2 px-2">
//           <button
//             className="text-blue-500 hover:text-blue-700 text-sm font-medium"
//             onClick={() => {
//               setSelectedDate('');
//               setCalendarOpen(false);
//             }}
//           >
//             Clear
//           </button>
//           <button
//             className="text-blue-500 hover:text-blue-700 text-sm font-medium"
//             onClick={() => {
//               const today = new Date();
//               setCurrentDate(today);
//               setSelectedDate(formatDate(today));
//               setCalendarOpen(false);
//             }}
//           >
//             Today
//           </button>
//         </div>
//       </div>
//     );
//   };
  
//   const location = useLocation();
//   const currentPath = location.pathname;
  
//   // Sample data for distance traveled chart
//   const distanceData = [
//     { name: '12 May', distance: 75 },
//     { name: '13 May', distance: 50 },
//     { name: '14 May', distance: 70 },
//     { name: '15 May', distance: 68 },
//     { name: '16 May', distance: 120 },
//     { name: '17 May', distance: 75 },
//     { name: '18 May', distance: 10 },
//   ];

//   // Get geo styles from theme
//   const geo = componentStyles.geoPage;
//   const ds = geo.dashboard;
  
//   // Task data for the progress bars
//   const taskData = [
//     { id: 'total', label: 'Total Tasks', value: 2, percentage: 100 },
//     { id: 'notStarted', label: 'Not yet Started', value: 0, percentage: 0 },
//     { id: 'delayed', label: 'Delayed Tasks', value: 0, percentage: 0 },
//     { id: 'inProgress', label: 'In progress', value: 0, percentage: 0 },
//     { id: 'completed', label: 'Completed Tasks', value: 2, percentage: 100 },
//   ];

//   // Render different content based on the current path
//   const renderContent = () => {
//     // Default dashboard content
//     if (currentPath === '/geo') {
//       return (
//         <>
//           {/* Dashboard Header */}
//           <div className={geo.header}>
//             <h1 className={geo.headerTitle}>Dashboard</h1>
//             <div className="flex items-center gap-3">
//               {/* Remove date selector with calendar */}
//               <button className={geo.headerButton}>Add Location</button>
//             </div>
//           </div>
          
//           {/* Stats Cards */}
//           <div className={ds.statsGrid}>
//             <div className={ds.statCard.green}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className={ds.statCard.label}>Total Employees</p>
//                   <h3 className={ds.statCard.value}>2</h3>
//                 </div>
//                 <div className={ds.statCard.icon.green}>
//                   <MdPeople />
//                 </div>
//               </div>
//             </div>
            
//             <div className={ds.statCard.purple}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className={ds.statCard.label}>Not Started</p>
//                   <h3 className={ds.statCard.value}>0</h3>
//                 </div>
//                 <div className={ds.statCard.icon.purple}>
//                   <MdAccessTime />
//                 </div>
//               </div>
//             </div>
            
//             <div className={ds.statCard.purple}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className={ds.statCard.label}>Punched In</p>
//                   <h3 className={ds.statCard.value}>2</h3>
//                 </div>
//                 <div className={ds.statCard.icon.purple}>
//                   <MdLogin />
//                 </div>
//               </div>
//             </div>
            
//             <div className={ds.statCard.blue}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className={ds.statCard.label}>Punched Out</p>
//                   <h3 className={ds.statCard.value}>0</h3>
//                 </div>
//                 <div className={ds.statCard.icon.blue}>
//                   <MdLogout />
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Tasks and Customers Overview */}
//           <div className={ds.overviewGrid}>
//             <div className={`col-span-2 ${ds.card}`}>
//               <h2 className={ds.cardTitle}>Tasks Overview</h2>
              
//               <div className={ds.progressContainer}>
//                 {taskData.map((task) => (
//                   <div 
//                     key={task.id} 
//                     className={ds.progressRow}
//                     onMouseEnter={(e) => {
//                       // Calculate position based on mouse event
//                       const rect = e.currentTarget.getBoundingClientRect();
//                       const barCenter = rect.left + (rect.width / 2);
//                       setActiveTooltip({
//                         id: task.id,
//                         label: task.label,
//                         value: task.value
//                       });
//                       setHoveredTask(task.id);
//                     }}
//                     onMouseLeave={() => {
//                       setActiveTooltip(null);
//                       setHoveredTask(null);
//                     }}
//                   >
//                     <span className={ds.progressLabel}>{task.label}</span>
//                     <span className={ds.progressValue}>{task.value}</span>
//                     {/* // Update the tooltip section in the taskData.map function */}
//                     <div className={ds.progressBarContainer}>
//                       <div 
//                         className={ds.progressFill} 
//                         style={{ 
//                           width: `${task.percentage}%`,
//                           opacity: hoveredTask === task.id ? '0.8' : '1',
//                           transform: hoveredTask === task.id ? 'scaleY(1.05)' : 'scaleY(1)',
//                           transition: 'all 0.2s ease'
//                         }}
//                       ></div>
                      
//                       {/* Custom Tooltip */}
//                       {activeTooltip && activeTooltip.id === task.id && (
//                         <div 
//                           className={`${ds.tooltip.container} ${ds.tooltip.visible}`}
//                           style={{ 
//                             left: '50%',
//                             top: '0px',
//                             transform: 'translateX(-50%)'
//                           }}
//                         >
//                           {task.label}: {task.value}
//                           <div className={ds.tooltip.arrow}></div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Customers Overview Card */}
//             <div className={ds.card}>
//               <h2 className={ds.cardTitle}>Customers Overview</h2>
              
//               <div className={ds.customerStat.container}>
//                 <div className={ds.customerStat.header}>
//                   <p className={ds.customerStat.label}>Customers Added Today</p>
//                   <div className={ds.customerStat.icon.green}>
//                     <MdPeople />
//                   </div>
//                 </div>
//                 <h3 className={ds.customerStat.value}>3</h3>
//                 <div className={ds.customerStat.trend}>
//                   <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   <span>3</span>
//                   <span className="text-gray-500">more than yesterday</span>
//                 </div>
//               </div>
              
//               <div className={ds.customerStat.container}>
//                 <div className={ds.customerStat.header}>
//                   <p className={ds.customerStat.label}>Customers Served Today</p>
//                   <div className={ds.customerStat.icon.purple}>
//                     <MdPeople />
//                   </div>
//                 </div>
//                 <h3 className={ds.customerStat.value}>2</h3>
//                 <div className={ds.customerStat.trend}>
//                   <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   <span>2</span>
//                   <span className="text-gray-500">more than yesterday</span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Distance Travelled Chart */}
//           <div className={ds.chart.container}>
//             <div className={ds.chart.header}>
//               <div>
//                 <h2 className={ds.chart.title}>Distance Travelled</h2>
//                 <p className={ds.chart.subtitle}>See the distance travelled by your employees for the selected time frame</p>
//               </div>
//               <div className={ds.chart.controls}>
//                 <select className={ds.chart.select}>
//                   <option>All Staff</option>
//                 </select>
//                 <select className={ds.chart.select}>
//                   <option>Last 7 days</option>
//                 </select>
//                 <div className={ds.chart.dateRange}>
//                   12 May '25 - 18 May '25
//                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className={ds.chart.chartHeight}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={distanceData}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="name" />
//                   <YAxis label={{ value: 'Km', angle: -90, position: 'insideLeft' }} />
//                   <Tooltip 
//                     content={({ active, payload, label }) => {
//                       if (active && payload && payload.length) {
//                         return (
//                           <div className={ds.chart.customTooltip}>
//                             Total Distance: {payload[0].value.toFixed(2)} Km
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                   />
//                   <Bar dataKey="distance" fill="#e9d5ff" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div className="flex justify-end mt-2">
//               <div className={ds.chart.totalBadge}>
//                 Total Distance: 119.49 Km
//               </div>
//             </div>
//           </div>
          
//           {/* Business Overview */}
//           <div className={ds.businessTable.container}>
//             <div className={ds.businessTable.header}>
//               <h2 className={ds.businessTable.title}>Business Overview</h2>
//               <p className={ds.businessTable.subtitle}>See staff punch-in / punch-out times, number of tasks done, and average task duration</p>
//             </div>
            
//             <div className={ds.businessTable.controls}>
//               <div className="relative">
//                 <input 
//                   type="text" 
//                   placeholder="Search by name or staff ID" 
//                   className={ds.businessTable.search}
//                 />
//                 <svg className={ds.businessTable.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                 </svg>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <div className={`flex items-center ${spacing.smallGap}`}>
//                   <button onClick={() => navigateDate(-1)} className={componentStyles.dateNavButton}>
//                     <FaChevronLeft />
//                   </button>
//                   <div className={`flex items-center ${spacing.smallGap} ${typography.normal} relative`}>
//                     <DatePicker
//                       selected={selectedDate}
//                       onChange={(date) => setSelectedDate(date)}
//                       dateFormat="dd MMM yy"
//                       className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm"
//                       customInput={
//                         <button type="button" className="flex items-center justify-between cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 shadow-sm w-44 text-left">
//                           <span className="font-medium text-gray-700">{formatDate(selectedDate)}</span>
//                           <FaCalendarAlt className={colors.primary.icon} size={16} />
//                         </button>
//                       }
//                       popperPlacement="bottom-start"
//                       popperModifiers={[
//                         {
//                           name: 'offset',
//                           options: {
//                             offset: [0, 8],
//                           },
//                         },
//                         {
//                           name: 'preventOverflow',
//                           options: {
//                             rootBoundary: 'viewport',
//                             tether: false,
//                             altAxis: true,
//                           },
//                         },
//                       ]}
//                       popperClassName="z-50"
//                       calendarClassName="shadow-lg border border-gray-200 rounded-lg"
//                       dayClassName={date => {
//                         const isCurrentDay = 
//                           date.getDate() === selectedDate.getDate() &&
//                           date.getMonth() === selectedDate.getMonth() &&
//                           date.getFullYear() === selectedDate.getFullYear();
                        
//                         const isToday = 
//                           date.getDate() === new Date().getDate() &&
//                           date.getMonth() === new Date().getMonth() &&
//                           date.getFullYear() === new Date().getFullYear();
                        
//                         if (isCurrentDay) return componentStyles.calendar.currentDay;
//                         if (isToday) return componentStyles.calendar.todayIndicator;
//                         return componentStyles.calendar.dayButton;
//                       }}
//                       renderCustomHeader={({
//                         date,
//                         decreaseMonth,
//                         increaseMonth,
//                         prevMonthButtonDisabled,
//                         nextMonthButtonDisabled
//                       }) => (
//                         <div className={componentStyles.calendar.header}>
//                           <button 
//                             className={componentStyles.calendar.navButton} 
//                             onClick={decreaseMonth} 
//                             disabled={prevMonthButtonDisabled}
//                           >
//                             ←
//                           </button>
//                           <div className={componentStyles.calendar.monthYear}>
//                             {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                           </div>
//                           <button 
//                             className={componentStyles.calendar.navButton} 
//                             onClick={increaseMonth} 
//                             disabled={nextMonthButtonDisabled}
//                           >
//                             →
//                           </button>
//                         </div>
//                       )}
//                     />
//                   </div>
//                   <button onClick={() => navigateDate(1)} className={componentStyles.dateNavButton}>
//                     <FaChevronRight />
//                   </button>
//                 </div>
//                 <button className={ds.businessTable.downloadBtn}>
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
//                   </svg>
//                   Download
//                 </button>
//               </div>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className={ds.businessTable.table}>
//                 <thead>
//                   <tr className={ds.businessTable.tableHeader}>
//                     <th className={ds.businessTable.tableHeaderCell}>Name</th>
//                     <th className={ds.businessTable.tableHeaderCell}>Staff ID</th>
//                     <th className={ds.businessTable.tableHeaderCell}>Punched In At</th>
//                     <th className={ds.businessTable.tableHeaderCell}>Punched Out At</th>
//                     <th className={ds.businessTable.tableHeaderCell}>Total Tasks Completed</th>
//                     <th className={ds.businessTable.tableHeaderCell}>Total Forms Added</th>
//                     <th className={ds.businessTable.tableHeaderCell}>Average Task Duration</th>
//                   </tr>
//                 </thead>
//                 <tbody className={ds.businessTable.tableBody}>
//                   <tr>
//                     <td className={ds.businessTable.nameCell}>
//                       <div className="flex items-center">
//                         <div className={ds.businessTable.avatar.blue}>H</div>
//                         <div className={ds.businessTable.nameText}>HIREN BARIYA</div>
//                       </div>
//                     </td>
//                     <td className={ds.businessTable.tableCell}>1038</td>
//                     <td className={ds.businessTable.tableCell}>09:28 am</td>
//                     <td className={ds.businessTable.tableCell}>-</td>
//                     <td className={ds.businessTable.tableCell}>2</td>
//                     <td className={ds.businessTable.tableCell}>0</td>
//                     <td className={ds.businessTable.tableCell}>0 min</td>
//                   </tr>
//                   <tr>
//                     <td className={ds.businessTable.nameCell}>
//                       <div className="flex items-center">
//                         <div className={ds.businessTable.avatar.gray}>R</div>
//                         <div className={ds.businessTable.nameText}>RAUNAKBHAI TANNA</div>
//                       </div>
//                     </td>
//                     <td className={ds.businessTable.tableCell}>1035</td>
//                     <td className={ds.businessTable.tableCell}>09:11 am</td>
//                     <td className={ds.businessTable.tableCell}>-</td>
//                     <td className={ds.businessTable.tableCell}>0</td>
//                     <td className={ds.businessTable.tableCell}>0</td>
//                     <td className={ds.businessTable.tableCell}>0 min</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       );
//     }
    
//     // Other pages content
//     else if (currentPath === '/geo/tracking') {
//       return <GeoTracking />;
//     }
    
//     // Other pages - placeholder content
//     else {
//       const pageName = currentPath.split('/').pop();
//       const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
      
//       return (
//         <div className="bg-white p-5 rounded-lg shadow-sm">
//           <h2 className="text-lg font-medium text-gray-800 mb-4">{formattedPageName}</h2>
//           <p className="text-gray-600">
//             This is the {formattedPageName} page of PagarBook Geo. Content coming soon.
//           </p>
//         </div>
//       );
//     }
//   };

//   return (
//     <>
//       {/* Geo Sidebar */}
//       <GeoSidebar />
      
//       {/* Main Content */}
//       <div className={geo.content}>
//         {/* Header - Only show on non-dashboard pages */}
//         {currentPath !== '/geo' && (
//           <div className={geo.header}>
//             <h1 className={geo.headerTitle}>PagarBook Geo</h1>
//             <div className="flex items-center gap-3">
//               <span className={geo.headerBadge}>New</span>
//               <button className={geo.headerButton}>Add Location</button>
//             </div>
//           </div>
//         )}

//         {/* Dynamic Content based on route */}
//         {renderContent()}
//       </div>
//     </>
//   );
// };

// export default PagarBookGeo;
