import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Add } from '@mui/icons-material';
import GradientCard from '../components/ui/GradientCard';
import Bg from '../components/ui/Bg';
import AdminCreateEventModal from '../components/dashboard/AdminCreateEventModal';

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Box sx={{ p: '2rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Events
        </Typography>

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
        </GradientCard>
      </Container>

      {/* Modal for creating a new event */}
      <AdminCreateEventModal open={open} handleClose={handleClose} />

      <Bg />
    </Box>
  );
};

export default Dashboard;
