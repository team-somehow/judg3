import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import StatusCard from '../dashboard/StatusCard';

interface EventStatus {
  image: string;
  logo: string;
  eventName: string;
  eventHost: string;
  description: string;
  approvalStatus: string;
  buttonText: string;
}

const AppliedEvents: React.FC = () => {
  const [events, setEvents] = useState<EventStatus[]>([]);

  useEffect(() => {
    // Simulating an API call
    const fetchEvents = async () => {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              image: '/ethsingapore.png',
              logo: '/ethglobal.png',
              eventName: 'ETH Singapore',
              eventHost: 'ETHGlobal',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              approvalStatus: 'Voting Open',
              buttonText: 'Start Voting',
            },
            {
              image: '/ethsingapore.png',
              logo: '/ethglobal.png',
              eventName: 'ETH India',
              eventHost: 'ETHGlobal',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              approvalStatus: 'Approval Pending',
              buttonText: 'Start Voting',
            },
          ]);
        }, 1000)
      );

      setEvents(response as EventStatus[]);
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
          />
        ))
      )}
    </Box>
  );
};

export default AppliedEvents;
