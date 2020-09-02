import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Copyright from './components/Copyright';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Routes from './Routes';

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
        <Header open={open} handleOpen={handleDrawerOpen} />
        <Navbar open={open} handleClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes />
          <Copyright />
        </main>
      </Router>
    </div>
  );
}

export default App;
