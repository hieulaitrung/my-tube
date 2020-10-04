import React, {useMemo} from 'react'
import Player from 'video-react/lib/components/Player'
import "video-react/dist/video-react.css"; // import css
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

const TubeWatch = (props) => {
    const classes = useStyles();
    const tube = props.tube;
    const dateDisplay = new Date(tube.date._seconds * 1000).toDateString();

    const thumbnail = useMemo(
        () => {
            try {
                const thumbnails = tube.thumbnails.sort((i,j) => i.width -  j.width);
                return thumbnails[thumbnails.length-1].url;
            } catch (e) {
                return `https://via.placeholder.com/256`
            }
            // Do expensive calculation and return.
        },
        [tube]
    )

    return (
        <React.Fragment>
           <Player
                        playsInline
                        poster={thumbnail}
                        src={tube.downloadURL}
                    />
                    <div className={classes.title}>
                        <Typography variant="h6">{tube.title}</Typography>
                        <Typography color="textSecondary" variant="subtitle1">{dateDisplay}</Typography>
                    </div>
        </React.Fragment>
    )
}

export default TubeWatch
