import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import Navbar from '../components/shared/Navbar';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import LoginWithMina from '../pages/Login/LoginWithMagic';
import LoginWrapper from '../pages/Login/LoginWrapper';
import LoginWithWorldCoin from '../pages/Login/LoginWithWorldCoin';
import Dashboard from '../pages/Dashboard';
import VoterDashboard from '../pages/VoterDashboard';
import Applications from '../pages/Applications';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box sx={{ minHeight: '100svh' }}>
        <Navbar />
        <Outlet />
      </Box>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginWrapper />,
        children: [
          {
            path: '',
            element: <LoginWithMina />,
          },
          {
            path: 'verify',
            element: <LoginWithWorldCoin />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
      // ADMIN ROUTES
      {
        path: '/dashboard',
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
          {
            path: 'applications',
            element: <Applications />,
          },
        ],
      },
      // VOTER ROUTES
      {
        path: '/voter-dashboard',
        element: <VoterDashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
