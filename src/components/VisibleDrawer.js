import React from 'react'
import { Drawer, makeStyles, IconButton, Divider, List } from '@material-ui/core'
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './NavItems';


const useStyles = makeStyles((theme) => ({
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
          },
    },
    drawerClose: {
        border: 'none',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
}));
const VisibleNavbar = () => {
    const classes = useStyles();
    const open = false;
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}

        >
            <div className={classes.toolbar}>
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            
            <List>{mainListItems}</List>
        </Drawer>
    )
}

export default VisibleNavbar
