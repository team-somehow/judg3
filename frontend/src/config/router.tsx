import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Navbar from '../components/shared/Navbar';

const router = createBrowserRouter([
  {
    path: 'app',
    element: <Home />,
  },
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
        element: <Box>Dashboard</Box>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
