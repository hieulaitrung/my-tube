import React from 'react'
import Tube from './Tube'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core';
import TubeLoader from '../placeholder/TubeLoader';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));


const TubeList = (props) => {
    const tubes = props.items;
    const isLoaded = props.isLoaded;
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
    const xs = matches ? 12 : 3;

    return (
        <Grid container className={classes.root} spacing={2}>
            {!isLoaded ? (
                Array.from(Array(12).keys()).map(i =>
                    (
                        <Grid item xs={xs} key={i}>
                            <TubeLoader key={i} />
                        </Grid>
                    ))
            ) : (
                    Object.values(tubes).map((tube) =>
                        <Grid item key={tube.id} xs={xs}>
                            <Tube item={tube} key={tube.id} />
                        </Grid>)
                )
            }
        </Grid>
    )
}

export default TubeList
