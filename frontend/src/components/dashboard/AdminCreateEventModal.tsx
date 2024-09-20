import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import CustomModal from '../shared/CustomModal';
import { uploadFileToFirebase } from '../../utils/uploadFile';

interface AdminCreateEventModalProps {
  open: boolean;
  handleClose: () => void;
  formData: {
    eventName: string;
    description: string;
    image: File | null;
    imageURL: string | null;
    uploading: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      eventName: string;
      description: string;
      image: File | null;
      imageURL: string | null;
      uploading: boolean;
    }>
  >;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
}

const AdminCreateEventModal: React.FC<AdminCreateEventModalProps> = ({
  open,
  handleClose,
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files![0],
        uploading: true,
      }));
      handleUpload(e.target.files[0]);
    }
  };

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

  const handleFormSubmit = async () => {
    try {
      if (!formData.eventName || !formData.description) {
        throw new Error('Event name and description are required.');
      }

      await handleSubmit();
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
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
