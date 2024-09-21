import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Layout from '../components/dashboard/Layout';
import Leaderboard from './VoterLeaderboard';
import Matrix from '../components/shared/MatrixGrid';
import axiosInstance from '../config/axios';

type Props = {};

function EventStatus({}: Props) {
  const [eventID, setEventID] = useState<string>('');
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [matrixData, setMatrixData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);

  const handleEventIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventID(event.target.value);
  };

  const handleViewEventClick = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/matrix', {
        event: parseInt(eventID),
      });
      setMatrixData(response.data);
      console.log('Matrix data:', response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewLeaderboardClick = () => {
    setLoading(true);
    setShowLeaderboard(true);
    console.log('Displaying leaderboard for event:', eventID);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Box>
      <Backdrop open={loading} onClick={() => {}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Layout
        left={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Typography variant="h5" fontWeight="500" mb={1}>
              Event Details
            </Typography>
            <Divider />
            <Typography variant="body1" fontWeight="400" mt={1}>
              Paste in the Event ID to view the event status and details. You
              can view the calculation matrix and the final leaderboard here.
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                label="Event ID"
                variant="filled"
                fullWidth
                value={eventID}
                onChange={handleEventIDChange} // Event ID change handler
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleViewEventClick} // View Event button click handler
              >
                View Event
              </Button>
              <Divider />
              {matrixData.length > 0 ? (
                <>
                  <Typography variant="h6" fontWeight="500">
                    OnChain Matrix
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Matrix matrix={matrixData} />
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleViewLeaderboardClick} // View Leaderboard button click handler
                    >
                      View Leaderboard
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography variant="h6" fontWeight="500">
                  Matrix data will appear here once you click "View Event."
                </Typography>
              )}
            </Box>
          </Box>
        }
        right={
          <Box
            sx={{
              overflow: 'auto',
              display: 'flex',
            }}
          >
            {showLeaderboard ? (
              <Leaderboard title="Final Leaderboard" eventId={eventID} />
            ) : (
              <Typography variant="h6" fontWeight="500" mt={2}>
                Leaderboard will appear here once you click "View Leaderboard."
              </Typography>
            )}
          </Box>
        }
      />
    </Box>
  );
}

export default EventStatus;
