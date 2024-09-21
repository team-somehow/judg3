import React, { useState } from 'react';
import { Box, Typography, Button, Divider, TextField } from '@mui/material';
import { Link, Share } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from '../../config/axios';
import { useFlowInteraction } from '../../hooks/useFlowInteraction';
import useMorphInteractions from '../../hooks/morph/useMorphInteractions';
import { useAuth } from '../../context/AuthContext';

type Props = {
  eventId: string;
};

// interface Voter {
//   voter_id: number;
//   status: string;
// }

const Upload: React.FC<Props> = ({ eventId }) => {
  // const [voters, setVoters] = useState<Voter[]>();
  const [jsonField, setJsonField] = useState(''); // State to track TextField value
  const { createProject } = useFlowInteraction();
  const { currentAuthSupply } = useAuth();
  const { handleAddProject } = useMorphInteractions();
  // useEffect(() => {
  //   const getVoters = async () => {
  //     try {
  //       const response = await axiosInstance.get(`voters/${eventId}`);
  //       console.log("Voters:", response.data);
  //       setVoters(response.data);
  //     } catch (error) {
  //       console.error("Error fetching voters:", error);
  //     }
  //   };
  //   getVoters();
  // }, [eventId]);

  // Handle input change for the JSON field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJsonField(event.target.value); // Update state when input changes
  };

  // Handle submit button click
  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonField); // Parse the JSON field
      if (!Array.isArray(parsedJson)) {
        enqueueSnackbar('Invalid JSON format', {
          variant: 'error',
        });
        return;
      }

      for (const project of parsedJson) {
        try {
          const response = await axiosInstance.post('/project', project); // Post each project

          console.log('system', eventId, response.data['project_id']);
          {
            currentAuthSupply === 'magic' &&
              (await createProject({
                eventId: eventId,
                projectId: response.data['project_id'].toString(),
              }));
          }
          {
            currentAuthSupply === 'morph' &&
              (await handleAddProject({
                eventId: eventId,
                projectId: response.data['project_id'].toString(),
              }));
          }

          console.log('Project uploaded:', response.data);
        } catch (error) {
          console.error(`Error uploading project ${project.name}:`, error);
          enqueueSnackbar(`Error uploading project ${project.name}`, {
            variant: 'error',
          });
        }
      }
      enqueueSnackbar(`Projects uploaded successfully`, {
        variant: 'success',
      });
    } catch (error) {
      console.error('Error parsing JSON or uploading project:', error);
      enqueueSnackbar('Error parsing JSON or uploading project', {
        variant: 'error',
      });
    }
  };

  // if (!voters) {
  //   return <Loading loading={true} />;
  // }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight="500">
          Upload Project Details
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="body1" color="textSecondary">
        Upload project details here to start the voting process. Streamline your
        project submission process with two flexible options
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        fontWeight="bold"
        mt={3}
        sx={{
          color: 'text.primary',
        }}
      >
        1. Implement Webhook Url
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Copy and implement the webhook URL in your project's backend to automate
        the project addition process
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.10)',
          p: 1,
          borderRadius: '5px',
          width: '400px',
          mt: 2,
        }}
      >
        <Link sx={{ mx: 1 }} />
        <Typography variant="body1" sx={{ mr: 2 }}>
          https://judg3.web.app
        </Typography>
        <Button
          variant="contained"
          startIcon={<Share />}
          onClick={() => {
            navigator.clipboard.writeText('https://judg3.web.app');
            enqueueSnackbar('Link copied to clipboard', {
              variant: 'success',
            });
          }}
          sx={{
            width: '100%',
          }}
        >
          Copy Link
        </Button>
      </Box>
      <Typography
        variant="body1"
        color="textSecondary"
        fontWeight="bold"
        mt={3}
        sx={{
          color: 'text.primary',
        }}
      >
        2. Upload Projects Json
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Upload a JSON file containing the project details to add the project
        manually to the platform
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 2,
        }}
      >
        <TextField
          variant="filled"
          label="JSON Field"
          name="jsonField"
          fullWidth
          multiline
          rows={10}
          value={jsonField}
          onChange={handleInputChange}
          sx={{ mb: 1 }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Submit Projects
      </Button>
    </Box>
  );
};

export default Upload;
