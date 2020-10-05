import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import api from '../../apis'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import SearchTube from '../../components/search/SearchTube'
import { Grid, Box } from '@material-ui/core';
import SearchTubeLoader from '../../components/placeholder/SearchTubeLoader';
import TextLoader from '../../components/placeholder/TextLoader';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2)
        },
    }
}));

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Search = (props) => {
    const classes = useStyles();
    const query = useQuery().get("query");

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    const num = Object.values(items).length;
    useEffect(() => {
        setIsLoaded(false)
        const res = api.getTubes(query);
        res.then(
            (result) => {
                setIsLoaded(true);
                const articles = result.articles;
                if (articles.length) {
                    articles.map(a => a.author = api.lookupAuthor(result.authors, a.authorId));
                }
                setItems(articles);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (e) => {
                setIsLoaded(true);
                setError(e);
            }
        )
    }, [query])

    return (
        <div className={classes.container}>
            <Box mb={1}>
                {!isLoaded ?
                    <TextLoader /> :
                    <Typography color="textSecondary" variant="body1">Found {num} item(s)</Typography>
                }
            </Box>
            <Grid container justify="center" className={classes.root} spacing={2}>
                {!isLoaded ?
                    Array.from(Array(5).keys()).map(i =>
                        (
                            <Grid item xs={12} key={i}>
                                <SearchTubeLoader key={i} />
                            </Grid>
                        ))
                    :
                    Object.values(items).map((tube) =>
                        <Grid item key={tube.id} xs={12} >
                            <SearchTube item={tube} />
                        </Grid>
                    )}
            </Grid>



        </div>
    )
}

export default Search
