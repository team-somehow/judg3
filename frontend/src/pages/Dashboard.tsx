import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Container, Tabs, Tab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

import LiveEvents from '../components/dashboard/LiveEvents';
import PastEvents from '../components/dashboard/PastEvents';
import GradientCard from '../components/ui/GradientCard';
import Bg from '../components/ui/Bg';
import AdminCreateEventModal from '../components/dashboard/AdminCreateEventModal';

// Define a TypeScript interface for form data
interface FormData {
  eventName: string;
  description: string;
  image: File | null;
  imageURL: string | null;
  uploading: boolean;
}

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    eventName: '',
    description: '',
    image: null,
    imageURL: null,
    uploading: false,
  });

  // Handle tab change
  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    []
  );

  // Open and close modal handlers
  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setFormData({
      eventName: '',
      description: '',
      image: null,
      imageURL: null,
      uploading: false,
    });
  }, []);

  // Handle input changes for text fields
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  // Handle image file selection
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prevData) => ({ ...prevData, image: file }));
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevData) => ({
            ...prevData,
            imageURL: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  // Handle file upload to Firebase
  const handleUpload = useCallback(() => {
    if (!formData.image) {
      console.warn('No image selected for upload.');
      return;
    }

    const storageRef = ref(storage, `events/${formData.image.name}`);
    setFormData((prevData) => ({ ...prevData, uploading: true }));

    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    uploadTask.on(
      'state_changed',
      (error) => {
        console.error('Upload failed:', error);
        setFormData((prevData) => ({ ...prevData, uploading: false }));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((prevData) => ({
              ...prevData,
              imageURL: downloadURL,
              uploading: false,
            }));
            console.log('File available at', downloadURL);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            setFormData((prevData) => ({ ...prevData, uploading: false }));
          });
      }
    );
  }, [formData.image]);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    if (!formData.imageURL) {
      console.warn('Please upload an image before submitting.');
      return;
    }

    const { eventName, description, imageURL } = formData;
    console.log('Event Name:', eventName);
    console.log('Description:', description);
    console.log('Image URL:', imageURL);

    // TODO: Implement actual submission logic (e.g., API call)

    handleClose();
  }, [formData, handleClose]);

  return (
    <Box sx={{ p: '2rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Events
        </Typography>

        {/* Tabs for Live and Past Events */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Events Tabs"
          sx={{ mb: 3 }}
        >
          <Tab
            label="Live"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              color: tabValue === 0 ? 'primary.main' : 'text.secondary',
            }}
          />
          <Tab
            label="Past"
            sx={{
              textTransform: 'none',
              fontSize: '1.2rem',
              color: tabValue === 1 ? 'primary.main' : 'text.secondary',
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
};

export default Dashboard;
