import { useState } from 'react'

export const MyTubeAPI = () => {
    
    const getTubes = () => {
        return fetch(`http://localhost:8080/tubes`)
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