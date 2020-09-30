import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import api from '../../apis'
import { getDownloadURL } from '../../firebase'
import NextTubeList from '../../components/watch/NextTubeList'
import TubeWatch from '../../components/watch/TubeWatch';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    info: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    details: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1)
    }
}));

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Watch = () => {
    const classes = useStyles();
    const video = useQuery().get("v");
    const [tube, setTube] = useState(null);
    const [nextTubes, setNextTubes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const result = await api.getTube(video);
            setIsLoaded(true);
            const tube = result;
            tube.downloadURL = await getDownloadURL(`${tube.authorId}/videos/${tube.fileId}`);
            setTube(tube);
        }
        fetchData();

    }, [video])

    useEffect(() => {
        const res = api.getNextTubes(video);
        res.then(
            (result) => {
                setIsLoaded(true);
                const tubes = result.articles;
                setNextTubes(tubes);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (e) => {
                setIsLoaded(true);
                setError(e);
            }
        )

    }, [video])


    return (
        tube ?
            <Grid container spacing={3}>
                <Grid container item xs={8}>
                    <Grid item xs={12}>
                        <TubeWatch tube={tube} />
                        <Divider />
                    </Grid>
                    <Grid className={classes.info} item xs={12}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                    </Avatar>
                        <div className={classes.details}>
                            <Typography variant="subtitle2">{tube.fileAuthor}</Typography>
                            <Typography variant="body2">60K subscribers</Typography>
                            <Typography component="div" variant="body2">
                                <Box component="span" display="block" paddingY={2}>
                                    {tube.body}
                                </Box>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>

                <Grid container direction="column" item xs={4}>
                    <Grid item>
                        <Typography variant="subtitle2">
                            Up next
                </Typography>
                    </Grid>
                    <Grid container item>
                        <NextTubeList items={nextTubes} />
                    </Grid>
                </Grid>
            </Grid>
            // TODO: Should use placeholder?
            : null

    )
}

export default Watch
