import { Box } from '@mui/material';
import React from 'react';
import GradientCard from '../ui/GradientCard';

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

function Layout({ left, right }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 80px)',
        p: 1,
        width: '100%',
      }}
    >
      <GradientCard
        children={left}
        style={{
          height: '100%',
          width: '65%',
        }}
      />
      <GradientCard
        children={right}
        style={{
          height: '100%',
          width: '35%',
        }}
      />
    </Box>
  );
}

export default Layout;
