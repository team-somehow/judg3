import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Container, Tabs, Tab } from '@mui/material';
import { Add } from '@mui/icons-material';
import GradientCard from '../components/ui/GradientCard';
import Bg from '../components/ui/Bg';
import AdminCreateEventModal from '../components/dashboard/AdminCreateEventModal';
import LiveEvents from '../components/dashboard/LiveEvents';
import PastEvents from '../components/dashboard/PastEvents';

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: '2rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Events
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Hackathon Tabs"
          sx={{ mb: 3 }}
        >
          <Tab
            label="Live"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              color: tabValue === 0 ? 'color.primary' : 'text.secondary',
            }}
          />
          <Tab
            label="Past"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              color: tabValue === 1 ? 'color.primary' : 'text.secondary',
            }}
          />
        </Tabs>

        <GradientCard style={{ minHeight: '70vh', p: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleOpen}
            sx={{ textTransform: 'none', padding: 1.5, mb: 2 }}
            fullWidth
          >
            Add New Event
          </Button>
          {tabValue === 0 && <LiveEvents />}
          {tabValue === 1 && <PastEvents />}
        </GradientCard>
      </Container>

      {/* Modal for creating a new event */}
      <AdminCreateEventModal open={open} handleClose={handleClose} />

      <Bg />
    </Box>
  );
};

export default Dashboard;
