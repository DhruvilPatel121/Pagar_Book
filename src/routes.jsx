import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
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
// import PagarBookGeo from './pages/geo/PagarBookGeo';
import GeoDashboard from './pages/geo/dashboard/GeoDashboard';
// import TrackingLayout from './pages/geo/tracking/TrackingLayout';
// import GeoTracking from './pages/geo/tracking/GeoTracking';
// import TimelineView from './pages/geo/tracking/TimelineView';
// import TrackingDashboard from './pages/geo/tracking/TrackingDashboard';
// import TrackingReports from './pages/geo/tracking/TrackingReports';
// import TrackingSettings from './pages/geo/tracking/TrackingSettings';
// import TrackingGuide from './pages/geo/tracking/TrackingGuide';
// import { FormResponses } from './pages/geo/forms';
import FormResponses from './pages/geo/forms/FormResponses';
import ResponseDetail from './pages/geo/forms/ResponseDetail';

// Create a wrapper component for Geo pages
const GeoWrapper = () => {
  return (
    <>
      <GeoDashboard />
      <div style={{ marginLeft: '225px', paddingTop: '1rem' }}>
        <Outlet />
      </div>
    </>
  );
};

// Create a Forms wrapper
const FormsWrapper = () => {
  return <Outlet />;
};

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
      {
        path: '/geo',
        // element: <PagarBookGeo />,
        element: <GeoWrapper />,
        children: [
          {
            index: true,
            element: <div className="p-6">Welcome to Geo Dashboard</div>,
          },
          // {
          //   path: 'tracking',
          //   element: <GeoTracking />,
          // },
          // {
          //   path: 'tracking/timeline',
          //   element: <TimelineView />,
          // },
          // {
          //   path: 'tracking/dashboard',
          //   element: <TrackingDashboard />,
          // },
          // {
          //   path: 'tracking/reports',
          //   element: <TrackingReports />,
          // },
          // {
          //   path: 'tracking/settings',
          //   element: <TrackingSettings />,
          // },
          // {
          //   path: 'tracking/guide',
          //   element: <TrackingGuide />,
          // },
          {
            path: 'forms',
            element: <FormsWrapper />,
            children: [
              {
                index: true,
                element: <Navigate to="responses" replace />,
              },
              {
                path: 'responses',
                element: <FormResponses />,
              },
              {
                path: 'response/:responseId',
                element: <ResponseDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);