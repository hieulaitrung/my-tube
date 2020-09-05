import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import React, {useContext} from 'react';
import { UserContext } from '../providers/UserProvider'
import Searchbar from './Searchbar'
import Userbar from './Userbar'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
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
  },
  title: {
    flexGrow: 1,
  }
}));


const AppToolbar = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const open = props.open;
  const handleOpen = props.handleOpen;
  const handleSearch = props.handleSearch;
  const handleSubmitSearch = props.handleSubmitSearch;

  return (
    
    <div className={classes.root}>
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

          <Typography variant="h6" noWrap className={classes.title}>
            <Link className={classes.link} color="inherit" component={RouterLink} to="/">
              MyTube
          </Link>
          </Typography>
          
          <Searchbar handleSearch={handleSearch} handleSubmitSearch={handleSubmitSearch} />
          
          
          <Userbar />
          
          
          
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppToolbar
