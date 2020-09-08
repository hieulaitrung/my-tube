export const MyTubeAPI = () => {
    const getTubes = (term) => {
        let endpoint = `${process.env.REACT_APP_SERVER_URL}/apis/tubes`;
        if (term) {
            endpoint += `?term=${term}`;
        }
        return fetch(endpoint)
            .then(res => res.json());
    }

    const lookupAuthor = (authors, authorId,) => {
        return authors.filter(a => a.id === authorId)[0];
    }

    return {
        getTubes,
        lookupAuthor
    }
}