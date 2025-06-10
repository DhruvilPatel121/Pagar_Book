import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomersHeader from './components/CustomersHeader';
import GeoSidebar from '../components/GeoSidebar';

function CustomersLayout() {
  return (
    <>
      <GeoSidebar />
      <div className="ml-[250px] flex flex-col h-full">
          <CustomersHeader />
        <div className="h-full  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default CustomersLayout;