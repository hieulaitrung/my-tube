import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import React, { useContext, useState, useCallback} from 'react';
import { UserContext } from '../providers/UserProvider'
import Searchbar from './Searchbar'
import Userbar from './Userbar'
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    border: 'none',
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    [theme.breakpoints.up('xs')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
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


const Header = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const handleOpen = props.handleOpen;
  const [expandSearch, setExpandSearch] = useState(false);
  let history = useHistory();

  const handleSubmitSearch = useCallback((term) => {
    history.push({
      pathname: "/search",
      search: `?query=${term}`,
    });
  }, [history]);

  const handleExpandSearch = useCallback(
    (value) => {
      setExpandSearch(value);
    },[]);

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      variant="outlined"
    >
      <Toolbar>
        {!expandSearch &&
        <React.Fragment>
          <IconButton
            
            aria-label="open drawer"
            onClick={handleOpen}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap className={classes.title}>
            <Link className={classes.link} color="textSecondary" component={RouterLink} to="/">
                MyTube
              
            </Link>
          </Typography>
        </React.Fragment>
      }

        <Searchbar expandSearch={expandSearch} handleExpandSearch={handleExpandSearch} handleSubmitSearch={handleSubmitSearch} />
        <Userbar expandSearch={expandSearch}  user={user} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
