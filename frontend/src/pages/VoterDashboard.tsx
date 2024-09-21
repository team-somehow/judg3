import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Tabs, Tab } from '@mui/material';
import GradientCard from '../components/ui/GradientCard';
import Bg from '../components/ui/Bg';
import UpcomingEvents from '../components/voter/UpcomingEvents';
import AppliedEvents from '../components/voter/AppliedEvents';

function VoterDashboard() {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');

  const [tabValue, setTabValue] = useState(tab === 'applied' ? 1 : 0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabValue === 1 ? 'applied' : 'upcoming');
    window.history.pushState({}, '', url.toString());
  }, [tabValue]);

  return (
    <Box sx={{ p: '2rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Voter Events
        </Typography>

        {/* Tabs for switching between Live and Past events */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Hackathon Tabs"
          sx={{ mb: 3 }}
        >
          <Tab
            label="Upcoming"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              color: tabValue === 0 ? 'color.primary' : 'text.secondary',
            }}
          />
          <Tab
            label="Applied"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              color: tabValue === 1 ? 'color.primary' : 'text.secondary',
            }}
          />
        </Tabs>

        <GradientCard style={{ minHeight: '70vh' }}>
          {tabValue === 0 && <UpcomingEvents />}
          {tabValue === 1 && <AppliedEvents />}
        </GradientCard>
      </Container>

      <Bg />
    </Box>
  );
}

export default VoterDashboard;
