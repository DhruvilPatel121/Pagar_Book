import React from 'react';
import { Outlet } from 'react-router-dom';
import TrackingNav from './TrackingNav';
import GeoSidebar from '../components/GeoSidebar';

function TrackingLayout() {
  return (
    <>
      <GeoSidebar />
      <div className="ml-[250px] flex flex-col h-full">
        <TrackingNav />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default TrackingLayout
