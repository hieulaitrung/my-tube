'use strict';
const parser = async (inputUrl) => {
    if(inputUrl.includes('/track/')) {
        return 'song';
    }
    else if (inputUrl.includes('/playlist/')) {
        return 'playlist';
    }
    else if (inputUrl.includes('/album/')) {
        return 'album';
    }
    else if(inputUrl.includes('/artist/')) {
        return 'artist';
    }
    else {
        return new Error(`Invalid spotify URL`);
    }
}

const removeQuery = (url) => {
    for(let i=0; i<url.length; i++) {
        if(i > 15) {
            if(url[i] === '?') {
                url = url.slice(0, i);
            }
        }
    }
    return url;
}

module.exports = {
    parser,
    removeQuery
}