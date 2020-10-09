import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import UploadTubeDialog from './dialogs/UploadTubeDialog';
import BackupIcon from '@material-ui/icons/Backup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FetchTubeDialog from './dialogs/FetchTubeDialog';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1)
    }
}));

const UploadButton = (props) => {
    const classes = useStyles();
    const user = props.user;
    let history = useHistory();
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
        if (user) {
            handleClose();
            setOpenDialog(true);
        } else {
            history.push("/login");
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpenFetchDialog = () => {
        if (user) {
            handleClose();
            setOpenFetchDialog(true);
        } else {
            history.push("/login");
        }
    };

    const handleCloseFetchDialog = () => {
        setOpenFetchDialog(false);
    };

    return (
        <React.Fragment>
            <IconButton aria-label="upload" onClick={handleMenu}>
                <VideoCallIcon className={classes.video} />
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
                <MenuItem onClick={handleClickOpenFetchDialog} >
                    <FileCopyIcon color="secondary" className={classes.icon} />
                    Fetch from Internet
                    </MenuItem>
                <Divider />
                <MenuItem onClick={handleClickOpenDialog}>
                    <BackupIcon color="primary" className={classes.icon} />
                    Upload from device
                    </MenuItem>
            </Menu>
            <FetchTubeDialog open={openFetchDialog} handleClose={handleCloseFetchDialog} />
            <UploadTubeDialog open={openDialog} handleClose={handleCloseDialog} />
        </React.Fragment>
    )
}

export default UploadButton
