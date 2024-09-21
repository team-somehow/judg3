import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import CustomModal from '../shared/CustomModal';
import { uploadFileToFirebase } from '../../utils/uploadFile';
import axiosInstance from '../../config/axios';
import { enqueueSnackbar } from 'notistack';

interface AdminCreateEventModalProps {
  open: boolean;
  handleClose: () => void;
}

const AdminCreateEventModal: React.FC<AdminCreateEventModalProps> = ({
  open,
  handleClose,
}) => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    image: null as File | null,
    imageURL: null as string | null,
    uploading: false,
  });

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
        setFormData((prevData) => ({
          ...prevData,
          image: file,
          uploading: true,
        }));
        handleUpload(file);
      }
    },
    []
  );

  // Handle file upload to Firebase
  const handleUpload = async (file: File) => {
    try {
      const path = `events/${file.name}`;
      const imageUrl = await uploadFileToFirebase(file, path);
      if (imageUrl) {
        setFormData((prevData) => ({
          ...prevData,
          imageURL: imageUrl,
          uploading: false,
        }));
      } else {
        throw new Error('Failed to upload the image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setFormData((prevData) => ({
        ...prevData,
        uploading: false,
      }));
    }
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    if (!formData.eventName || !formData.description || !formData.imageURL) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'error' });
      return;
    }
    console.log("trg", formData);
    
    try {
      const response = await axiosInstance.post('/event/', {
        name: formData.eventName,
        description: formData.description,
        photo: formData.imageURL,
      });

      if (response.status === 201) {
        enqueueSnackbar('Event created successfully.', { variant: 'success' });
        handleClose();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      enqueueSnackbar('Failed to create event.', { variant: 'error' });
    }
  };

  return (
    <CustomModal
      title="Add New Event"
      description="Complete the following fields to create a voting event where participants can cast their votes."
      content={
        <Box>
          {!formData.imageURL ? (
            <>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
                disabled={formData.uploading}
              >
                {formData.uploading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Upload Photo'
                )}
                <input type="file" hidden onChange={handleImageChange} />
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
      onSubmit={handleFormSubmit}
    />
  );
};

export default AdminCreateEventModal;
