import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';

// Import page components
import Dashboard from './pages/Dashboard';
import Staff from './pages/staff/Staff';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Fine from './pages/Fine';
import Overtime from './pages/Overtime';

import StaffProfile from './pages/staff/StaffProfile';
import ProfileInfo from './pages/staff/components/ProfileInfo';
import YTDStatement from './pages/staff/components/YTDStatement';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/staff',
        element: <Staff />,
      },
      {
        path: '/staff/:id',
        element: <StaffProfile />,
        children: [
          {
            index: true,
            element: <Navigate to="personal" replace />,
          },
          {
            path: 'personal',
            element: <ProfileInfo />,
          },
          {
            path: 'attendance',
            element: <div>Attendance Component</div>,
          },
          {
            path: 'salary-overview',
            element: <div>Salary Overview Component</div>,
          },
          {
            path: 'ytd-statement',
            element: <YTDStatement />,
          },
          {
            path: 'salary-structure',
            element: <div>Salary Structure Component</div>,
          },
          {
            path: 'loans',
            element: <div>Loans Component</div>,
          },
        ],
      },
      {
        path: '/attendance',
        element: <Attendance />,
      },
      {
        path: '/fine',
        element: <Fine />,
      },
      {
        path: '/overtime',
        element: <Overtime />, 
      },
      {
        path: '/payroll',
        element: <Payroll />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);