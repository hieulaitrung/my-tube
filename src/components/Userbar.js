import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { signOut } from '../firebase'
import UploadTubeDialog from './UploadTubeDialog'
import ProfileButton from './ProfileButton'
import UploadButton from './UploadButton'

const useStyles = makeStyles((theme) => ({
}));

const Userbar = (props) => {
    const classes = useStyles();
    const user = props.user;
    

    return (
        user ?
            <div>
                <UploadButton />
                <ProfileButton user={user} />
            </div> :
            <Button component={RouterLink} to="/login" color="inherit">Login</Button>
    )
}

export default Userbar
