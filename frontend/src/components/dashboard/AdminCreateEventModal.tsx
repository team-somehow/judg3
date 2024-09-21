import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import CustomModal from '../shared/CustomModal';
import { uploadFileToFirebase } from '../../utils/uploadFile';
import axiosInstance from '../../config/axios';
import { enqueueSnackbar } from 'notistack';
import { useFlowInteraction } from '../../hooks/useFlowInteraction';
import useMorphInteractions from '../../hooks/morph/useInteractions';
import { useAuth } from '../../context/AuthContext';

interface AdminCreateEventModalProps {
  open: boolean;
  handleClose: () => void;
  setRefetchApi?: React.Dispatch<React.SetStateAction<number>>;
}

const AdminCreateEventModal: React.FC<AdminCreateEventModalProps> = ({
  open,
  handleClose,
  setRefetchApi,
}) => {
  const { handleCreateEventMorph } = useMorphInteractions();
  const { currentAuthSupply } = useAuth();
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    image: null as File | null,
    imageURL: null as string | null,
    uploading: false,
  });
  const { handleCreateEvent, getNextEventId, getEvents } = useFlowInteraction();
  getEvents();
  const [loading, setLoading] = useState(false);

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
    console.log('trg', formData);

    try {
      setLoading(true);
      const id = await getNextEventId();
      const response = await axiosInstance.post('/event/', {
        name: formData.eventName,
        description: formData.description,
        photo: formData.imageURL,
        blockchain_event_id: id,
        blockchain_transaction_hash: id,
      });

      if (response.status === 201) {
        {
          currentAuthSupply === 'magic' && (await handleCreateEvent());
        }
        {
          currentAuthSupply === 'dynamic' && (await handleCreateEventMorph());
        }
        enqueueSnackbar('Event created successfully.', { variant: 'success' });

        handleClose();
        if (setRefetchApi) {
          setRefetchApi((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error creating event:', error);
      enqueueSnackbar('Failed to create event.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop open={loading} onClick={handleClose}>
        <CircularProgress color="primary" />
      </Backdrop>
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
    </>
  );
};

export default AdminCreateEventModal;
