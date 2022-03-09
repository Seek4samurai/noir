import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDQf1SMg6JTP7Mkfco1V4JIbsJXN6vhJkI",
    authDomain: "noir-7afa3.firebaseapp.com",
    projectId: "noir-7afa3",
    storageBucket: "noir-7afa3.appspot.com",
    messagingSenderId: "686202027293",
    appId: "1:686202027293:web:0f0a90094b92d32808f5f4",
    measurementId: "G-XBBPG4GK1Z"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, db, provider };
