import './wdyr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import Home from './routes/Home';
import Private from './routes/Private';
import Search from './routes/Search';
import Login from './routes/Login';
import Signup from './routes/Signup';
import PasswordReset from './routes/PasswordReset';
import DashboardLayoutRoute from './routes/Layout/DashboardLayoutRoute'
import LoginLayoutRoute from './routes/Layout/LoginLayoutRoute'
import UserProvider from './providers/UserProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
    <UserProvider>
      <div className={classes.root}>
        <CssBaseline />
        
          <Switch>
          
            <LoginLayoutRoute path="/login" component={Login} />
            <LoginLayoutRoute path="/password-reset" component={PasswordReset} />
            <LoginLayoutRoute path="/signup" component={Signup} />
            <LoginLayoutRoute path="/password-reset" component={PasswordReset} />
            <DashboardLayoutRoute path="/search" component={Search} />
            <DashboardLayoutRoute path="/private" component={Private} />
            <DashboardLayoutRoute path="/" component={Home} />
          </Switch>
        
      </div>
    </UserProvider>
    </Router>
  );
}

export default App;
