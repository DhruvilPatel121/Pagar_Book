import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';

// Import page components
import Dashboard from './pages/Dashboard';
import Staff from './pages/staff/Staff';
import Attendance from './pages/attendance/Attendance';
import Payroll from './pages/payroll/Payroll';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import StaffProfile from './pages/staff/StaffProfile';
import ProfileInfo from './pages/staff/components/ProfileInfo';
import YTDStatement from './pages/staff/components/YTDStatement';
import Fine from './pages/attendance/Fine';
import Overtime from './pages/attendance/Overtime';
import SalaryOverview from './pages/staff/components/SalaryOverview';
import PayrollDetail from './pages/payroll/PayrollDetail';
import Loans from './pages/staff/components/loan/Loans';
import SalaryStructure from './pages/staff/components/SalaryStructure';


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
          // {
          //   path: 'attendance',
          //   element: <div>Attendance Component</div>,
          //   // element: <Attendance />,
          // },
          {
            path: 'salary-overview',
            element: <SalaryOverview />,
          },
          {
            path: 'ytd-statement',
            element: <YTDStatement />,
          },
          {
            path: 'salary-structure',
            element: <SalaryStructure />,
          },
          {
            path: 'loans',
            element: <Loans />,
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
        path: '/payroll/:empId',
        element: <PayrollDetail />,
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