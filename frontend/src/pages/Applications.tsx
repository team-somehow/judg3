import Layout from '../components/dashboard/Layout';
import { Box, Button, Divider, Typography } from '@mui/material';
import CustomStepper from '../components/shared/CustomStepper';
import VoterDetails from '../components/voter/VoterDetails';
import { useParams } from 'react-router-dom';

// type Props = {};

function Applications() {
  const { id } = useParams();

  if (!id) {
    return <Typography variant="h6">Please select an event</Typography>;
  }

  return (
    <Box>
      <Layout
        left={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <VoterDetails eventId={id} />
          </Box>
        }
        right={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Box>
              <Typography variant="h6">Event Status</Typography>
              <Divider />
              <CustomStepper status="Open Applications" isAdmin isVertical />
            </Box>
            <Button variant="contained" fullWidth>
              Next
            </Button>
          </Box>
        }
      />
    </Box>
  );
}

export default Applications;
