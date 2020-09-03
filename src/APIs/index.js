export const MyTubeAPI = () => {

    const getTubes = (term) => {
        let endpoint = `http://localhost:8080/tubes`;
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