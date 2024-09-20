import { SnackbarProvider } from 'notistack';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import MagicProvider from './components/auth/magic/MagicContext';
import router from './config/router';
import StyleThemeProvider from './theme/ThemeProvider';

const App: React.FC = () => {
  return (
    <StyleThemeProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
        <MagicProvider>
          <RouterProvider router={router} />
        </MagicProvider>
      </SnackbarProvider>
    </StyleThemeProvider>
  );
};

export default App;
