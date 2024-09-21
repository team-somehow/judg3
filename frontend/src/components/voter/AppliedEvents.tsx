import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import StatusCard from '../dashboard/StatusCard';
import axiosInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Hackathon {
  id: number;
  name: string;
  description: string;
  photo: string;
  status: string;
}

const AppliedEvents: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/get-event/');
        const temp = response.data.filter(
          (hackathon: Hackathon) => hackathon.status !== 'not_applied'
        );
        setHackathons(temp);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (id: number) => {
    navigate(`/voter-dashboard/voting/${id}`); // Navigate to the voting page with the event id
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        hackathons.map((hackathon) => (
          <StatusCard
            key={hackathon.id}
            id={hackathon.id}
            name={hackathon.name}
            description={hackathon.description}
            photo={hackathon.photo}
            buttonText="Start Voting"
            onButtonClick={() => handleButtonClick(hackathon.id)} // Pass the hackathon id to the function
          />
        ))
      )}
    </Box>
  );
};

export default AppliedEvents;
