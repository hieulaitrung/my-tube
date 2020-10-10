import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Box, Typography } from '@material-ui/core';
import YouTubeIcon from '../images/youtube.svg';
import SpotifyIcon from '../images/spotify.svg';
import TiktokIcon from '../images/tiktok.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        },
    },
    textfield: {
        flexGrow: 1,
        [theme.breakpoints.up('xs')]: {
            marginRight: theme.spacing(1)
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            marginBottom: theme.spacing(1)
        },

    },
    wrapper: {
        position: 'relative',
        display: 'inline-flex'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    fetchInfo: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2)
    },
    icon: {
        width: 32,
        marginRight: theme.spacing(1),
        opacity: 0.8
    }
}));

const TubeFetchZone = (props) => {
    const classes = useStyles();
    const [link, setLink] = useState('');
    const loading = props.loading;
    const handleUpload = props.handleUpload;

    const handleChange = (event) => {
        setLink(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleUpload(link);
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">

                <TextField className={classes.textfield} required value={link} onChange={handleChange}
                    id="outlined-basic"
                    label="Enter link"
                    fullWidth
                    variant="outlined" />

                <div className={classes.wrapper}>
                    <Button type="submit" variant="contained" fullWidth color="primary" disabled={loading}>
                        Fetch
                            </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>

            </form>
            <Grid item xs={12} className={classes.fetchInfo}>
                <img className={classes.icon} src={SpotifyIcon} alt="spotify" />
                <img className={classes.icon} src={YouTubeIcon} alt="youtube" />
                <img className={classes.icon} src={TiktokIcon} alt="tiktok" />
            </Grid>

        </div>
    )
}

export default TubeFetchZone
