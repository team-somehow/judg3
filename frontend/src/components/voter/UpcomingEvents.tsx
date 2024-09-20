import React, { useEffect, useState } from 'react';
import EventCard from '../shared/EventCard';
import { Box } from '@mui/material';

interface Hackathon {
  id: number;
  avatar: string;
  name: string;
  description: string;
  imgUrl: string;
}
const UpcomingEvents: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Mock data simulating the JSON file
      const data = [
        {
          id: 1,
          avatar: '/ethglobal.png',
          name: 'ETH Singapore',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          imgUrl: '/ethsingapore.png',
        },
        {
          id: 2,
          avatar: '/ethglobal.png',
          name: 'ETH Global',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          imgUrl: '/ethsingapore.png',
        },
        {
          id: 3,
          avatar: '/ethglobal.png',
          name: 'ETH India',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          imgUrl: '/ethsingapore.png',
        },
        {
          id: 4,
          avatar: '/ethglobal.png',
          name: 'ETH India',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          imgUrl: '/ethsingapore.png',
        },
      ];
      setHackathons(data);
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
          avatar={hackathon.avatar}
          title={hackathon.name}
          subheader="EthGlobal"
          image={hackathon.imgUrl}
          description={hackathon.description}
        />
      ))}
    </Box>
  );
};

export default UpcomingEvents;
