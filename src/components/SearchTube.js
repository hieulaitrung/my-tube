import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    link: {
        '&:hover': {
            'text-decoration': 'none',
          }
    },
    root: {
        display: 'flex',
        'margin-bottom': theme.spacing(1)
    },
    media: {
        width: 200,
        display: 'flex'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },

    controls: {
        display: 'flex',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }

}));

const textDisplay = (text) => {
    const limit = 100;
    if (text.length >= limit) {
        text = text.slice(0, limit - 3) + "..."
    }
    return text;
}

const SearchTube = (props) => {
    const classes = useStyles();
    const tube = props.item;
    const bodyDisplay = textDisplay(tube.body);

    const getThumbnail = () => {
        try {
            return tube.thumbnails.filter(t => t.width === 246)[0].url;
        } catch (e) {
            console.error(`Failed to get thumbnail for ${tube.id}`, e);
            return 'https://via.placeholder.com/246'
        }
    }

    return (
        <Link className={classes.link} component={RouterLink} to={`/watch?v=${tube.id}`}>
        <Card className={classes.root} square>
            <CardMedia
                className={classes.media}
                image={getThumbnail()}
                title={tube.title}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {tube.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {bodyDisplay}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton onClick={(e) => { e.preventDefault(); alert('favorites')}} aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { e.preventDefault(); alert('share')}} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </div>
            </div>
        </Card>
        </Link>
    )
}

export default SearchTube
