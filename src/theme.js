// Theme configuration for the application
export const colors = {
  primary: {
    gradient: "bg-gradient-to-r from-indigo-600 to-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-500",
    light: "bg-blue-50",
  },
  secondary: {
    light: "bg-white/20 hover:bg-white/30",
    background: "bg-gray-50",
    accent: "bg-purple-100",
  },
  text: {
    light: "text-white",
    dark: "text-gray-800",
    alert: "text-red-500",
    muted: "text-gray-500",
  },
  status: {
    present: "text-green-600",
    absent: "text-red-500",
    halfDay: "text-orange-500",
    overtime: "text-blue-600",
    fine: "text-purple-600",
    leave: "text-teal-600",
  }
};

export const spacing = {
  container: "p-4",
  header: "p-5",
  button: "px-4 py-2",
  iconButton: "p-2",
  gap: "space-x-4",
  smallGap: "space-x-2",
};

export const borders = {
  rounded: "rounded-md",
  roundedFull: "rounded-full",
  roundedLg: "rounded-lg",
  divider: "border-b border-gray-200",
  card: "border border-gray-200",
};

export const effects = {
  shadow: "shadow-lg",
  shadowSm: "shadow-sm",
  transition: "transition-all duration-200",
  hover: "hover:shadow-md hover:scale-105",
};

export const typography = {
  header: "text-2xl font-bold tracking-wide",
  subheader: "text-xl font-semibold",
  normal: "font-medium",
  small: "text-sm",
};

// Component-specific styles
// Add this to your componentStyles object in theme.js
export const componentStyles = {
  header: `${colors.primary.gradient} ${colors.text.light} ${spacing.header} ${effects.shadow} ${borders.roundedLg}`,
  dateNavButton: `${spacing.iconButton} bg-white/10 hover:bg-white/20 ${borders.roundedFull} ${effects.transition}`,
  actionButton: `${colors.secondary.light} ${spacing.iconButton} ${borders.roundedFull} ${effects.transition}`,
  reportButton: `flex items-center ${spacing.smallGap} bg-white/10 hover:bg-white/20 px-3 py-1 ${borders.roundedFull} ${effects.transition}`,
  reviewButton: `${colors.primary.button} ${colors.text.light} ${spacing.button} ${borders.rounded} ${effects.transition}`,
  dateBar: `flex justify-between items-center ${spacing.container} ${colors.secondary.background} ${borders.divider} sticky top-0 z-10`,
  calendarButton: `cursor-pointer hover:text-blue-700 ${effects.transition}`,
  
  statCard: {
    container: `bg-white ${borders.card} ${borders.roundedLg} ${effects.shadowSm} p-3 flex flex-col items-center justify-center ${effects.transition} ${effects.hover}`,
    label: `${typography.small} ${colors.text.muted} mb-1`,
    value: "text-2xl font-bold",
  },
  
  // Action buttons for attendance management
  attendanceActions: {
    container: "flex flex-wrap gap-3 p-4 bg-gray-50 ",
    addButton: `flex items-center gap-2 ${spacing.button} bg-white ${borders.card} text-blue-600 ${borders.rounded} hover:bg-blue-50 ${effects.transition} font-medium`,
    fineButton: `${spacing.button} bg-white ${borders.card} text-purple-600 ${borders.rounded} hover:bg-purple-50 ${effects.transition} font-medium`,
    overtimeButton: `${spacing.button} bg-white ${borders.card} text-blue-600 ${borders.rounded} hover:bg-blue-50 ${effects.transition} font-medium`,
    presentButton: `${spacing.button} bg-white ${borders.card} text-green-600 ${borders.rounded} hover:bg-green-50 ${effects.transition} font-medium`,
    absentButton: `${spacing.button} bg-white ${borders.card} text-red-500 ${borders.rounded} hover:bg-red-50 ${effects.transition} font-medium`,
  },
  
  // Face attendance and search
  faceAttendance: {
    container: "p-4 space-y-3 bg-white",
    button: `flex items-center gap-2 ${spacing.button} bg-gradient-to-r from-blue-500 to-indigo-600 text-white ${borders.rounded} hover:from-blue-600 hover:to-indigo-700 ${effects.transition} ${effects.shadowSm} font-medium`,
    searchContainer: "relative",
    searchInput: "w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all",
    searchIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
    searchPlaceholder: "text-gray-400",
  },
  
  calendar: {
    container: "absolute z-20 mt-90 bg-white shadow-xl rounded-lg border border-gray-200 w-64 overflow-hidden",
    header: "bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-3 flex justify-between items-center",
    navButton: "text-white hover:text-gray-200 text-lg font-medium transition-all hover:scale-110",
    monthYear: "font-medium text-lg",
    daysGrid: "grid grid-cols-7 gap-1 text-center p-3",
    dayLabel: "text-xs font-medium text-gray-500 mb-2",
    dayButton: "w-8 h-8 rounded-full text-sm hover:bg-gray-100 transition-all duration-200",
    currentDay: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md",
    selectedDay: "bg-blue-100 font-bold border-2 border-blue-400",
    todayIndicator: "relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-500 after:rounded-full",
    emptyDay: "text-transparent",
  },
  
  // Staff attendance table
  staffTable: {
    container: "overflow-x-auto bg-white rounded-lg shadow-sm p-4 mb-6",
    table: "min-w-full bg-white border-collapse",
    header: "bg-gray-50 border-b border-gray-200",
    // headerCell: "py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    row: "border-b border-gray-200 hover:bg-gray-50 transition-colors",
    cell: "py-4 px-4 text-sm text-gray-500",
    avatar: "w-8 h-8 rounded-full overflow-hidden mr-3",
    nameCell: "flex items-center py-4 px-4",
    name: "text-sm font-medium text-gray-900",
    statusBadge: "px-2 py-1 text-xs font-medium rounded-full inline-block min-w-[70px] text-center",
    actionButtons: {
      // Default button styles
      present: "bg-white border border-gray-200 text-blue-600 hover:bg-blue-50",
      absent: "bg-white border border-gray-200 text-red-500 hover:bg-red-50",
      halfDay: "bg-white border border-gray-200 text-yellow-500 hover:bg-yellow-50",
      overtime: "bg-white border border-gray-200 text-blue-600 hover:bg-blue-50",
      fine: "bg-white border border-gray-200 text-purple-500 hover:bg-purple-50",
      
      // Active button styles
      activePresent: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm",
      activeAbsent: "bg-red-500 text-white shadow-sm",
      activeHalfDay: "bg-yellow-500 text-white shadow-sm",
      activeOvertime: "bg-blue-500 text-white shadow-sm",
      activeFine: "bg-purple-500 text-white shadow-sm",
    }
  },
  // Fine page styles
  finePage: {
    container: "bg-white rounded-lg shadow-sm p-4 mx-4 my-4",
    header: "flex items-center border-b border-gray-200 pb-4 mb-4",
    backButton: "flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4",
    title: `${typography.subheader} text-gray-800`,
    form: "space-y-6",
    formGroup: "space-y-2",
    label: "block text-sm font-medium text-gray-700",
    input: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all",
    select: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all",
    textarea: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all min-h-[100px]",
    submitButton: `${colors.primary.button} ${colors.text.light} ${spacing.button} ${borders.rounded} ${effects.transition} w-full md:w-auto`,
    cancelButton: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors w-full md:w-auto",
    saveButton: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition-colors flex items-center text-sm",
    buttonGroup: "flex flex-col md:flex-row gap-3 justify-end mt-6",
    entryCard: "border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-sm transition-all",
    staffList: {
      container: "mt-6",
      header: "bg-gray-50 p-3 rounded-t-lg border border-gray-200 font-medium",
      row: "flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors",
      checkbox: "mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500",
      avatar: "w-8 h-8 rounded-full bg-gray-200 mr-3",
      name: "font-medium text-gray-800",
      info: "text-sm text-gray-500 ml-auto",
    },
  },
  
  staffPage: {
    container: "min-h-screen bg-gray-50",
    contentWrapper: "max-w-[1440px] mx-auto p-4 sm:p-6",
    header: "flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm",
    title: "text-xl font-semibold text-gray-800",
    addButton: "bg-blue-600 text-white px-4 py-2.5 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors",
    searchBar: {
      container: "flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm",
      inputWrapper: "flex-1 min-w-[200px] relative",
      input: "w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500",
      searchIcon: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400",
      actionButtons: "flex flex-wrap gap-3",
      filterButton: "px-4 py-2.5 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors",
      filterText: "text-blue-600 font-medium",
      bulkActionButton: "px-4 py-2.5 border border-gray-300 rounded-md flex items-center gap-2 text-blue-600 hover:bg-gray-50 transition-colors font-medium",
      reportButton: "px-4 py-2.5 border border-gray-300 rounded-md text-blue-600 hover:bg-gray-50 transition-colors font-medium",
    },
    staffList: {
      container: "bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm",
      selectAllWrapper: "p-4 border-b border-gray-200 bg-gray-50",
      selectAllCheckbox: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
      selectAllLabel: "text-sm font-medium text-gray-700",
      departmentHeader: "px-4 py-3 bg-blue-50",
      departmentName: "text-sm font-medium text-blue-700",
      departmentCount: "bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full",
      staffItems: "divide-y divide-gray-200",
      staffItem: "px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors",
      staffCheckbox: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
      staffAvatar: "w-9 h-9 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-600 font-medium",
      staffName: "font-medium text-sm cursor-pointer hover:text-blue-600 transition-colors",
      staffId: "text-sm text-gray-500",
      paymentButton: "text-blue-600 text-sm hover:text-blue-700 font-medium px-3 py-1.5 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors",
    },
  },
  
  // ... rest of existing styles ...
};