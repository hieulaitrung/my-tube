import Button from '@material-ui/core/Button';
import React, { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import UploadButton from './UploadButton';


const Userbar = (props) => {

    const user = props.user;
    const expandSearch = props.expandSearch
    return (
        !expandSearch ?
            user ?
                <div>
                    <UploadButton />
                    <ProfileButton user={user} />
                </div> :
                <Button component={RouterLink} to="/login" color="textSecondary">Login</Button>
            : <div></div>
    )
}

export default Userbar
