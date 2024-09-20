import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
} from '@mui/material';
import Bg from '../components/ui/Bg';
import EventCard from '../components/shared/EventCard';
import GradientCard from '../components/ui/GradientCard';

interface Hackathon {
  id: number;
  avatar: string;
  name: string;
  description: string;
  imgUrl: string;
}

const Home: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate fetching data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      ];
      setHackathons(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ textAlign: 'center', padding: '1rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: '900', my: 1 }}>
          Revolutionizing Voting with 3-Cast
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Host your hackathon on our platform for decentralized, unbiased voting
          <br />
          that ensures every project gets a fair chance to shine.
        </Typography>
      </Container>
      <Button
        variant="contained"
        sx={{
          px: 3,
          py: 1.5,
        }}
        startIcon={
          <img
            src="/logo-black.svg"
            style={{ height: '20px', color: 'black' }}
          />
        }
      >
        Organise Voting
      </Button>
      <GradientCard
        style={{
          mt: 3,
          mx: 5,
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: '#fff' }}
          textAlign="start"
          fontWeight="bold"
        >
          Upcoming Hackathons
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {hackathons.map((hackathon) => (
            <EventCard
              key={hackathon.id}
              avatar={hackathon.avatar}
              title={hackathon.name}
              subheader="Upcoming"
              image={hackathon.imgUrl}
              description={hackathon.description}
            />
          ))}
        </Box>
      </GradientCard>
      <Bg />
    </Box>
  );
};

export default Home;
