import React, { useEffect, useState } from 'react';
import EventCard from '../shared/EventCard';
import { Box, Skeleton, Typography } from '@mui/material';
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/get-event/');
        const temp = response.data.filter(
          (hackathon: Hackathon) => hackathon.status === 'not_applied'
        ).reverse();
        setHackathons(temp);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
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
        height: '100%',
        minHeight: '60vh',
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="rounded" width="32%" height={250} />
          <Skeleton variant="rounded" width="32%" height={250} />
          <Skeleton variant="rounded" width="32%" height={250} />
        </>
      ) : hackathons.length === 0 ? (
        <Typography variant="h6" mt={10}>
          No upcoming events
        </Typography>
      ) : (
        hackathons.map((hackathon) => (
          <EventCard
            key={hackathon.id}
            id={hackathon.id}
            name={hackathon.name}
            description={hackathon.description}
            photo={hackathon.photo}
            blockchain_event_id={hackathon.blockchain_event_id}
          />
        ))
      )}
    </Box>
  );
};

export default UpcomingEvents;
