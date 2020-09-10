import './wdyr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import Home from './routes/home';
import Private from './routes/private';
import Search from './routes/search';
import Login from './routes/login';
import Signup from './routes/signup';
import PasswordReset from './routes/password-reset';
import DashboardLayoutRoute from './routes/layout/DashboardLayoutRoute'
import LoginLayoutRoute from './routes/layout/LoginLayoutRoute'
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
