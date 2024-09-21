import { Box, LinearProgress, Typography } from '@mui/material';
import Bg from './Bg';

type Props = {
  loading: boolean;
};

const loadingText = [
  'Verifying blockchain integrity...',
  'Ensuring vote transparency...',
  'Decentralizing the decision...',
  'Loading trustless voting...',
  'Almost on-chain...',
  'Encrypting your choice...',
];

function Loading({ loading }: Props) {
  if (!loading) return null;
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" mb={2} fontWeight={700} align="center">
        {loadingText[Math.floor(Math.random() * loadingText.length)]}
      </Typography>
      <LinearProgress sx={{ width: '30%', borderRadius: '1rem', mt: 2 }} />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      >
        <Bg />
      </Box>
    </Box>
  );
}

export default Loading;
