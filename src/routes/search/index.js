import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import api from '../../apis'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import SearchTube from '../../components/search/SearchTube'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    searchContainer: {
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
    const [isLoaded, setIsLoaded] = useState(false);

    const num = Object.values(items).length;
    useEffect(() => {
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
        <div className={classes.searchContainer}>
            <Typography color="textSecondary" variant="body1">Found {num} item(s)</Typography>
            <Grid container justify="center" className={classes.root} spacing={2}>
                {Object.values(items).map((tube) =>
                    <Grid item key={tube.id} xs={12} >
                        <SearchTube item={tube} />
                    </Grid>
                )}
            </Grid>



        </div>
    )
}

export default Search
