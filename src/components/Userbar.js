import Button from '@material-ui/core/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconLoaderButton from './IconLoaderButton';
import ProfileButton from './ProfileButton';
import UploadButton from './UploadButton';


const Userbar = (props) => {
    const user = props.user;
    const userLoading = props.userLoading;
    const expandSearch = props.expandSearch
    return (
        !expandSearch ? (
            <div>
                {userLoading ? <IconLoaderButton /> : <UploadButton user={user} />}
                {userLoading ?
                    <IconLoaderButton /> :
                    (user ? <ProfileButton user={user} /> : <Button component={RouterLink} to="/login">Login</Button>)
                }

            </div>) :
            <div></div>
    )
}

export default Userbar
