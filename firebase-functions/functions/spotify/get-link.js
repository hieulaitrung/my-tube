'use strict';
const { promisify } = require('util');
const youtubeSearch = require('yt-search');
const Fuse = require('fuse.js')

const search = promisify(youtubeSearch);

function buildUrl(topResult) {
  return (topResult.url.includes('https://youtube.com')) ? topResult.url : 'https://youtube.com' + topResult.url;
}

/**
 * This function searches youtube for given songname and returns the link of topmost result
 *
 * @param {String} songName name of song
 * @returns {Promise<String>} youtube link of music video
 */
const getLink = async (songData) => {
  try {
    
    const songName = songData.artists.join(", ") + " - " + songData.name;
    const result = await search(songName);
    // TODO: better scoring https://github.com/spotDL/spotify-downloader/blob/master/spotdl/search/provider.py
    const [topResult] = result.videos;

    const youtubeLink = buildUrl(topResult)
    return youtubeLink;
  } catch (error) {
      return error;
  }
};

module.exports = getLink;