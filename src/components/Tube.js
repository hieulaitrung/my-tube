import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
        height: 330
    },
    link: {
        '&:hover': {
            'text-decoration': 'none',
          }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

}));

const Tube = (props) => {
    const tube = props.item;
    const classes = useStyles();
    const authorFirstName = tube.author.email.charAt(0);
    const dateDisplay = new Date(tube.date).toDateString();
    return (
            <Grid item>
                <Link className={classes.link} component={RouterLink} to={`/watch?v=${tube.id}`}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {authorFirstName}
                            </Avatar>
                        }
                        title={tube.title}
                        subheader={dateDisplay}
                    />
                    <CardMedia
                        className={classes.media}
                        image="https://via.placeholder.com/150"
                        title={tube.title}
                    />
                    <div></div>
                    <CardActions disableSpacing>
                        <IconButton onClick={(e) => { e.preventDefault(); alert('favorites')}} aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton  onClick={(e) => { e.preventDefault(); alert('share')}} aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>

                </Card>
                </Link>
            </Grid>
        
    )
}

export default Tube
