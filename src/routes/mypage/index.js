import React, { useState, useEffect, useContext } from 'react'
import api from '../../apis'
import { UserContext } from '../../providers/UserProvider'
import { auth } from '../../firebase'
import TubesGrid from '../../components/home/TubesGrid';

const MyPage = () => {
    const {user} = useContext(UserContext);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        
        const fetchMyTubes = async () => {
            const token = await auth.currentUser.getIdToken();
            const res = api.getMyTubes(token);
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
        }
        if (user) {
            fetchMyTubes();
        }
    }, [user])

    return (
        <TubesGrid isLoaded={isLoaded} items={items} />
    )
}

export default MyPage
