import React, { useState } from 'react';
import { Box, Button, Typography, Container, Tabs, Tab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LiveEvents from '../components/dashboard/LiveEvents';
import PastEvents from '../components/dashboard/PastEvents';
import GradientCard from '../components/ui/GradientCard';
import Bg from '../components/ui/Bg';
import { storage } from '../config/firebase';
import AdminCreateEventModal from '../components/dashboard/AdminCreateEventModal';

function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    image: null as File | null,
    imageURL: null as string | null,
    uploading: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      eventName: '',
      description: '',
      image: null,
      imageURL: null,
      uploading: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      const reader = new FileReader();
      reader.onload = () =>
        setFormData((prevData) => ({
          ...prevData,
          imageURL: reader.result as string,
        }));
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (formData.image) {
      const storageRef = ref(storage, `events/${formData.image.name}`);
      setFormData((prevData) => ({ ...prevData, uploading: true }));

      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload failed:', error);
          setFormData((prevData) => ({ ...prevData, uploading: false }));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prevData) => ({
              ...prevData,
              imageURL: downloadURL, // Set Firebase URL here
              uploading: false,
            }));

            // Log event name, description, and the Firebase image URL here
            console.log('Event Name:', formData.eventName);
            console.log('Description:', formData.description);
            console.log('Firebase Image URL:', downloadURL); // Log the correct URL
          });
        }
      );
    }
  };

  const handleSubmit = () => {
    // Log event details on form submission
    console.log('Event Name:', formData.eventName);
    console.log('Description:', formData.description);
    console.log('Image URL:', formData.imageURL);
    // Additional logic for submitting the event can be added here
    handleClose();
  };

  return (
    <Box sx={{ p: '2rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600">
          Events
        </Typography>

        {/* Tabs for switching between Live and Past events */}
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

        {/* Main content card */}
        <GradientCard style={{ minHeight: '70vh' }}>
          {/* Add New Event button - visible outside the modal */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Add />}
            onClick={handleOpen}
            sx={{ textTransform: 'none', padding: 1.5, mb: 2 }}
          >
            Add New Event
          </Button>
          {tabValue === 0 && <LiveEvents />}
          {tabValue === 1 && <PastEvents />}
        </GradientCard>
      </Container>

      <AdminCreateEventModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleUpload={handleUpload}
        handleSubmit={handleSubmit}
      />

      <Bg />
    </Box>
  );
}

export default Dashboard;
