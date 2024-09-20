import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';

const StyleThemeProvider = (props: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FC72FF',
        dark: '#bc58bf',
      },
      secondary: {
        main: '#1E50FF',
      },
      background: {
        default: '#0B031E',
        paper: 'rgba(255,255,255,0.1)',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.60)',
      },
      divider: 'rgba(255,255,255,0.2)',
    },
    shape: {
      borderRadius: 15,
    },
    typography: {
      fontFamily: 'Poppins',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#121212',
            color: '#fff',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            fontWeight: '600',
            '&.MuiButton-outlined': {
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                transition: '0.3s all ease-in-out',
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.3)', // Default border
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid #FC72FF', // Full border on focus
              },
              '&:before': {
                display: 'none', // Remove the default bottom border line
              },
              '&:after': {
                display: 'none', // Prevent the after pseudo-element from adding another border
              },
            },
            '& .MuiFilledInput-input': {
              color: '#fff',
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.60)',
              '&.Mui-focused': {
                color: '#FC72FF',
              },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default StyleThemeProvider;
