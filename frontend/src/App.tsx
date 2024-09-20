import React from 'react';
import { RouterProvider } from 'react-router-dom';
import StyleThemeProvider from './theme/ThemeProvider';
import router from './config/router';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
  return (
    <StyleThemeProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </StyleThemeProvider>
  );
};

export default App;
