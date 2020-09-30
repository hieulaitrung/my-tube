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
            const width = 336;
            try {
                return tube.thumbnails.filter(t => t.width === width)[0].url;
            } catch (e) {
                return `https://via.placeholder.com/${width}`
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
                        <Typography color="textSecondary" variant="subtitle1">940.172 views -  {dateDisplay}</Typography>
                    </div>
        </React.Fragment>
    )
}

export default TubeWatch
