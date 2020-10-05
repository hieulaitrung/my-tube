import React from 'react'
import { Grid, Divider, Avatar, Typography, Box, makeStyles } from '@material-ui/core'
import TubeWatchLoader from './TubeWatchLoader'
import TubeWatch from './TubeWatch'
import TubeWatchInfoLoader from './TubeWatchInfoLoader';

const useStyles = makeStyles((theme) => ({
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

const TubeDetails = (props) => {
    const classes = useStyles();
    const isLoaded = props.isLoaded;
    const tube = props.tube;
    return (
        <React.Fragment>
            <Grid item xs={12}>
                {!isLoaded ?
                    <TubeWatchLoader /> :
                    <TubeWatch tube={tube} />
                }
                <Divider />
            </Grid>

            <Grid className={classes.info} item xs={12}>
                {!isLoaded ?
                    <TubeWatchInfoLoader /> :
                    <React.Fragment>
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
                    </React.Fragment>
                }
            </Grid>
        </React.Fragment>
    )
}

export default TubeDetails
