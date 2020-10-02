import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import React from 'react';
import { mainListItems } from './NavItems';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListItemLink from './ListItemLink';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  list: {
    width: drawerWidth,
  }
}));

const Navbar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const open = props.open;
  const handleClose = props.handleClose;

  return (
    <Drawer
      className={classes.drawer}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.list}>
          <List>
            <ListItemLink to="/" primary="MyTube" icon={<MenuIcon />} />
          </List>
        
        <Divider />
        <List>{mainListItems}</List>
      </div>
    </Drawer>
  )
}

export default Navbar
