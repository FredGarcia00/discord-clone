import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCOyp_tzaVjCb5YWjuD403oJ4D-HvgUzwY",
    authDomain: "discord-clone-733e1.firebaseapp.com",
    databaseURL: "https://discord-clone-733e1.firebaseio.com",
    projectId: "discord-clone-733e1",
    storageBucket: "discord-clone-733e1.appspot.com",
    messagingSenderId: "611940380388",
    appId: "1:611940380388:web:6e3a583c65ffc26b5e06f1",
    measurementId: "G-DMJG1T6VYT"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;