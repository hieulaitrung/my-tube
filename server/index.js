import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import pickby from 'lodash.pickby';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../build')));


admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);
const index = client.initIndex('tubes');

app.get('/apis/tubes', async (req, res) => {
    const searchTerm = req.query.term;

    const result = { authors: [], articles: [] };

    const searchResponse =  await index.search(searchTerm);
    result.articles = searchResponse.hits;
    const usersSnapshot = await db.collection('users').get();
    usersSnapshot.forEach((doc) => {
        result.authors.push({ id: doc.id, ...doc.data() });
    });

    res.send(result);
});

app.post('/apis/tube', (req, res) => {

    res.send('ok');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(process.env.PORT || 5000);