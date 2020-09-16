import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_AUTHENTICATION_CONFIG);

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();
const firestore = firebase.firestore();
const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const signIn = (email, password, callback = () => { }) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(function (result) {
      const { user } = result;
      if (!user.emailVerified) {
        callback({
          code: 'unverified',
          message: 'Your email address hasn\'t been verified',
          user
        });
      } else {
        callback();
      }
    }).catch(function (error) {
      callback({
        message: 'Your email or password is incorrect. Please try again.',
        ...error
      });
    });
}

const sendEmailVerification = (user, callback = () => { }) => {
  user.sendEmailVerification().then(function () {
    callback()
  }).catch(function (error) {
    callback(error);
  });
}

const signOut = (callback = () => { }) => {
  auth.signOut()
    .then(function (result) {
      callback();
    }).catch(function (error) {
      callback(error);
    });
}

const createUserWithEmailAndPassword = async (email, password, callback = () => { }) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await user.sendEmailVerification();
    callback();
  }
  catch (error) {
    callback(error);
  }
};

const sendResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email)
};

const generateUserDocument = async (user, additionalData) => {
  if (user == null || !user.emailVerified)
    return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export {
  auth,
  createUserWithEmailAndPassword,
  signIn,
  signInWithGoogle,
  sendEmailVerification,
  generateUserDocument,
  signOut,
  sendResetEmail
}