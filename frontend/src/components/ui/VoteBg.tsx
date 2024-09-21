import { Box } from '@mui/material';

function VoteBg() {
  return (
    <Box>
      <Box className="noise-bg"></Box>
      <Box
        className="blue-glow"
        sx={{
          right: '0',
          bottom: '0',
        }}
      ></Box>
      <Box
        className="pink-glow"
        sx={{
          left: '0',
          bottom: '0',
        }}
      ></Box>
    </Box>
  );
}

export default VoteBg;
