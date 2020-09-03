import React, {useState, useEffect} from 'react';
import {
    useLocation
  } from "react-router-dom";
import {MyTubeAPI} from '../../APIs'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import SearchTube from '../../components/SearchTube'

const useStyles = makeStyles((theme) => ({
    gridList: {
        width: 900,
    }
}));

const useQuery =() => {
    return new URLSearchParams(useLocation().search);
  }

const Search = (props) => {
    const classes = useStyles();
    const query = useQuery().get("query");

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const api = MyTubeAPI();
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
        <React.Fragment>
            <Typography color="textSecondary" variant="body1">Found {num} item(s)</Typography>
            <GridList cellHeight={180} className={classes.gridList} cols={1}>
                <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
                    {Object.values(items).map((tube) => 
                        <SearchTube item={tube}  key={tube.id} / >
                    )}
                </GridListTile>
            </GridList>
        </React.Fragment>
    )
}

export default Search
