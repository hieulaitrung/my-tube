const { promisify } = require('util');
const youtubeSearch = require('yt-search');
const utils = require('../utils');
const Spotifye = require('./get-songdata');

const search = promisify(youtubeSearch);

const buildUrl = (topResult) => {
    return (topResult.url.includes('https://youtube.com')) ? topResult.url : 'https://youtube.com' + topResult.url;
}

const info = async (link) => {
    const spotifye = new Spotifye();
    const urlType = utils.parser(utils.removeQuery(link));
    // TODO: switch urlType
    return utils.retry(async () => { return await spotifye.getTrack(link) }, 5);
}

const getDownloadLink = async (link) => {
    const urlType = utils.parser(utils.removeQuery(link));
    // TODO: switch urlType

    const songData = await info(link);

    const songName = songData.artists.join(", ") + " - " + songData.name;
    const result = await search(songName);
    // TODO: better scoring https://github.com/spotDL/spotify-downloader/blob/master/spotdl/search/provider.py

    const videos = result.videos;
    // .map(v => {
    //     const duration = v.duration.seconds;
    //     const songDuration = songData.duration_ms / 1000;
    //     v.delta = Math.abs(duration - songDuration);
    //     return v;
    // }).sort((i, j) => i.delta - j.delta);


    const youtubeLink = buildUrl(videos[0])
    return youtubeLink;
}

module.exports = {
    info,
    getDownloadLink
}