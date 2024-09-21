import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
} from '@mui/material';
import { Leaderboard, OpenInNew } from '@mui/icons-material';
import CustomStepper from '../shared/CustomStepper';
import axiosInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom';

interface StatusCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
  buttonText: string;
  onButtonClick: () => void;
  isAdmin?: boolean;
  statusAdmin?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  id,
  name,
  description,
  photo,
  buttonText,
  onButtonClick,
  isAdmin = false,
  statusAdmin,
}) => {
  const [status, setStatus] = useState<string>('Pending'); // default is 'Pending'
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) return;
    const fetchStatus = async () => {
      try {
        const response = await axiosInstance.get(`/voter-apply-status/${id}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, [id]);

  return (
    <Card
      sx={{
        p: 1.5,
        borderRadius: '10px',
        width: '100%',
        transition: '0.3s all ease-in-out',
        height: '300px',
        // cursor: "pointer",
        // "&:hover": {
        //   bgcolor: "rgba(255, 255, 255, 0.30)",
        // },
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
            src={photo}
            alt={'image'}
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
                <Avatar
                  aria-label="logo"
                  sx={{
                    bgcolor: 'primary.main',
                    width: 40,
                    height: 40,
                  }}
                >
                  {name[0]}
                </Avatar>
              }
              title={name}
            />
          </Box>
          <Typography
            variant="subtitle2"
            mb={2}
            color="text.secondary"
            sx={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Approval Status
            </Typography>
            <CustomStepper
              status={isAdmin ? statusAdmin! : status}
              isAdmin={isAdmin}
              isRejected={status === 'Rejected'}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={onButtonClick}
              startIcon={<OpenInNew />}
              fullWidth
            >
              {buttonText}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                console.log('View Leaderboard clicked');
                navigate(`/voter-dashboard/leaderboard/${id}`);
              }}
              startIcon={<Leaderboard />}
            >
              View Leaderboard
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default StatusCard;
