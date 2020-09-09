export const MyTubeAPI = () => {
    const url  = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'
    const getTubes = (term) => {
        let endpoint = `${url}/apis/tubes`;
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