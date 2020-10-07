import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from '../firebase'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const ProfileButton = (props) => {
    const classes = useStyles();
    const user = props.user;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let history = useHistory();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        handleClose();
        await signOut();
    };

    const handleGoToMyPage = () => {
        history.push('/mypage');
    }

    return (
        <React.Fragment>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <Avatar aria-label="avatar" className={classes.avatar}>
                    {user.email.charAt(0)}
                </Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                getContentAnchorEl={null}
                keepMounted
                open={open}
                onClose={handleClose}>
                <MenuItem >{user.email}</MenuItem>
                <Divider />
                <MenuItem onClick={handleGoToMyPage}>My tubes</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default ProfileButton
