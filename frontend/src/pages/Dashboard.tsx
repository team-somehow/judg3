import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Tabs,
  Tab,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LiveEvents from '../components/dashboard/LiveEvents';
import PastEvents from '../components/dashboard/PastEvents';
import GradientCard from '../components/ui/GradientCard';
import CustomModal from '../components/shared/CustomModal';
import Bg from '../components/ui/Bg';
import { storage } from '../config/firebase';

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

      <CustomModal
        title="Add New Event"
        description="Complete the following fields to create a voting event where participants can cast their votes. Specify details such as the event name, description, voting period, and criteria for eligible voters. This form streamlines event setup and ensures a smooth voting process."
        content={
          <Box>
            {!formData.imageURL ? (
              <>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      handleImageChange(e);
                      handleUpload();
                    }}
                  />
                </Button>
              </>
            ) : (
              <Box>
                <Box
                  component="img"
                  src={formData.imageURL}
                  alt="Uploaded Image Preview"
                  sx={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                />
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Image uploaded successfully.
                </Typography>
              </Box>
            )}

            <TextField
              variant="filled"
              label="Event Name"
              name="eventName"
              fullWidth
              value={formData.eventName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="filled"
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </Box>
        }
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Bg />
    </Box>
  );
}

export default Dashboard;
