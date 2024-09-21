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
import { Link, Share } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from '../../config/axios';

// Sample JSON data (you can replace this with data fetched from an API)

type Props = {
  eventId: string;
};

interface Voter {
  voterId: number;
  status: string;
}

const VoterDetails: React.FC<Props> = ({ eventId }) => {
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
  const handleAccept = (id: number) => {
    // const updatedVoters = voters.map((voter) =>
    //   voter.id === id ? { ...voter, accepted: true } : voter
    // );
    // setVoters(updatedVoters);
    // console.log(
    //   'Accepted Voter:',
    //   updatedVoters.find((voter) => voter.id === id)
    // );
  };

  // Handle reject
  const handleReject = (id: number) => {
    // const updatedVoters = voters.map((voter) =>
    //   voter.id === id ? { ...voter, accepted: false } : voter
    // );
    // setVoters(updatedVoters);
    // console.log(
    //   'Rejected Voter:',
    //   updatedVoters.find((voter) => voter.id === id)
    // );
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
          Voter Details
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.10)',
            p: 1,
            borderRadius: '5px',
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
            Share Event
          </Button>
        </Box>
      </Box>
      <Divider />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {voters.map((voter, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <CardContent
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              >
                <Avatar sx={{ bgcolor: 'purple', mr: 2 }}>{index + 1}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{voter.voterId}</Typography>
                  {/* <Typography variant="body2">{voter.voterId}</Typography> */}
                </Box>
                <Box>
                  {voter.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAccept(voter.voterId)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleReject(voter.voterId)}
                        sx={{ ml: 2 }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {voter.status === 'accepted' && (
                    <Typography variant="body2" color="success.main">
                      Accepted
                    </Typography>
                  )}
                  {voter.status === 'rejected' && (
                    <Typography variant="body2" color="error.main">
                      Rejected
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VoterDetails;
