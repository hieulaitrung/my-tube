import Button from '@material-ui/core/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import UploadButton from './UploadButton';


const Userbar = (props) => {

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
