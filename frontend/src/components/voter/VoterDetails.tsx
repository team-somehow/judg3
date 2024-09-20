import React, { useState } from 'react';
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

// Sample JSON data (you can replace this with data fetched from an API)
const votersData = [
  { id: 1, name: 'Pargat Singh', username: '@Pargat-Dhanjal', accepted: null },
  { id: 2, name: 'Pargat Singh', username: '@Pargat-Dhanjal', accepted: null },
  { id: 3, name: 'Pargat Singh', username: '@Pargat-Dhanjal', accepted: null },
];

const VoterDetails: React.FC = () => {
  const [voters, setVoters] = useState(votersData);

  // Handle accept
  const handleAccept = (id: number) => {
    const updatedVoters = voters.map((voter) =>
      voter.id === id ? { ...voter, accepted: true } : voter
    );
    setVoters(updatedVoters);
    console.log(
      'Accepted Voter:',
      updatedVoters.find((voter) => voter.id === id)
    );
  };

  // Handle reject
  const handleReject = (id: number) => {
    const updatedVoters = voters.map((voter) =>
      voter.id === id ? { ...voter, accepted: false } : voter
    );
    setVoters(updatedVoters);
    console.log(
      'Rejected Voter:',
      updatedVoters.find((voter) => voter.id === id)
    );
  };

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
            https://share.url.com
          </Typography>
          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={(e) => {
              navigator.clipboard.writeText('https://share.url.com');
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
        {voters.map((voter) => (
          <Grid item xs={12} key={voter.id}>
            <Card sx={{ display: 'flex', alignItems: 'center' }}>
              <CardContent
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              >
                <Avatar sx={{ bgcolor: 'purple', mr: 2 }}>
                  {voter.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{voter.name}</Typography>
                  <Typography variant="body2">{voter.username}</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAccept(voter.id)}
                    disabled={voter.accepted === true}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleReject(voter.id)}
                    sx={{ ml: 2 }}
                    disabled={voter.accepted === false}
                  >
                    Reject
                  </Button>
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
