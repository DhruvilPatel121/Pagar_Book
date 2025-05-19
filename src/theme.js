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
  // Geo page styles
  geoPage: {
    container: "min-h-screen bg-gray-50",
    content: "ml-60 max-w-[1440px] mx-auto p-4 sm:p-6",
    header: "bg-indigo-600 text-white p-4 rounded-lg mb-6 flex justify-between items-center",
    headerTitle: "text-xl font-medium",
    headerBadge: "bg-white text-indigo-600 text-xs font-medium px-2.5 py-0.5 rounded-full",
    headerButton: "bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors",
    
    // Add or update these styles in your componentStyles.geoPage.dashboard section
    dashboard: {
      title: "text-2xl font-medium text-gray-800 mb-6",
      statsGrid: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",
      statCard: {
        green: "bg-green-50 p-4 rounded-lg",
        purple: "bg-purple-50 p-4 rounded-lg",
        blue: "bg-blue-50 p-4 rounded-lg",
        icon: {
          green: "bg-green-100 p-2 rounded-full text-green-600 text-xl",
          purple: "bg-purple-100 p-2 rounded-full text-purple-600 text-xl",
          blue: "bg-blue-100 p-2 rounded-full text-blue-600 text-xl"
        },
        label: "text-sm text-gray-600 mb-1",
        value: "text-3xl font-semibold text-gray-800"
      },
      
      overviewGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
      card: "bg-white p-5 rounded-lg shadow-sm border border-gray-200",
      cardTitle: "text-lg font-medium text-gray-800 mb-4",
      
      //progress styles for Tasks Overview
      progressContainer: "space-y-6",
      progressRow: "flex items-center justify-between relative cursor-pointer",
      progressLabel: "text-sm text-gray-600 w-32",
      progressValue: "font-medium mr-4 w-6 text-center",
      progressBarContainer: "flex-1 h-8 bg-gray-100 rounded-md overflow-hidden relative",
      progressFill: "h-full bg-gradient-to-r from-green-100 to-green-300 origin-left",
      
      // New tooltip styles
      tooltip: {
        container: "absolute z-10 bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium transition-all duration-200 opacity-0 pointer-events-none",
        visible: "opacity-100",
        arrow: "absolute w-2 h-2 bg-gray-800 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45"
      },
      
      customerStat: {
        container: "mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0",
        header: "flex justify-between items-start mb-2",
        label: "text-sm text-gray-600",
        icon: {
          green: "w-8 h-8 flex items-center justify-center bg-green-100 rounded-full text-green-600",
          purple: "w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full text-purple-600"
        },
        value: "text-3xl font-semibold text-gray-800 mb-1",
        trend: "inline-flex items-center gap-1 text-green-600 text-sm bg-green-50 px-2 py-0.5 rounded"
      },
      
      chart: {
        container: "bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6",
        header: "flex justify-between items-center mb-4",
        title: "text-lg font-medium text-gray-800",
        subtitle: "text-sm text-gray-600",
        controls: "flex items-center gap-3",
        select: "border border-gray-300 rounded-md px-3 py-1.5 text-sm",
        dateRange: "border border-gray-300 rounded-md px-3 py-1.5 text-sm flex items-center",
        chartHeight: "h-80",
        totalBadge: "bg-gray-800 text-white px-4 py-2 rounded-lg text-sm",
        customTooltip: "bg-gray-800 text-white px-4 py-2 rounded-lg text-sm shadow-lg"
      },
      
      businessTable: {
        container: "bg-white p-5 rounded-lg shadow-sm border border-gray-200",
        header: "mb-4",
        title: "text-lg font-medium text-gray-800",
        subtitle: "text-sm text-gray-600",
        controls: "flex justify-between items-center mb-4",
        search: "pl-8 pr-4 py-2 border border-gray-300 rounded-md w-64",
        searchIcon: "w-4 h-4 text-gray-500 absolute left-2.5 top-3",
        dateSelect: "border border-gray-300 rounded-md px-3 py-1.5 text-sm flex items-center",
        downloadBtn: "bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm flex items-center",
        table: "min-w-full divide-y divide-gray-200",
        tableHeader: "bg-gray-50",
        tableHeaderCell: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        tableBody: "bg-white divide-y divide-gray-200",
        tableCell: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
        nameCell: "px-6 py-4 whitespace-nowrap",
        avatar: {
          blue: "flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600",
          gray: "flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
        },
        nameText: "text-sm font-medium text-gray-900 ml-3"
      }
    }
  },
  
};