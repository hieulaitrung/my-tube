
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

const createTube = (tube, token) => {
    let endpoint = `${url}/apis/tubes`;
    return fetch(endpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(tube)
    }).then(res => res.json());
}

const lookupAuthor = (authors, authorId,) => {
    return authors.filter(a => a.id === authorId)[0];
}

const getVideoInfo = (link) => {
    let endpoint = `${url}/apis/videos/info?link=${encodeURIComponent(link)}`;
    return fetch(endpoint).then(res => res.json());
}

const fetchVideo = (link, token) => {
    let endpoint = `${url}/apis/tubes/file?link=${encodeURIComponent(link)}`;
    return fetch(endpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        //body: JSON.stringify(tube)
    }).then(res => res.json());
}

export default {
    getTubes,
    getNextTubes,
    createTube,
    getTube,
    lookupAuthor,
    getVideoInfo,
    fetchVideo
}