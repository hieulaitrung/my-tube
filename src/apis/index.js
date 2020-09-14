export const MyTubeAPI = () => {
    const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'

    const getTubes = (term, filterBy, filterTerm) => {
        let endpoint = `${url}/apis/tubes?`;
        if (term) {
            endpoint += `&term=${term}`;
        }
        if (filterBy) {
            endpoint += `&filterBy=${filterBy}&filterTerm=${filterTerm}`;
        }
        return fetch(endpoint)
            .then(res => res.json());
    }

    const getNextTubes = (id) => {
        let endpoint = `${url}/apis/tubes/${id}/next`;
        return fetch(endpoint)
            .then(res => res.json());
    }

    const getTube = (id) => {
        let endpoint = `${url}/apis/tubes/${id}`;
        return fetch(endpoint)
            .then(res => res.json());
    }

    const lookupAuthor = (authors, authorId,) => {
        return authors.filter(a => a.id === authorId)[0];
    }

    return {
        getTubes,
        getNextTubes,
        getTube,
        lookupAuthor
    }
}