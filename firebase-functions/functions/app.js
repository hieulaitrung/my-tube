const functions = require('firebase-functions');
const express = require('express');
var Bugsnag = require('@bugsnag/js')
var BugsnagPluginExpress = require('@bugsnag/plugin-express')
const cors = require('cors');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const axios = require('axios');
const { checkIfAuthenticated } = require('./auth-middleware');
const utils = require('./utils');
const spotify = require('./spotify');
const tiktok = require('./tiktok');


Bugsnag.start({
    apiKey: functions.config().bugsnag.api_key,
    plugins: [BugsnagPluginExpress]
});

const app = express();
const middleware = Bugsnag.getPlugin('express');
app.use(middleware.requestHandler);
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(middleware.errorHandler)
app.set('trust proxy', 1)

const db = admin.firestore();
const bucket = admin.storage().bucket();
const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.search_key);
const index = client.initIndex('tubes');

app.get('/apis/tubes', async (req, res) => {
    const searchTerm = req.query.term;
    const filterBy = req.query.filterBy;
    const filterTerm = req.query.filterTerm;

    const result = { authors: [], articles: [] };
    const filter = (typeof filterBy == "undefined") ? {} : {
        filters: `${filterBy}:${filterTerm}`
    };

    const searchResponse = await index.search(searchTerm, filter);
    result.articles = searchResponse.hits
        .map(h => {
            return {
                id: h.objectID,
                authorId: h.authorId,
                body: h.body,
                title: h.title,
                date: h.date,
                tag: h.tag,
                thumbnails: h.thumbnails
            }
        });

    const usersSnapshot = await db.collection('users').get();
    usersSnapshot.forEach((doc) => {
        result.authors.push({ id: doc.id, ...doc.data() });
    });

    res.send(result);
});

app.get('/apis/tubes/me', checkIfAuthenticated, async (req, res) => {
    const searchTerm = req.query.term;
    const filterBy = req.query.filterBy;
    const filterTerm = req.query.filterTerm;

    const uid = req.currentUser.uid;
    const result = { authors: [], articles: [] };
    const filter = (typeof filterBy == "undefined") ?
        { filters: `authorId:${uid}` } :
        {
            filters: `${filterBy}:${filterTerm} AND authorId:${uid}`
        };
    const searchResponse = await index.search(searchTerm, filter);
    result.articles = searchResponse.hits
        .map(h => {
            return {
                id: h.objectID,
                authorId: h.authorId,
                body: h.body,
                title: h.title,
                date: h.date,
                tag: h.tag,
                thumbnails: h.thumbnails
            }
        });

    const usersSnapshot = await db.collection('users').get();
    usersSnapshot.forEach((doc) => {
        result.authors.push({ id: doc.id, ...doc.data() });
    });

    res.send(result);
});

app.get('/apis/tubes/:tubeId/next', async (req, res) => {
    const tubeId = req.params.tubeId;
    const tube = await db.collection('tubes').doc(tubeId).get();
    const searchResponse = await index.search('', {
        filters: `tag:${tube.data().tag} AND NOT objectID:${tubeId}`
    });

    const result = { authors: [], articles: [] };
    result.articles = searchResponse.hits
        .map(h => {
            return {
                id: h.objectID,
                authorId: h.authorId,
                body: h.body,
                title: h.title,
                date: h.date,
                tag: h.tag,
                thumbnails: h.thumbnails
            }
        });

    const usersSnapshot = await db.collection('users').get();
    usersSnapshot.forEach((doc) => {
        result.authors.push({ id: doc.id, ...doc.data() });
    });

    res.send(result);
});

app.post('/apis/tubes', checkIfAuthenticated, async (req, res,) => {
    const tube = req.body;
    tube.authorId = req.currentUser.uid;
    tube.date = admin.firestore.Timestamp.now();
    tube.createdAt = admin.firestore.Timestamp.now().toMillis();
    const obj = await db.collection('tubes').add(tube);
    tube.id = obj.id;
    res.send(tube);
});

app.delete('/apis/tubes/:tubeId', checkIfAuthenticated, async (req, res) => {
    const tubeId = req.params.tubeId;
    const uid = req.currentUser.uid;
    const obj = await db.collection('tubes').doc(tubeId).get();
    const file = bucket.file(`${uid}/videos/${obj.data().fileId}`);
    await db.collection('tubes').doc(tubeId).delete();
    await file.delete();
    let result = { id: tubeId };
    res.send(result);
});

app.get('/apis/tubes/:tubeId', async (req, res) => {
    const tubeId = req.params.tubeId;
    const obj = await db.collection('tubes').doc(tubeId).get();
    let result = { id: tubeId, ...obj.data() };
    res.send(result);
});


app.get('/videos/info', async (req, res) => {
    const link = req.query.link;
    const url = new URL(link);
    if (url.hostname.indexOf("tiktok") > 0) {
        const info = await tiktok.info(link);
        res.send({
            id: link,
            title: info.musicMeta.musicName,
            body: info.text,
            source: 'tiktok',
            length: String(info.videoMeta.duration),
            thumbnails: [{ url: info.imageUrl, width: 200, height: 200 }],
            author: {
                name: info.authorMeta.name
            }

        });
    } else if (url.hostname.indexOf("spotify") > 0) {
        const info = await spotify.info(link)
        res.send({
            id: link,
            title: info.name,
            source: 'spotify',
            length: String(info.duration_ms / 1000),
            thumbnails: [{ url: info.cover_url, width: 200, height: 200 }],
            author: {
                name: info.artists.join(", ")
            }
        });
    } else {
        //fallback to youtube
        const info = await ytdl.getInfo(link);
        res.send({
            id: link,
            title: info.videoDetails.title,
            source: 'youtube',
            body: info.videoDetails.shortDescription,
            length: info.videoDetails.lengthSeconds,
            thumbnails: info.player_response.videoDetails.thumbnail.thumbnails,
            author: info.videoDetails.author
        });
    }


});

app.get('/videos/file', async (req, res) => {

    const link = req.query.link;
    const url = new URL(link);
    //TODO: support audio only?
    if (url.hostname.indexOf("tiktok") > 0) {
        res.header('Content-Disposition', 'attachment; filename="tiktok.mp4"');
        const dlLink = await tiktok.getDownloadLink(link);
        // might use different options https://github.com/drawrowfly/tiktok-scraper/blob/26b0e4afba40db4135a8c2aff0652af6046835cd/src/core/Downloader.ts#L182
        await axios({
            method: 'get',
            url: dlLink,
            headers: {
                'user-agent': 'axios',
                referer: 'https://www.tiktok.com/',
            },
            responseType: 'stream'
        }).then((response) => {
            return response.data.pipe(res);
        });
    } else if (url.hostname.indexOf("spotify") > 0) {
        res.header('Content-Disposition', 'attachment; filename="spotify.mp3"');
        const ytLink = await spotify.getDownloadLink(link);
        ytdl(ytLink, { filter: 'audioonly' })
            .pipe(res);
    } else {
        res.header('Content-Disposition', 'attachment; filename="youtube.mp4"');
        ytdl(link, { filter: format => format.container === 'mp4', quality: 'highest' })
            .pipe(res);
    }
});

app.post('/videos/file', checkIfAuthenticated, async (req, res) => {

    const link = req.query.link;
    const url = new URL(link);
    const uid = req.currentUser.uid;
    if (url.hostname.indexOf("tiktok") > 0) {
        const name = `${utils.autoId()}.mp4`;
        const file = bucket.file(`${uid}/videos/${name}`);
        const dlLink = await tiktok.getDownloadLink(link);
        // might use different options https://github.com/drawrowfly/tiktok-scraper/blob/26b0e4afba40db4135a8c2aff0652af6046835cd/src/core/Downloader.ts#L182
        await axios({
            method: 'get',
            url: dlLink,
            headers: {
                'user-agent': 'axios',
                referer: 'https://www.tiktok.com/',
            },
            responseType: 'stream'
        }).then((response) => {
            return response.data
                .pipe(file.createWriteStream({
                    metadata: {
                        contentType: 'video/mp4',
                        metadata: {
                            originName: link,
                            source: 'tiktok'
                        }
                    }
                })).on('error', (err) => {
                    res.send({ error: err.message });
                }).on('finish', () => {
                    // The file upload is complete.
                    res.send({ fileId: name });
                });
        });
    } else if (url.hostname.indexOf("spotify") > 0) {
        const name = `${utils.autoId()}.mp3`;
        const file = bucket.file(`${uid}/videos/${name}`);
        const ytLink = await spotify.getDownloadLink(link);
        ytdl(ytLink, { filter: 'audioonly' })
            .pipe(file.createWriteStream({
                metadata: {
                    contentType: 'audio/webm',
                    metadata: {
                        originName: link,
                        source: 'spotify'
                    }
                }
            })).on('error', (err) => {
                res.send({ error: err.message });
            }).on('finish', () => {
                // The file upload is complete.
                res.send({ fileId: name });
            });
    } else {
        const name = `${utils.autoId()}.mp4`;
        const file = bucket.file(`${uid}/videos/${name}`);
        //TODO: support audio only?
        ytdl(link, { quality: 'highest' })
            .pipe(file.createWriteStream({
                metadata: {
                    contentType: 'video/mp4',
                    metadata: {
                        originName: link,
                        source: 'youtube'
                    }
                }
            })).on('error', (err) => {
                res.send({ error: err.message });
            }).on('finish', () => {
                // The file upload is complete.
                res.send({ fileId: name });
            });
    }
});

module.exports = app