import firebase from "firebase/app"; // <-- This must be first
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDUUvD9AfhHvDRZRIxDQ2MPlNB2ppMV3Pc",
    authDomain: "atlas-chat-390b1.firebaseapp.com",
    projectId: "atlas-chat-390b1",
    storageBucket: "atlas-chat-390b1.appspot.com",
    messagingSenderId: "533078905096",
    appId: "1:533078905096:web:f7fae438134cdea50cdcbd"
 
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  firestore: firebase.firestore(),
};
