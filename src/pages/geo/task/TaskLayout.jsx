import React from 'react';
import { Outlet } from 'react-router-dom';
import TaskNav from './TaskNav';
import GeoSidebar from '../components/GeoSidebar';

function TaskLayout() {
  return (
    <>
      <GeoSidebar />
      <div className="ml-[250px] flex flex-col h-full">
        <TaskNav />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default TaskLayout