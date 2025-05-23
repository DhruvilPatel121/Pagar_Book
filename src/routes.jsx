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
// import PagarBookGeo from './pages/geo/PagarBookGeo';
import GeoDashboard from './pages/geo/dashboard/geodashboard';
import TrackingLayout from './pages/geo/tracking/TrackingLayout';
import GeoTracking from './pages/geo/tracking/GeoTracking';
import TimelineView from './pages/geo/tracking/TimelineView';
import TrackingDashboard from './pages/geo/tracking/TrackingDashboard';
import TrackingReports from './pages/geo/tracking/TrackingReports';
import TrackingSettings from './pages/geo/tracking/TrackingSettings';
import FormResponses from './pages/geo/forms/FormResponses';
import FormTemplates from './pages/geo/forms/FormTemplates';
import FormReports from './pages/geo/forms/FormReports';
import FormTemplateEditor from './pages/geo/forms/FormTemplateEditor';
// import FormHowToUse from './pages/geo/forms/FormHowToUse';
// Remove the duplicate import below
// import FormTemplateEditor from './pages/geo/forms/FormTemplateEditor';

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
        element: <GeoDashboard />,
      },
      {
        path: '/geo/tracking',
        element: <TrackingLayout />,
        children: [
          {
            index: true,
            element: <GeoTracking />,
          },
          {
            path: 'timeline',
            element: <TimelineView />,
          },
          {
            path: 'dashboard',
            element: <TrackingDashboard />,
          },
          {
            path: 'reports',
            element: <TrackingReports />,
          },
          {
            path: 'settings',
            element: <TrackingSettings />,
          },
        ],
      },
      // Forms routes
      {
        path: '/geo/forms',
        element: <Navigate to="/geo/forms/responses" replace />,
      },
      {
        path: '/geo/forms/responses',
        element: <FormResponses />,
      },
      {
        path: '/geo/forms/templates',
        element: <FormTemplates />,
      },
      {
        path: '/geo/forms/templates/new',
        element: <FormTemplateEditor />,
      },
      {
        path: '/geo/forms/templates/edit/:id',
        element: <FormTemplateEditor />,
      },
      {
        path: '/geo/forms/reports',
        element: <FormReports />,
      },
      // {
      //   path: '/geo/forms/how-to-use',
      //   element: <FormHowToUse />,
      // }
    ],
  },
]);