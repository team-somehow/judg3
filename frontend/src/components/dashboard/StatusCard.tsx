import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
} from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import AdminStepper from '../shared/AdminStepper';

interface StatusCardProps {
  image: string;
  logo: string;
  eventName: string;
  eventHost: string;
  description: string;
  approvalStatus: string;
  buttonText: string;
  onButtonClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  image,
  logo,
  eventName,
  eventHost,
  description,
  approvalStatus,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Card
      sx={{
        p: 1.5,
        borderRadius: '10px',
        cursor: 'pointer',
        transition: '0.3s all ease-in-out',
        '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.30)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          height: '100%',
          borderRadius: '5px',
          background: 'rgba(0, 0, 0, 0.40)',
          p: 1,
        }}
      >
        <Box sx={{ width: '40%', height: '100%' }}>
          <img
            src={image}
            alt={eventName}
            style={{
              width: '100%',
              borderRadius: '5px',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={{ width: '60%', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <CardHeader
              sx={{
                px: 0,
                py: 0.5,
              }}
              avatar={
                <Avatar aria-label="logo">
                  <img
                    src={logo}
                    alt="E"
                    style={{ width: '40px', height: '40px' }}
                  />
                </Avatar>
              }
              title={eventName}
              subheader={eventHost}
            />
          </Box>
          <Typography variant="subtitle2" mb={2} color="text.secondary">
            {description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Approval Status
            </Typography>
            <AdminStepper status={approvalStatus} />
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={onButtonClick}
            startIcon={<OpenInNew />}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default StatusCard;
