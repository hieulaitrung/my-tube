import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { signOut } from '../firebase'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
        height: 330
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Userbar = (props) => {
    const classes = useStyles();
    const user = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        handleClose();
        signOut();
    };

    return (
        user ?
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.email.charAt(0)}
                    </Avatar>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}>
                    <MenuItem >{user.email}</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </Menu>
            </div> :
            <Button component={RouterLink} to="/login" color="inherit">Login</Button>
    )
}

export default Userbar
