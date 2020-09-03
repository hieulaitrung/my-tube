import './wdyr';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import Home from './Routes/Home';
import Private from './Routes/Private';
import Search from './Routes/Search';
import Login from './Routes/Login';
import DashboardLayoutRoute from './Routes/Layout/DashboardLayoutRoute'
import LoginLayoutRoute from './Routes/Layout/LoginLayoutRoute'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>  
        <Switch>
          <LoginLayoutRoute path="/login" component={Login} />  
          <DashboardLayoutRoute path="/search" component={Search} />  
          <DashboardLayoutRoute path="/private" component={Private} />  
          <DashboardLayoutRoute path="/" component={Home} />  
        </Switch>  
      </Router>  
    </div>
  );
}

export default App;
