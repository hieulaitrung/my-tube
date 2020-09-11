import React from 'react'
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import "video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
    }
}));

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Watch = () => {
    const classes = useStyles();
    const video = useQuery().get("v");
    return (

        <Grid container spacing={3}>
            <Grid item xs={9}>
                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
            </Grid>
            <Paper variant="outlined" square >
                    Related videos
                </Paper>
            <Grid item xs={3}>
            <Typography color="textSecondary" variant="body1">Title</Typography>
                
            </Grid>
        </Grid>

    )
}

export default Watch
