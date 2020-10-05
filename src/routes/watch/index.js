import { useMediaQuery, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import api from '../../apis';
import NextTubesGrid from '../../components/watch/NextTubesGrid';
import TubeDetails from '../../components/watch/TubeDetails';
import { getDownloadURL } from '../../firebase';


const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2)
        },
    }
}));

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Watch = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
    const classes = useStyles();
    const video = useQuery().get("v");
    const [tube, setTube] = useState(null);
    const [nextTubes, setNextTubes] = useState([]);
    const watchxs = matches ? 12 : 8;
    const nextxs = matches ? 12 : 4;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isNextLoaded, setIsNextLoaded] = useState(false);


    useEffect(() => {
        async function fetchData() {
            setIsLoaded(false);
            const result = await api.getTube(video);
            const tube = result;
            tube.downloadURL = await getDownloadURL(`${tube.authorId}/videos/${tube.fileId}`);
            setTube(tube);
            setIsLoaded(true);
        }
        fetchData();

    }, [video])

    useEffect(() => {
        setIsNextLoaded(false);
        const res = api.getNextTubes(video);
        res.then(
            (result) => {
                setIsNextLoaded(true);
                const tubes = result.articles;
                setNextTubes(tubes);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (e) => {
                setIsNextLoaded(true);
                setError(e);
            }
        )

    }, [video])


    return (
        <div className={classes.container}>
            <Grid container spacing={3}>
                <Grid container item xs={watchxs}>
                    <TubeDetails isLoaded={isLoaded} tube={tube} />
                </Grid>

                <Grid container direction="column" item xs={nextxs}>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Up next
                </Typography>
                    </Grid>
                    <NextTubesGrid isNextLoaded={isNextLoaded} items={nextTubes} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Watch
