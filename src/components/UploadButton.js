import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import React, { useState } from 'react';
import UploadTubeDialog from './dialogs/UploadTubeDialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FetchTubeDialog from './dialogs/FetchTubeDialog';

const useStyles = makeStyles((theme) => ({
}));

const UploadButton = () => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [openFetchDialog, setOpenFetchDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpenDialog = () => {
        handleClose();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpenFetchDialog = () => {
        handleClose();
        setOpenFetchDialog(true);
    };

    const handleCloseFetchDialog = () => {
        setOpenFetchDialog(false);
    };

    return (
        <React.Fragment>
            <IconButton aria-label="upload" onClick={handleMenu}>
                <VideoCallIcon className={classes.video}/>
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
                <MenuItem onClick={handleClickOpenFetchDialog} >Fetch from YouTube</MenuItem>
                <Divider />
                <MenuItem onClick={handleClickOpenDialog}>Upload from device</MenuItem>
            </Menu>
            <FetchTubeDialog open={openFetchDialog} handleClose={handleCloseFetchDialog} />
            <UploadTubeDialog open={openDialog} handleClose={handleCloseDialog} />
        </React.Fragment>
    )
}

export default UploadButton
