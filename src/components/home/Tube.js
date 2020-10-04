import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TubeThumbnail from '../TubeThumbnail';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: 'none',
        background: 'transparent',
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
    content: {
        paddingTop: theme.spacing(1.5),
        [theme.breakpoints.up("xs")]: {
            paddingLeft: 0
        },
        [theme.breakpoints.down("xs")]: {
            paddingLeft: theme.spacing(1.5)
        }
    },
    header: {
        padding: 0,
        alignItems: 'flex-start'
    },

}));

const Tube = (props) => {
    const tube = props.item;
    const classes = useStyles();
    const authorFirstName = tube.author.email.charAt(0);
    const dateDisplay = new Date(tube.date._seconds * 1000).toDateString();
    return (
        <Link className={classes.link} component={RouterLink} to={`/watch?v=${tube.id}`}>
            <Card className={classes.root} variant="outlined" square={true}>
                <TubeThumbnail className={classes.media} tube={tube}/>
                <CardContent className={classes.content}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {authorFirstName}
                            </Avatar>
                        }
                        title={tube.title}
                        subheader={dateDisplay}
                        className={classes.header}
                    />
                </CardContent>
            </Card>
        </Link>
    )
}

export default Tube
