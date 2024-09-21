import React, { useEffect, useState } from 'react';
import EventCard from '../shared/EventCard';
import { Box } from '@mui/material';
import axiosInstance from '../../config/axios';

interface Hackathon {
  id: number;
  name: string;
  description: string;
  photo: string;
  status: string;
}

const UpcomingEvents: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/get-event/');
        const temp = response.data.filter(
          (hackathon: Hackathon) => hackathon.status === 'not_applied'
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
      {hackathons.map((hackathon) => (
        <EventCard
          key={hackathon.id}
          id={hackathon.id}
          name={hackathon.name}
          description={hackathon.description}
          photo={hackathon.photo}
        />
      ))}
    </Box>
  );
};

export default UpcomingEvents;
