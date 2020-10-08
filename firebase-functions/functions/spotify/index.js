const filter = require('./filters');
const urlParser = require('./url-parser');
const getLink = require('./get-link');
const Spotifye = require('./get-songdata');

const info = async(link) => {
    const spotifye = new Spotifye();
    const urlType = urlParser(filter.removeQuery(link));
    // TODO: switch urlType
    return await spotifye.getTrack(link);
}

const getDownloadLink = async (link) => {
    const spotifye = new Spotifye();
    const urlType = urlParser(filter.removeQuery(link));
    // TODO: switch urlType

    const songData = await spotifye.getTrack(link);
    return getLink(songData);
    
}

module.exports = {
    info,
    getDownloadLink
}