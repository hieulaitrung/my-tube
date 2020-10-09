'use strict';
const spotify = require('./api');

class Spotifye {
  // {
  //   "name": "Cứ Chill Thôi",
  //   "artists": [
  //   "Chillies",
  //   "Suni Hạ Linh",
  //   "Rhymastic"
  //   ],
  //   "album_name": "Cứ Chill Thôi",
  //   "release_date": "2020-07-11",
  //   "cover_url": "https://i.scdn.co/image/ab67616d0000b27336553f37510f4d4f3ccde8bf",
  //   "duration_ms": 270000
  //   }
  async getTrack(url) {
    const ID = await this.getID(url);
    return this.extrTrack(ID);
  }
  async getAlbum(url) {
    const ID = await this.getID(url);
    return this.extrAlbum(ID);
  }
  async getPlaylist(url) {
    const ID = await this.getID(url);
    return this.extrPlaylist(ID);
  }

  async getID(url) {
    var token = await spotify.setup();
    spotify.setToken(token);
    var id;
    for (let i = 0; i < url.length; i++) {
      if (i > 10 && url[i] === '/') {
        for (let j = i; j < url.length; j++) {
          if (url[j] === '/') {
            id = url.slice(++j);
          }
        }
      }
    }
    return id;
  }

  async extrTrack(trackId) {
    const trackData = await spotify.extractTrack(trackId);
    return trackData;
  }
  async extrPlaylist(playlistId) {
    const trackData = await spotify.extractPlaylist(playlistId);
    return trackData;
  }
  async extrAlbum(albumId) {
    const trackData = await spotify.extractAlbum(albumId);
    return trackData;
  }
}

module.exports = Spotifye;