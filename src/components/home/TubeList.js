import React from 'react'
import Tube from './Tube'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));
  

const TubeList = (props) => {
    const tubes = props.items;
    const classes = useStyles();
    return (
        <Grid container justify="center"  className={classes.root} spacing={2}>
            {Object.values(tubes).map((tube) => 
                <Grid item key={tube.id}>
                    <Tube item={tube} / >
                </Grid>
            )}
        </Grid>
    )
}

export default TubeList
