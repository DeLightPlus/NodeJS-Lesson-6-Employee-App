require('dotenv').config();
const firebase = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore using the initialized app
const db = getFirestore(app);

// Export the Firestore database instance
module.exports = { db };