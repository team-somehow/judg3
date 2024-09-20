import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import NotFound from '../pages/NotFound';
import Navbar from '../components/shared/Navbar';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

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
      // ADMIN ROUTES
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      // VOTER ROUTES
      {
        path: '/vote',
        element: <h1>Vote</h1>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
