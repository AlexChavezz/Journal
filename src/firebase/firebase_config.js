import { initializeApp } from 'firebase/app';

// import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDGC-CtgHfJsTo2_RH9tRHaSU5oTDpH3kE",
  authDomain: "journal-15371.firebaseapp.com",
  projectId: "journal-15371",
  storageBucket: "journal-15371.appspot.com",
  messagingSenderId: "502640591279",
  appId: "1:502640591279:web:ecb6dee6bb6840b0a6ef5a"
};
const firebaseApp = initializeApp( firebaseConfig );

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {
  db,
  auth,
}