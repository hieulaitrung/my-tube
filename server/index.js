import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { checkIfAuthenticated } from './middlewares/auth-middleware'
import { rateLimiter } from './middlewares/rateLimiter';

dotenv.config()
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')));
app.set('trust proxy', 1)


admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();
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
    //const obj = await db.collection('tubes').add(req.body);

    res.send("ok");
});

app.get('/apis/tubes/:tubeId', async (req, res) => {
    const tubeId = req.params.tubeId;
    const obj = await db.collection('tubes').doc(tubeId).get();
    let result = { id: tubeId, ...obj.data() };
    res.send(result);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(process.env.PORT || 5000);