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
        <Grid container className={classes.root} spacing={2}>
            {Object.values(tubes).map((tube) => 
                <Tube item={tube}  key={tube.id} / >
            )}
        </Grid>
    )
}

export default TubeList
