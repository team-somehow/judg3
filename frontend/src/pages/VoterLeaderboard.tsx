import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  Container,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import Bg from '../components/ui/Bg';
import GradientCard from '../components/ui/GradientCard';
import { useParams } from 'react-router-dom';
import axiosInstance from '../config/axios';
import { Link } from '@mui/icons-material';

interface LeaderboardRow {
  project: {
    id: number;
    name: string;
    description: string;
    photo: string;
    url: string;
    created_at: string;
  };
  score: string;
}

type Props = {
  title?: string;
};

const Leaderboard: React.FC<Props> = ({ title = 'Live Leaderboard' }) => {
  const { id } = useParams<{ id: string }>();

  const [leaderboardData, setLeaderboardData] = React.useState<
    LeaderboardRow[]
  >([]);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axiosInstance.post(`/leaderboard`, {
          event: id,
        });
        console.log('Response:', response.data);
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    postData();
  }, [id]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" fontWeight="900" gutterBottom>
        {title}
      </Typography>

      {/* Top 3 Teams Section */}
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 4,
        }}
      >
        {leaderboardData.slice(0, 3).map((entry, rank) => (
          <GradientCard
            key={rank}
            style={{
              width: '100%',
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 10px',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: '900',
                scale: 1.5,
                mt: 2,
              }}
            >
              {rank + 1}
            </Avatar>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
                width: '100%',
                gap: 2,
                p: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: '900',
                }}
                src={entry.project.photo}
              />
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Typography variant="subtitle2">
                  {entry.project.name}
                </Typography>
                <Button
                  color="primary"
                  onClick={() => {
                    window.open(entry.project.url, '_blank');
                  }}
                  startIcon={<Link />}
                >
                  Project
                </Button>
              </Box>
            </Card>
          </GradientCard>
        ))}
      </Container>

      <GradientCard
        style={{
          width: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          padding: '16px',
        }}
      >
        <Grid container spacing={2}>
          {leaderboardData.map((entry, rank) => (
            <Grid item xs={12} key={rank}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: '900',
                      marginRight: 2,
                    }}
                  >
                    {rank + 1}
                  </Avatar>
                  <Divider orientation="vertical" flexItem />
                  <Avatar
                    alt={entry.project.name[0]}
                    src={entry.project.photo}
                    sx={{ mx: 2 }}
                  />
                  <Box>
                    <Typography variant="body1">
                      {entry.project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {entry.project.description.trim().slice(0, 100)}...
                    </Typography>
                  </Box>
                </Box>
                <Button
                  color="primary"
                  startIcon={<Link />}
                  onClick={() => {
                    window.open(entry.project.url, '_blank');
                  }}
                >
                  Project Link
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </GradientCard>

      <Bg />
    </Box>
  );
};

export default Leaderboard;
