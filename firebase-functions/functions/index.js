const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const admin = require('firebase-admin');
const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
}

admin.initializeApp({
    credential: admin.credential.cert(functions.config().service_account),
    storageBucket: functions.config().storage.bucket
});

const app = require('./app');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'tubes';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// Update the search index every time a blog post is written.
exports.onTubeCreated = functions.firestore.document('tubes/{tubeId}').onCreate((snap, context) => {
    // Get the note document
    const tube = snap.data();

    // Add an 'objectID' field which Algolia requires
    tube.objectID = context.params.tubeId;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(tube);
});


exports.onTubeUpdated = functions.firestore.document('tubes/{tubeId}').onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const tube = change.after.data();
    tube.objectID = context.params.tubeId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(tube);
});


exports.onTubeDeleted = functions.firestore.document('tubes/{tubeId}').onDelete((snap, context) => {
    // Get an object representing the document prior to deletion
    // e.g. {'name': 'Marie', 'age': 66}
    const tube = snap.data();
    tube.objectID = context.params.tubeId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(tube.objectID);
    // perform desired operations ...
});

exports.app = functions.runWith(runtimeOpts).https.onRequest(app);