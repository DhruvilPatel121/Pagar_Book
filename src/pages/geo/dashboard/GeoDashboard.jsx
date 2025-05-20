import React from 'react';
import GeoSidebar from '../components/GeoSidebar';
import { useLocation } from 'react-router-dom';
import { componentStyles } from '../../../theme';
import TasksOverview from './TasksOverview';
import CustomersOverview from './CustomersOverview';
import DistanceChart from './DistanceChart';
import BusinessOverview from './BusinessOverview';
// import GeoTracking from '../tracking/GeoTracking';
import { MdPeople, MdAccessTime, MdLogin, MdLogout } from 'react-icons/md';

const GeoDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const geo = componentStyles.geoPage;

  const renderContent = () => {
    if (currentPath === '/geo') {
      return (
        <>
          {/* Dashboard Header */}
          <div className={geo.header}>
            <h1 className={geo.headerTitle}>Dashboard</h1>
            <div className="flex items-center gap-3">
              <button className={geo.headerButton}>Add Location</button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <StatsCards />
          
          {/* Tasks and Customers Overview */}
          <div className={geo.dashboard.overviewGrid}>
            <TasksOverview />
            <CustomersOverview />
          </div>
          
          {/* Distance Travelled Chart */}
          <DistanceChart />
          
          {/* Business Overview */}
          <BusinessOverview />
        </>
      );
    } else if (currentPath === '/geo/tracking') {
      return <GeoTracking />;
    } else {
      const pageName = currentPath.split('/').pop();
      const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
      return (
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">{formattedPageName}</h2>
          <p className="text-gray-600">
            This is the {formattedPageName} page of PagarBook Geo. Content coming soon.
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <GeoSidebar />
      <div className={geo.content}>
        {currentPath !== '/geo' && (
          <div className={geo.header}>
            <h1 className={geo.headerTitle}>PagarBook Geo</h1>
            <div className="flex items-center gap-3">
              <span className={geo.headerBadge}>New</span>
              <button className={geo.headerButton}>Add Location</button>
            </div>
          </div>
        )}
        {renderContent()}
      </div>
    </>
  );
};

// Stats Cards Component
const StatsCards = () => {
  const ds = componentStyles.geoPage.dashboard;
  return (
    <div className={ds.statsGrid}>
      <div className={ds.statCard.green}>
        <div className="flex justify-between items-start">
          <div>
            <p className={ds.statCard.label}>Total Employees</p>
            <h3 className={ds.statCard.value}>2</h3>
          </div>
          <div className={ds.statCard.icon.green}>
            <MdPeople />
          </div>
        </div>
      </div>
      
      <div className={ds.statCard.purple}>
        <div className="flex justify-between items-start">
          <div>
            <p className={ds.statCard.label}>Not Started</p>
            <h3 className={ds.statCard.value}>0</h3>
          </div>
          <div className={ds.statCard.icon.purple}>
            <MdAccessTime />
          </div>
        </div>
      </div>
      
      <div className={ds.statCard.purple}>
        <div className="flex justify-between items-start">
          <div>
            <p className={ds.statCard.label}>Punched In</p>
            <h3 className={ds.statCard.value}>2</h3>
          </div>
          <div className={ds.statCard.icon.purple}>
            <MdLogin />
          </div>
        </div>
      </div>
      
      <div className={ds.statCard.blue}>
        <div className="flex justify-between items-start">
          <div>
            <p className={ds.statCard.label}>Punched Out</p>
            <h3 className={ds.statCard.value}>0</h3>
          </div>
          <div className={ds.statCard.icon.blue}>
            <MdLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoDashboard;