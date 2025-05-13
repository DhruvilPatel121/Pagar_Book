// Theme configuration for the application
export const colors = {
  primary: {
    gradient: "bg-gradient-to-r from-purple-600 to-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-500",
  },
  secondary: {
    light: "bg-white/20 hover:bg-white/30",
    background: "bg-gray-100",
  },
  text: {
    light: "text-white",
    dark: "text-gray-800",
    alert: "text-red-500",
  }
};

export const spacing = {
  container: "p-4",
  header: "p-5",
  button: "px-4 py-1",
  iconButton: "p-2",
  gap: "space-x-4",
  smallGap: "space-x-2",
};

export const borders = {
  rounded: "rounded",
  roundedFull: "rounded-full",
  roundedLg: "rounded-lg",
  divider: "border-b",
};

export const effects = {
  shadow: "shadow-lg",
  transition: "transition-colors",
};

export const typography = {
  header: "text-2xl font-bold tracking-wide",
  normal: "font-medium",
};

// Component-specific styles
export const componentStyles = {
  header: `${colors.primary.gradient} ${colors.text.light} ${spacing.header} ${effects.shadow} ${borders.roundedLg}`,
  dateNavButton: `${spacing.iconButton} hover:bg-gray-200 ${borders.roundedFull}`,
  actionButton: `${colors.secondary.light} ${spacing.iconButton} ${borders.roundedFull} ${effects.transition}`,
  reportButton: `flex items-center ${spacing.smallGap} ${colors.secondary.light} px-3 py-1 ${borders.roundedFull} ${effects.transition}`,
  reviewButton: `${colors.primary.button} ${colors.text.light} ${spacing.button} ${borders.rounded} ${effects.transition}`,
  dateBar: `flex justify-between items-center ${spacing.container} ${colors.secondary.background} ${borders.divider}`,
  calendarButton: `cursor-pointer hover:text-blue-700 ${effects.transition}`,
};