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
import TaskLayout from './pages/geo/task/TaskLayout';
import TaskDashboard from './pages/geo/task/TaskDashboard';
import TaskList from './pages/geo/task/taskList/TaskList';
import AssignTask from './pages/geo/task/assignTask/AssignTask';
import TaskReports from './pages/geo/task/TaskReports';
import TaskSettings from './pages/geo/task/TaskSettings';
import TaskPending from './pages/geo/task/taskList/TaskPending';
import TaskRequest from './pages/geo/task/taskList/TaskRequest';
import CustomersLayout from './pages/geo/customers/CustomersLayout';
import CustomersDashboard from './pages/geo/customers/CustomersDashboard';
import EditCustomer from './pages/geo/customers/EditCustomer';
import CustomersList from './pages/geo/customers/CustomersList';
import CustomersSettings from './pages/geo/customers/CustomersSettings';
import CustomersTemplate from './pages/geo/customers/CustomersTemplate';
import StaffPermissions from './pages/geo/customers/StaffPermissions';
import AddCustomer from './pages/geo/customers/AddCustomer';
import ManageCustomersBulk from './pages/geo/customers/ManageCustomersBulk';


// Import Orders components
// import OrdersLayout from './pages/geo/orders/OrdersLayout';
// import OrdersDashboard from './pages/geo/orders/OrdersDashboard';
// import OrdersList from './pages/geo/orders/OrdersList';
// import AddOrder from './pages/geo/orders/AddOrder';
// import OrderDetails from './pages/geo/orders/OrderDetails';
// import OrderSettindgs from './pages/geo/orders/OrderSettings';


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
      // Task routes
      {
        path: '/geo/tasks',
        element: <TaskLayout />,
        children: [
          {
            index: true,
            element: <TaskDashboard />,
          },
          {
            path: 'list',
            element: <TaskList />,
          },
          {
            path: 'list/all',
            element: <TaskList />,
          },
          {
            path: 'list/pending',
            element: <TaskPending />,
          },
          {
            path: 'list/requests',
            element: <TaskRequest />,
          },
          {
            path: 'assign',
            element: <AssignTask />,
          },
          {
            path: 'reports',
            element: <TaskReports />,
          },
          {
            path: 'settings',
            element: <TaskSettings />,
          },
        ],
      },
      // Customers routes
      {
        path: '/geo/customers',
        element: <CustomersLayout />,
        children: [
          {
            index: true,
            element: <CustomersDashboard />,
          },
          {
            path: 'list',
            element: <CustomersList />
          },
          {
            path: 'edit/:id',
            element: <EditCustomer />,
          },
          {
            path: 'settings',
            element: <CustomersSettings />,
          },
          {
            path: 'template',
            element: <CustomersTemplate />,
          },
          {
            path: 'staff-permissions',
            element: <StaffPermissions />,
          },
          {
            path: 'add',
            element: <AddCustomer />,
          },
          {
            path: 'bulk',
            element: <ManageCustomersBulk />,
          },
        ],
      },
      // Orders routes
      // {
      //   path: '/geo/orders',
      //   element: <OrdersLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <OrdersDashboard />,
      //     },
          // {
          //   path: 'list',
          //   element: <OrdersList />,
          // },
          // {
          //   path: 'add',
          //   element: <AddOrder />,
          // },
          // {
          //   path: 'details/:id',
          //   element: <OrderDetails />,
          // },
          // {
          //   path: 'settings',
          //   element: <OrderSettings />,
          // },
        ],
      },
    ],
  },
]);