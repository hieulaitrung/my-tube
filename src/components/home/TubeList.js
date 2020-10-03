import React from 'react'
import Tube from './Tube'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));
  

const TubeList = (props) => {
    const tubes = props.items;
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const xs = matches ? 12 : 3;
    
    return (
        <Grid container className={classes.root} spacing={2}>
            {Object.values(tubes).map((tube) => 
                <Grid item key={tube.id} xs={xs}>
                    <Tube item={tube} / >
                </Grid>
            )}
        </Grid>
    )
}

export default TubeList
