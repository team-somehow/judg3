import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import Bg from '../components/ui/Bg';
import GradientCard from '../components/ui/GradientCard';

interface LeaderboardRow {
  rank: number;
  teamName: string;
  teamLogo: string;
  score: number;
  team: string;
}

const Leaderboard: React.FC = () => {
  const leaderboardData: LeaderboardRow[] = [
    {
      rank: 1,
      teamName: '3-Transform',
      teamLogo: '/static/images/avatar/1.jpg', // sample logo path
      score: 1500,
      team: 'Team Somehow',
    },
    {
      rank: 2,
      teamName: 'Somewhere Else',
      teamLogo: '/static/images/avatar/2.jpg', // sample logo path
      score: 1300,
      team: 'Team Elsewhere',
    },
    {
      rank: 3,
      teamName: 'Another Team',
      teamLogo: '/static/images/avatar/3.jpg', // sample logo path
      score: 1200,
      team: 'Team Anywhere',
    },
    {
      rank: 4,
      teamName: 'Team Awesome',
      teamLogo: '/static/images/avatar/4.jpg', // sample logo path
      score: 1100,
      team: 'Team Everywhere',
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" fontWeight="900" gutterBottom>
        Leaderboard
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
        {leaderboardData.slice(0, 3).map((entry) => (
          <GradientCard
            key={entry.rank}
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
              {entry.rank}
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
              <Avatar alt={entry.teamName} src={entry.teamLogo} />
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Typography variant="body1" marginTop={1}>
                  {entry.teamName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {entry.team}
                </Typography>
              </Box>
            </Card>
          </GradientCard>
        ))}
      </Container>

      {/* Rest of the leaderboard */}
      <GradientCard
        style={{
          width: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          padding: '16px',
        }}
      >
        <Grid container spacing={2}>
          {leaderboardData.map((entry) => (
            <Grid item xs={12} key={entry.rank}>
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
                    {entry.rank}
                  </Avatar>
                  <Divider orientation="vertical" flexItem />
                  <Avatar
                    alt={entry.teamName}
                    src={entry.teamLogo}
                    sx={{ mx: 2 }}
                  />
                  <Box>
                    <Typography variant="body1">{entry.teamName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {entry.team}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6">{entry.score}</Typography>
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
