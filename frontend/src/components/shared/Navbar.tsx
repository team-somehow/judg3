import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider } from '@mui/material';

const NavBar: React.FC = () => {
  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <img src="/favicon.svg" style={{ height: '40px' }} />
          <Typography
            variant="h6"
            pl={1}
            sx={{ flexGrow: 1 }}
            fontWeight="bold"
          >
            3-Cast
          </Typography>
          <Box sx={{ gap: 2, display: 'flex' }}>
            <Button variant="contained">Organise Voting</Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button variant="outlined">Start Voting</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
