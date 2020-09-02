import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 240,
      }
}));

const Tube = (props) => {
    const tube = props.item;
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid item xs={3}>
            <Paper className={fixedHeightPaper}>
                {tube.id}
            </Paper>
        </Grid>
    )
}

export default Tube
