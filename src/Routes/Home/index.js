import React, { useState, useEffect } from 'react';
import TubeList from '../../components/TubeList';

const Home = (props) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/tubes`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.articles);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

    return (
        <TubeList items={items} />
    )
}

export default Home
