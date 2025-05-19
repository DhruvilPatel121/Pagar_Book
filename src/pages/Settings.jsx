import React, { useState, useEffect } from 'react';
import { FiSearch, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCog, FaBriefcase, FaCalendarAlt, FaUserClock } from 'react-icons/fa';
import { BsCashStack, BsBank2, BsGearWideConnected } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { colors, typography, spacing, borders, effects, componentStyles } from '../theme';

// Enhanced SettingItem with icon support
const SettingItem = ({ title, description, isNew, isLocked, onClick, icon: Icon, status }) => (
  <div 
    className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer ${borders.divider} transition-all duration-200`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`${title}${description ? `, ${description}` : ''}`}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <div className="flex items-center gap-3">
      {Icon && <Icon className={`${colors.text.muted} w-5 h-5`} aria-hidden="true" />}
      <div>
        <h3 className={colors.text.dark}>{title}</h3>
        {description && <p className={`${colors.text.muted} ${typography.small} mt-1`}>{description}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {status && (
        <span className={`px-2 py-1 text-xs font-medium ${status.color} rounded`} aria-label={status.text}>
          {status.text}
        </span>
      )}
      {isNew && (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded" aria-label="New feature">
          NEW
        </span>
      )}
      {isLocked && (
        <span className="text-gray-400" aria-label="Locked feature">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
      <IoIosArrowForward className={colors.text.muted} aria-hidden="true" />
    </div>
  </div>
);

// Enhanced section header with count
const SectionHeader = ({ icon: Icon, title, count }) => (
  <div className={`p-4 ${borders.divider} ${colors.secondary.background}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={colors.primary.icon} aria-hidden="true" />
        <h2 className={typography.subheader}>{title}</h2>
      </div>
      {count !== undefined && (
        <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
          {count}
        </span>
      )}
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow-md p-6 text-center">
    <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
    <h2 className={`${typography.header} mb-2 text-gray-800`}>Page Not Found</h2>
    <p className={`${typography.body} text-gray-600 mb-6 max-w-md`}>
      The page you're looking for doesn't exist or has been moved.
    </p>
    <button 
      onClick={() => window.history.back()}
      className={`px-4 py-2 ${colors.primary.button} rounded-md focus:ring-2 focus:outline-none`}
    >
      Go Back
    </button>
  </div>
);

// New component for displaying setting details
const SettingDetail = ({ setting, onBack }) => {
  return (
    <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} p-6`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          {setting.icon && <setting.icon className={`${colors.primary.icon} w-6 h-6`} />}
          <h1 className={typography.header}>{setting.title}</h1>
          {setting.status && (
            <span className={`px-2 py-1 text-xs font-medium ${setting.status.color} rounded`}>
              {setting.status.text}
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <p className={typography.body}>{setting.description || 'No description available'}</p>
      </div>
      
      <div className="border-t pt-6">
        <h2 className={`${typography.subheader} mb-4`}>Settings Content</h2>
        <p className={colors.text.muted}>
          This is a placeholder for the {setting.title} settings content. 
          In a real application, this would contain the actual settings form or information.
        </p>
        
        {setting.path === 'manage-business' && (
          <div className="mt-6 space-y-6">
            <div className={`p-4 ${borders.roundedMd} bg-gray-50`}>
              <h3 className={`${typography.subtitle} mb-2`}>Active Business</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className={typography.body}>OM ENTERPRISE</p>
                  <p className={`${typography.small} ${colors.text.muted}`}>Created on Jan 15, 2023</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded">ACTIVE</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className={typography.subtitle}>Business Management</h3>
              
              <button className={`w-full flex items-center justify-between p-4 ${borders.roundedMd} border border-gray-200 hover:bg-gray-50 transition-colors`}>
                <div className="flex items-center gap-3">
                  <FaBriefcase className={colors.text.muted} />
                  <span>Add New Business</span>
                </div>
                <IoIosArrowForward className={colors.text.muted} />
              </button>
              
              <button className={`w-full flex items-center justify-between p-4 ${borders.roundedMd} border border-gray-200 hover:bg-gray-50 transition-colors`}>
                <div className="flex items-center gap-3">
                  <FaCog className={colors.text.muted} />
                  <span>Switch Active Business</span>
                </div>
                <IoIosArrowForward className={colors.text.muted} />
              </button>
              
              <button className={`w-full flex items-center justify-between p-4 ${borders.roundedMd} border border-red-100 text-red-600 hover:bg-red-50 transition-colors`}>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Delete Business</span>
                </div>
                <IoIosArrowForward className="text-red-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState({
    attendance: true,
    business: true,
    salary: true,
    businessInfo: true,
    account: true,
    others: true
  });
  const [error, setError] = useState(null);
  const [selectedSetting, setSelectedSetting] = useState(null);

  // Enhanced settings items with icons and status indicators
  const allSettings = {
    attendance: [
      { title: "Attendance Mode", description: "Selfie & Location", path: 'attendance/mode', icon: FaUserClock },
      { title: "Attendance Geofence Settings", isNew: true, path: 'attendance/geofence', icon: FaCog, status: { text: "ENHANCED", color: "bg-blue-100 text-blue-600" } },
      { title: "Staff Attendance Access", description: "1 Staff", path: 'attendance/access', icon: FiUser },
      { title: "Shift Settings", description: "2 shift(s) added", path: 'shifts-v2', icon: FaCalendarAlt },
      { title: "Automation Rules", description: "Tracking Late Entry, Early Exit, Breaks & Overtime", path: 'attendance-automation', icon: BsGearWideConnected },
      { title: "Daily Work Entry", description: "25 Staffs", path: 'daily-work-entry', icon: FaUserClock },
      { title: "Track In & Out Time", description: "Enabled", path: 'track-time', icon: FaUserClock },
      { title: "Attendance on Holidays", description: "Attendance on Holidays, Comp Off", path: 'attendance-on-holidays', icon: FaCalendarAlt },
      { title: "Mark Absent on Previous Days", description: "Enabled", path: 'mark-absent', icon: FaCalendarAlt }
    ],
    business: [
      { title: "Holiday Policy", description: "Not Added", path: 'holiday-policy', icon: FaCalendarAlt, status: { text: "SETUP", color: "bg-yellow-100 text-yellow-600" } },
      { title: "Leave Policy", description: "Not Added", path: 'leave-policy', icon: FaCalendarAlt, status: { text: "SETUP", color: "bg-yellow-100 text-yellow-600" } },
      { title: "Manager Settings", description: "No Manager Added", path: 'manager-settings', icon: FiUser },
      { title: "Manage Business Functions", path: 'business-functions', icon: BsGearWideConnected },
      { title: "Manage Staff Data", description: "No Fields Added", path: 'staff-data', icon: FiUser },
      { title: "Weekly Off Template", description: "Configure & manage weekly off templates", path: 'weekly-off', icon: FaCalendarAlt },
      { title: "Invite Staff", path: 'invite-staff', icon: FiUser, status: { text: "ACTION", color: "bg-green-100 text-green-600" } }
    ],
    salary: [
      { title: "Salary Calculation Logic", description: "Exclude Weekly Offs", path: 'salary-calculation', icon: BsCashStack },
      { title: "Salary Components", description: "Configure & manage Earnings, Deductions and Statutory Components", path: 'salary-components', icon: BsCashStack },
      { title: "Flexi-Benefit Plan Template", description: "Enable TDS to access FBP template", isLocked: true, path: 'fbp-template', icon: BsCashStack },
      { title: "Salary Template Builder", description: "Configure & manage multiple salary templates", path: 'salary-templates', icon: BsCashStack, status: { text: "UPDATED", color: "bg-green-100 text-green-600" } },
      { title: "Work Rate Card", description: "Not Added", path: 'work-rate-card', icon: BsCashStack, status: { text: "SETUP", color: "bg-yellow-100 text-yellow-600" } },
      { title: "Staff Bank Account Details", description: "Add Staff Bank Accounts in Bulk", path: 'staff-bank-accounts', icon: BsBank2 },
      { title: "Business Name in Bank Statement", description: "OM ENTERPRISE", path: 'business-bank-name', icon: BsBank2 },
      { title: "Salary Details Access to Staff", description: "No access", path: 'salary-access', icon: FiUser }
    ],
    businessInfo: [
      { title: "Business Name", description: "OM ENTERPRISE", path: 'business-name', icon: FaBriefcase },
      { title: "Business State & City", description: "Rajkot, Gujarat", path: 'business-location', icon: FaBriefcase },
      { title: "Business Bank Account", description: "xxxxxxxx0444", path: 'business-bank', icon: BsBank2 },
      { title: "Business Logo", description: "Logo Added", path: 'business-logo', icon: FaBriefcase },
      { title: "Business Address", description: "SURBHI INDUSTRIAL ZONE, PLOT NO - 37", path: 'business-address', icon: FaBriefcase, status: { text: "VERIFY", color: "bg-yellow-100 text-yellow-600" } }
    ],
    account: [
      { title: "Name", description: "VARUN BHANDERI", path: 'account-name', icon: FiUser },
      { title: "Phone Number", description: "9426532052", path: 'account-phone', icon: FiUser },
      { title: "Email Address", description: "INFO@VIBRATORFEEDER.COM", path: 'account-email', icon: FiUser },
      { title: "KYB", description: "In progress", path: 'kyb', icon: FiUser, status: { text: "PENDING", color: "bg-yellow-100 text-yellow-600" } },
      { title: "Subscriptions", description: "Geolocation, Lens - Facial Biometric, Desktop App", path: 'subscriptions', icon: FaCog },
      { title: "Add/Delete Business", description: "1 Active Business", path: 'manage-business', icon: FaBriefcase },
      { title: "Admin Settings", description: "1 Admin (You)", path: 'admin-settings', icon: FiUser }
    ],
    others: [
      { title: "Channel Partner ID (optional)", path: 'channel-partner', icon: FaBriefcase },
      { title: "Alerts and Notifications", path: 'notifications', icon: FaCog },
      { title: "Logout", path: 'logout', icon: FiUser, status: { text: "SECURE", color: "bg-green-100 text-green-600" } }
    ]
  };

  // Filter settings based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search is empty, show all sections
      setFilteredSections({
        attendance: true,
        business: true,
        salary: true,
        businessInfo: true,
        account: true,
        others: true
      });
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Check each section for matches
    const newFilteredSections = {
      attendance: allSettings.attendance.some(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      ),
      business: allSettings.business.some(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      ),
      salary: allSettings.salary.some(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      ),
      businessInfo: allSettings.businessInfo.some(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      ),
      account: allSettings.account.some(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      ),
      others: allSettings.others.some(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
      )
    };
    
    setFilteredSections(newFilteredSections);
  }, [searchTerm]);

  const handleSettingClick = (path) => {
    try {
      // Find the setting in all categories
      let foundSetting = null;
      
      for (const category in allSettings) {
        const setting = allSettings[category].find(item => item.path === path);
        if (setting) {
          foundSetting = setting;
          break;
        }
      }
      
      if (foundSetting) {
        setSelectedSetting(foundSetting);
        // Scroll to top when opening a setting
        window.scrollTo(0, 0);
      } else {
        throw new Error(`Setting with path ${path} not found`);
      }
    } catch (err) {
      console.error("Navigation error:", err);
      setError({ message: "Setting not found", status: 404 });
    }
  };

  const handleBackToSettings = () => {
    setSelectedSetting(null);
  };

  // Filter items within a section based on search term
  const getFilteredItems = (section) => {
    if (!searchTerm.trim()) return allSettings[section];
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allSettings[section].filter(item => 
      item.title.toLowerCase().includes(lowerSearchTerm) || 
      (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
    );
  };

  // If there's an error, show the error fallback
  if (error) {
    return <ErrorFallback />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className={`${componentStyles.header} sticky top-0 z-30`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <h1 className={typography.header}>
            {selectedSetting ? 'Setting Details' : 'Settings'}
          </h1>
          {!selectedSetting && (
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search Settings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-md focus:ring-2 focus:ring-white/50 focus:border-white/50 w-full md:w-64 text-white placeholder-white/70"
                aria-label="Search settings"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" aria-hidden="true" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
      </header>
      
      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <div className={`container mx-auto ${spacing.container}`}>
          {selectedSetting ? (
            <SettingDetail 
              setting={selectedSetting} 
              onBack={handleBackToSettings} 
            />
          ) : (
            <div className="space-y-6">
              {/* Attendance Settings Section */}
              {filteredSections.attendance && (
                <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} transition-all duration-300`}>
                  <SectionHeader 
                    icon={FaCog} 
                    title="Attendance Settings" 
                    count={getFilteredItems('attendance').length}
                  />
                  <div className="divide-y divide-gray-100">
                    {getFilteredItems('attendance').map((item, index) => (
                      <SettingItem 
                        key={`attendance-${index}`}
                        title={item.title} 
                        description={item.description}
                        isNew={item.isNew}
                        isLocked={item.isLocked}
                        icon={item.icon}
                        status={item.status}
                        onClick={() => handleSettingClick(item.path)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Business Settings Section */}
              {filteredSections.business && (
                <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} transition-all duration-300`}>
                  <SectionHeader 
                    icon={FaBriefcase} 
                    title="Business Settings" 
                    count={getFilteredItems('business').length}
                  />
                  <div className="divide-y divide-gray-100">
                    {getFilteredItems('business').map((item, index) => (
                      <SettingItem 
                        key={`business-${index}`}
                        title={item.title} 
                        description={item.description}
                        isNew={item.isNew}
                        isLocked={item.isLocked}
                        icon={item.icon}
                        status={item.status}
                        onClick={() => handleSettingClick(item.path)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Salary Settings Section */}
              {filteredSections.salary && (
                <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} transition-all duration-300`}>
                  <SectionHeader 
                    icon={BsCashStack} 
                    title="Salary Settings" 
                    count={getFilteredItems('salary').length}
                  />
                  <div className="divide-y divide-gray-100">
                    {getFilteredItems('salary').map((item, index) => (
                      <SettingItem 
                        key={`salary-${index}`}
                        title={item.title} 
                        description={item.description}
                        isNew={item.isNew}
                        isLocked={item.isLocked}
                        icon={item.icon}
                        status={item.status}
                        onClick={() => handleSettingClick(item.path)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Business Info Section */}
              {filteredSections.businessInfo && (
                <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} transition-all duration-300`}>
                  <SectionHeader 
                    icon={FaBriefcase} 
                    title="Business Info" 
                    count={getFilteredItems('businessInfo').length}
                  />
                  <div className="divide-y divide-gray-100">
                    {getFilteredItems('businessInfo').map((item, index) => (
                      <SettingItem 
                        key={`businessInfo-${index}`}
                        title={item.title} 
                        description={item.description}
                        isNew={item.isNew}
                        isLocked={item.isLocked}
                        icon={item.icon}
                        status={item.status}
                        onClick={() => handleSettingClick(item.path)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Account Settings Section */}
              {filteredSections.account && (
                <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} transition-all duration-300`}>
                  <SectionHeader 
                    icon={FiUser} 
                    title="Account Settings" 
                    count={getFilteredItems('account').length}
                  />
                  <div className="divide-y divide-gray-100">
                    {getFilteredItems('account').map((item, index) => (
                      <SettingItem 
                        key={`account-${index}`}
                        title={item.title} 
                        description={item.description}
                        isNew={item.isNew}
                        isLocked={item.isLocked}
                        icon={item.icon}
                        status={item.status}
                        onClick={() => handleSettingClick(item.path)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Others Section */}
              {filteredSections.others && (
                <div className={`bg-white ${borders.roundedLg} ${effects.shadowSm} transition-all duration-300`}>
                  <SectionHeader 
                    icon={FaCog} 
                    title="Others" 
                    count={getFilteredItems('others').length}
                  />
                  <div className="divide-y divide-gray-100">
                    {getFilteredItems('others').map((item, index) => (
                      <SettingItem 
                        key={`others-${index}`}
                        title={item.title} 
                        description={item.description}
                        isNew={item.isNew}
                        isLocked={item.isLocked}
                        icon={item.icon}
                        status={item.status}
                        onClick={() => handleSettingClick(item.path)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* No results message */}
              {!Object.values(filteredSections).some(value => value) && (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <FiSearch className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className={`${typography.subheader} mb-2`}>No settings found</h3>
                  <p className={colors.text.muted}>Try adjusting your search term</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className={`mt-4 px-4 py-2 ${colors.primary.button} rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;