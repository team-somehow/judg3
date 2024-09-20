import React, { useState } from 'react';
import { Box, Button, Container, Typography, Tabs, Tab } from '@mui/material';
import LiveEvents from '../components/dashboard/LiveEvents';
import PastEvents from '../components/dashboard/PastEvents';
import Bg from '../components/ui/Bg';
import GradientCard from '../components/ui/GradientCard';
import { Add } from '@mui/icons-material';

function Dashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        p: '2rem',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600">
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
        <GradientCard
          style={{
            minHeight: '70vh',
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Add />}
            sx={{
              textTransform: 'none',
              padding: 1.5,
              mb: 2,
            }}
          >
            Add New Event
          </Button>
          {tabValue === 0 && <LiveEvents />}
          {tabValue === 1 && <PastEvents />}
        </GradientCard>
      </Container>
      <Bg />
    </Box>
  );
}

export default Dashboard;
