import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1iHqIKMrnumja4aK57g6FspA0OnnwO8o",
  authDomain: "instagram-clone-97f20.firebaseapp.com",
  databaseURL: "https://instagram-clone-97f20.firebaseio.com",
  projectId: "instagram-clone-97f20",
  storageBucket: "instagram-clone-97f20.appspot.com",
  messagingSenderId: "69555340833",
  appId: "1:69555340833:web:44e46c8e2140b229ec4560",
  measurementId: "G-4LCGSCDVHH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
