const admin = require('firebase-admin');


const getIdToken = (req) => {
    let idToken = null;
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        idToken = req.headers.authorization.split(' ')[1];
    }
    return idToken;

}

const checkIfAuthenticated = async (req, res, next) => {
    const idToken = getIdToken(req);
    try {
        const userInfo = await admin.auth().verifyIdToken(idToken);
        req.currentUser = userInfo;
        return next();
    } catch (e) {
        console.log(e);
        return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
}

exports.checkIfAuthenticated = checkIfAuthenticated;