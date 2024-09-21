import React, { useEffect, useState } from 'react';
import StatusCard from './StatusCard';
import { Box, CircularProgress } from '@mui/material';
import axiosInstance from '../../config/axios';

interface EventStatus {
  image: string;
  logo: string;
  eventName: string;
  eventHost: string;
  description: string;
  approvalStatus: string;
  buttonText: string;
}

const LiveEvents: React.FC = () => {
  const [events, setEvents] = useState<EventStatus[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/get-event-admin');
        setEvents(response.data as EventStatus[]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleButtonClick = () => {
    console.log('Go to Event clicked');
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
      {events.length === 0 ? (
        <CircularProgress />
      ) : (
        events.map((event, index) => (
          <StatusCard
            key={index}
            image={event.image}
            logo={event.logo}
            eventName={event.eventName}
            eventHost={event.eventHost}
            description={event.description}
            approvalStatus={event.approvalStatus}
            buttonText={event.buttonText}
            onButtonClick={handleButtonClick}
            isAdmin
          />
        ))
      )}
    </Box>
  );
};

export default LiveEvents;
