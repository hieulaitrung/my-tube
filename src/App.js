import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './App.css';
import UserProvider from './providers/UserProvider';
import './wdyr';
import Routes from './routes';

let theme = createMuiTheme();

theme = responsiveFontSizes(theme);

function App() {

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
