import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import IconLoader from './IconLoader'

const useStyles = makeStyles((theme) => ({
    link: {
        padding: theme.spacing(1.25),
        '&:hover': {
            background: 'none',
        }
    }
}));

const IconLoaderButton = () => {
    const classes = useStyles();
    return (
        <IconButton aria-label="loading" className={classes.link} >
            <IconLoader />
        </IconButton>
    )
}

export default IconLoaderButton
