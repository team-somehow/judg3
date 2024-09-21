import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';
import { Cloud, Link, Share } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from '../../config/axios';

type Props = {
  eventId: string;
};

interface Voter {
  voter_id: number;
  status: string;
}

const Upload: React.FC<Props> = ({ eventId }) => {
  const [voters, setVoters] = useState<Voter[]>();

  useEffect(() => {
    const getVoters = async () => {
      try {
        const response = await axiosInstance.get(`voters/${eventId}`);
        console.log('Voters:', response.data);
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching voters:', error);
      }
    };
    getVoters();
  }, [eventId]);

  // Handle accept
  const handleAccept = async (voterId: number) => {
    try {
      const response = await axiosInstance.post('/voters/update-status/', {
        event_id: Number(eventId), // Ensure event_id is a number
        voter_id: voterId,
        status: 'Accepted',
      });
      console.log('Voter accepted:', response.data);
      // Update state to reflect the accepted status
      setVoters((prevVoters) =>
        prevVoters.map((voter) =>
          voter.voter_id === voterId ? { ...voter, status: 'Accepted' } : voter
        )
      );
    } catch (error) {
      console.error('Error accepting voter:', error);
    }
  };

  // Handle reject
  const handleReject = async (voterId: number) => {
    try {
      const response = await axiosInstance.post('/voters/update-status/', {
        event_id: Number(eventId), // Ensure event_id is a number
        voter_id: voterId,
        status: 'Rejected',
      });
      console.log('Voter rejected:', response.data);
      // Update state to reflect the rejected status
      setVoters((prevVoters) =>
        prevVoters.map((voter) =>
          voter.voter_id === voterId ? { ...voter, status: 'Rejected' } : voter
        )
      );
    } catch (error) {
      console.error('Error rejecting voter:', error);
    }
  };

  if (!voters) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight="500">
          Upload Project Details
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="body1" color="textSecondary">
        Upload project details here to start the voting process. Streamline your
        project submission process with two flexible options
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        fontWeight="bold"
        mt={3}
        sx={{
          color: 'text.primary',
        }}
      >
        1. Implement Webhook Url
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Copy and implement the webhook URL in your project's backend to automate
        the project addition process
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.10)',
          p: 1,
          borderRadius: '5px',
          width: '400px',
          mt: 2,
        }}
      >
        <Link sx={{ mx: 1 }} />
        <Typography variant="body1" sx={{ mr: 2 }}>
          https://3-cast.web.app
        </Typography>
        <Button
          variant="contained"
          startIcon={<Share />}
          onClick={(e) => {
            navigator.clipboard.writeText('https://3-cast.web.app');
            enqueueSnackbar('Link copied to clipboard', {
              variant: 'success',
            });
          }}
        >
          Copy Link
        </Button>
      </Box>
      <Typography
        variant="body1"
        color="textSecondary"
        fontWeight="bold"
        mt={3}
        sx={{
          color: 'text.primary',
        }}
      >
        2. Upload Projects Json
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Upload a JSON file containing the project details to add the project
        manually to the platform
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Cloud />}
          fullWidth
          sx={{
            padding: '50px 20px',
          }}
        >
          Upload JSON
        </Button>
      </Box>
    </Box>
  );
};

export default Upload;
