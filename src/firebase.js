import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAt9_-r6ByCbXZsxsD_sNtOBPOcmUXfZIY",
  authDomain: "mytube-717a5.firebaseapp.com",
  databaseURL: "https://mytube-717a5.firebaseio.com",
  projectId: "mytube-717a5",
  storageBucket: "mytube-717a5.appspot.com",
  messagingSenderId: "1073740003226",
  appId: "1:1073740003226:web:e0882dcb721092fad2ac23",
  measurementId: "G-7P577BLBHP"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();