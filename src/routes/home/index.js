import React, { useState, useEffect } from 'react';
import TubesGrid from '../../components/home/TubesGrid';
import api from '../../apis'

const Home = (props) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
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
        <TubesGrid isLoaded={isLoaded} items={items} />
    )
}

export default Home
