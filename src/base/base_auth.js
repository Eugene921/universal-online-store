import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FRIBASE_DATABASE_URL,
  projectId: process.env.FRIBASE_PROJECT_ID,
  storageBucket: process.env.FRIBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FRIBASE_MESSAGING_SENDER_ID,
  appId: process.env.FRIBASE_APP_ID,
  measurementId: process.env.FRIBASE_MEASUREMENT_ID,
});

export const storageRef = firebase.storage().ref();

export default firebaseApp;