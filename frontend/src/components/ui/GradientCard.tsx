import { Card, SxProps, Theme } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  style?: SxProps<Theme>;
};

function GradientCard({ children, style }: Props) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(180deg, #2B243C -32.77%, #0B031E 100%)',
        color: 'white',
        padding: '1rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.20)',
        margin: '0.5rem',
        overflowX: 'auto',
        ...style,
      }}
    >
      {children}
    </Card>
  );
}

export default GradientCard;
