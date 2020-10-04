import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TubeThumbnail from '../TubeThumbnail';

const useStyles = makeStyles((theme) => ({
    link: {
        '&:hover': {
            'text-decoration': 'none',
        },
        width: '100%',
        'margin-bottom': theme.spacing(1),
    },
    root: {
        display: 'flex',
        border: 'none',
        background: 'transparent'
    },
    media: {
        width: 150,
        minWidth: 150,
        height: 130
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}));

const NextTube = (props) => {
    const classes = useStyles();
    const tube = props.item;
    const dateDisplay = new Date(tube.date._seconds* 1000).toDateString();

    return (
        <Link className={classes.link} component={RouterLink} to={`/watch?v=${tube.id}`}>

            <Card className={classes.root} square variant="outlined">
                <TubeThumbnail className={classes.media} tube={tube}/>

                <CardContent className={classes.details}>
                    
                        <Typography gutterBottom variant="subtitle1" component="h2">
                            {tube.title}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            Author
                        </Typography>
                        
                        <Typography variant="body2" color="textSecondary" component="p">60K views - {dateDisplay}</Typography>

                </CardContent>


            </Card>
        </Link>
    )
}

export default NextTube
