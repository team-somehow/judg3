import React, { useEffect, useState } from 'react';
import StatusCard from './StatusCard';
import { Box, Skeleton, Typography } from '@mui/material';
import axiosInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom';

export interface EventStatus {
  id: number;
  name: string;
  description: string;
  photo: string;
  status: string;
}

const PastEvents: React.FC = () => {
  const [events, setEvents] = useState<EventStatus[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/get-event-admin');
        const temp = response.data.filter(
          (event: EventStatus) => event.status === 'complete'
        );
        setEvents(temp);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleButtonClick = (id: number) => {
    console.log('Go to Event clicked');
    navigate(`/dashboard/event/${id}`);
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
        <>
          <Skeleton variant="rounded" width="100%" height={250} />
          <Skeleton variant="rounded" width="100%" height={250} />
        </>
      ) : events.length === 0 ? (
        <Typography variant="h6" mt={10}>
          No past events
        </Typography>
      ) : (
        events.map((event, index) => (
          <StatusCard
            key={index}
            id={event.id}
            name={event.name}
            description={event.description}
            photo={event.photo}
            buttonText="Go to Event"
            onButtonClick={() => handleButtonClick(event.id)}
            isAdmin
          />
        ))
      )}
    </Box>
  );
};

export default PastEvents;
