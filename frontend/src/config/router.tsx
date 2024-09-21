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
import VotingSystem from '../components/voter/Voting';
import VoterLeaderboard from '../pages/VoterLeaderboard';
import AuthWrapper from '../components/ui/AuthWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box sx={{ minHeight: '100svh' }}>
        {/* <AuthWrapper> */}
        <Navbar />
        <Outlet />
        {/* </AuthWrapper> */}
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
            path: 'applications/:id',
            element: <Applications />,
          },
        ],
      },
      // VOTER ROUTES
      {
        path: '/voter-dashboard',
        children: [
          {
            path: '',
            element: <VoterDashboard />,
          },
          {
            path: 'voting/:id',
            element: <VotingSystem />,
          },
          {
            path: 'leaderboard',
            element: <VoterLeaderboard />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
