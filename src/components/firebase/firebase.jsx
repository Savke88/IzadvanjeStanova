import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_vMonM-OhK13xADB76sKIRkzEZmkxDq0",
    authDomain: "izdavanje-stanova.firebaseapp.com",
    projectId: "izdavanje-stanova",
    storageBucket: "izdavanje-stanova.appspot.com",
    messagingSenderId: "4937013066",
    appId: "1:4937013066:web:dbb15b177f59956bef53b3",
    measurementId: "G-C7X359L987"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };

