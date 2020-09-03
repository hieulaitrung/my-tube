import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import React from 'react';
import Searchbar from './Searchbar'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  link: {
    '&:hover': {
      'text-decoration': 'none'
   }
  }
}));


const AppToolbar = (props) => {
  const open = props.open;
  const handleOpen = props.handleOpen;
  const handleSearch = props.handleSearch;
  const handleSubmitSearch = props.handleSubmitSearch;
  const searchTerm = props.searchTerm;
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap>
          <Link className={classes.link} color="inherit" component={RouterLink} to="/">
            MyTube
          </Link>
        </Typography>

        <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} handleSubmitSearch={handleSubmitSearch} />
      </Toolbar>
    </AppBar>
  )
}

export default AppToolbar
