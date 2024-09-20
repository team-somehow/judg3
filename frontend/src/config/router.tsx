import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import NotFound from '../pages/NotFound';
import Navbar from '../components/shared/Navbar';
import Home from '../pages/Home';

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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
