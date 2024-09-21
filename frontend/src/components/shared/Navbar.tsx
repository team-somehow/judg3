import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
// import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import useMagicLogin from '../auth/magic/useLogin';
import { useDynamicWallet } from '../auth/dynamic/dynamicHooks';
// import { useNavigate } from 'react-router-dom';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { token, address, setAddress, setToken, currentAuthSupply } = useAuth();
  const { handleLogOut } = useDynamicWallet();
  const { handleDisconnect } = useMagicLogin();
  const navigate = useNavigate();

  const handleDisconnectOnClick = async () => {
    if (currentAuthSupply === 'dynamic') {
      await handleLogOut();
    }
    if (currentAuthSupply === 'magic') {
      await handleDisconnect();
    }
    setAddress('');
    setToken('');
  };

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate('/');
              }}
            >
              <img src="/favicon.svg" style={{ height: '40px' }} />
              <Typography
                variant="h6"
                pl={1}
                sx={{ flexGrow: 1 }}
                fontWeight="bold"
                mr={2}
              >
                Judg3
              </Typography>
            </Box>
            {token && (
              <>
                <Divider orientation="vertical" flexItem />
                <Button
                  variant="outlined"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => {
                    navigate('/event-status');
                  }}
                >
                  View Status
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ gap: 2, display: 'flex' }}>
            {token && (
              <>
                {currentAuthSupply === 'magic' && (
                  <Button variant="outlined">{address}</Button>
                )}

                <Button
                  onClick={handleDisconnectOnClick}
                  variant="text"
                  color="error"
                >
                  logout
                </Button>
              </>
            )}
            {currentAuthSupply === 'dynamic' && (
              <DynamicWidget variant="modal" />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
