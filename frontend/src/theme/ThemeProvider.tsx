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
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              borderRadius: 10,
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
