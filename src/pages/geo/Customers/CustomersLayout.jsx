import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomersHeader from './components/CustomersHeader';
import GeoSidebar from '../components/GeoSidebar';

function CustomersLayout() {
  return (
    <div className="flex h-full bg-gray-50">
      <GeoSidebar />
      <div className="ml-[250px] flex-1 flex flex-col h-screen">
        <div className="sticky top-0 z-10 bg-gray-50 pb-2 mt-6">
          <CustomersHeader />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CustomersLayout;