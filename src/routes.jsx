import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';

// Import page components
import Dashboard from './pages/Dashboard';
import Staff from './pages/Staff';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Fine from './pages/Fine';
import Overtime from './pages/Overtime';

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