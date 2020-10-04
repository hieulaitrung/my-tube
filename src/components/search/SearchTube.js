import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TubeThumbnail from '../TubeThumbnail';

const useStyles = makeStyles((theme) => ({
    link: {
        '&:hover': {
            'text-decoration': 'none',
        }
    },
    root: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        border: 'none',
        backgroundColor: 'transparent',
        height: 140
    },
    thumbnail: {
        display: 'flex',

    },
    media: {
        [theme.breakpoints.up('xs')]: {
            width: 250,
        },
        [theme.breakpoints.down('xs')]: {
            width: 200,
        },
    },
    content: {
        paddingTop: 0
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    }

}));

const textDisplay = (text) => {
    const limit = 100;
    if (text && text.length >= limit) {
        text = text.slice(0, limit - 3) + "..."
    }
    return text;
}

const SearchTube = (props) => {
    const classes = useStyles();
    const tube = props.item;
    const bodyDisplay = textDisplay(tube.body);

    return (
        <Link className={classes.link} component={RouterLink} to={`/watch?v=${tube.id}`}>
            <Card className={classes.root} square variant="outlined">
                <div className={classes.thumbnail}>
                    <TubeThumbnail className={classes.media} tube={tube}/>
                </div>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5">
                            {tube.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {bodyDisplay}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Link>
    )
}

export default SearchTube
