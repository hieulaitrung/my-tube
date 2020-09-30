import React from 'react'
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

    const getThumbnail = () => {
        try {
            return tube.thumbnails.filter(t => t.width === 246)[0].url;
        } catch (e) {
            console.error(`Failed to get thumbnail for ${tube.id}`, e);
            return 'https://via.placeholder.com/246'
        }
    }

    return (
        <React.Fragment>
           <Player
                        playsInline
                        poster={getThumbnail()}
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
