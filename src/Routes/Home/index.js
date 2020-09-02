import React, { useState, useEffect } from 'react';
import TubeList from '../../components/TubeList';
import {MyTubeAPI} from '../../APIs'

const Home = (props) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const api = MyTubeAPI();
    useEffect(() => {
        const res = api.getTubes();
        res.then(
            (result) => {
              setIsLoaded(true);
              const articles = result.articles;
              articles.map(a => a.author = api.lookupAuthor(result.authors, a.authorId));
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
      }, [])

    return (
        <TubeList items={items} />
    )
}

export default Home
