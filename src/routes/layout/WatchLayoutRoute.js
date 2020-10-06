import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Copyright from '../../components/Copyright';
import Header from '../../components/Header';
import InvisibleDrawer from '../../components/InvisibleDrawer';

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
        [theme.breakpoints.up('xs')]: {
            padding: theme.spacing(2),
        },
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
        
    },
}));

const WatchLayout = ({ children, ...rest }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = useCallback(
        () => {
            setOpen(true);
        },[],
    );

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header handleOpen={handleDrawerOpen}
            />
            <InvisibleDrawer open={open} handleClose={handleDrawerClose} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
                <Box p={4}>
                    <Copyright />
                </Box>
            </main>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </div>
    )
}

const WatchLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <WatchLayout>
                <Component {...matchProps} />
            </WatchLayout>
        )} />
    )
};

export default WatchLayoutRoute
