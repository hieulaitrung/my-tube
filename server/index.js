import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { checkIfAuthenticated } from './middlewares/auth-middleware'
import { rateLimiter } from './middlewares/rateLimiter';
import ytdl from 'ytdl-core'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginExpress from '@bugsnag/plugin-express'

dotenv.config()
Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY,
    plugins: [BugsnagPluginExpress]
});

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});


const app = express();
const middleware = Bugsnag.getPlugin('express');

app.use(middleware.requestHandler);
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')));
app.use(middleware.errorHandler)
app.set('trust proxy', 1)


const db = admin.firestore();
const bucket = admin.storage().bucket();
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);
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
                tag: h.tag
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
                tag: h.tag
            }
        });

    const usersSnapshot = await db.collection('users').get();
    usersSnapshot.forEach((doc) => {
        result.authors.push({ id: doc.id, ...doc.data() });
    });

    res.send(result);
});

app.post('/apis/tubes', checkIfAuthenticated, rateLimiter, async (req, res,) => {
    const tube = req.body;
    tube.authorId = req.currentUser.uid;
    tube.date = admin.firestore.Timestamp.now();
    const obj = await db.collection('tubes').add(tube);
    tube.id = obj.id;
    res.send(tube);
});

app.post('/apis/tubes/file', checkIfAuthenticated, rateLimiter, async (req, res) => {
    const link = req.query.link;
    const autoId = () => {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        let autoId = ''

        for (let i = 0; i < 20; i++) {
            autoId += CHARS.charAt(
                Math.floor(Math.random() * CHARS.length)
            )
        }
        return autoId
    };
    const uid = req.currentUser.uid;
    const name = `${autoId()}.mp4`;
    const file = bucket.file(`${uid}/videos/${name}`);
    ytdl(link, { quality: 'lowest' })
        .pipe(file.createWriteStream({
            metadata: {
                contentType: 'video/mp4',
                metadata: {
                    originName: link,
                    source: 'youtube'
                }
            }
        })).on('error', function (err) {
            res.send({ error: err.message });
        }).on('finish', function () {
            // The file upload is complete.
            res.send({ fileId: name });
        });
});

app.get('/apis/tubes/:tubeId', async (req, res) => {
    const tubeId = req.params.tubeId;
    const obj = await db.collection('tubes').doc(tubeId).get();
    let result = { id: tubeId, ...obj.data() };
    res.send(result);
});


//Move to cloud functions
app.get('/apis/videos/info', async (req, res) => {
    const link = req.query.link;

    const info = await ytdl.getInfo(link);

    res.send({
        id: info.videoDetails.videoId,
        title: info.videoDetails.title,
        body: info.videoDetails.shortDescription,
        length: info.videoDetails.lengthSeconds,
        thumbnails: info.player_response.videoDetails.thumbnail.thumbnails,
        author: info.videoDetails.author
    });

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 5000);