import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyCOGxgvj5_JnOahzyxnUAOirv9xWDq26k0",
  authDomain: "crwn-db-c987f.firebaseapp.com",
  projectId: "crwn-db-c987f",
  storageBucket: "crwn-db-c987f.appspot.com",
  messagingSenderId: "1075189843339",
  appId: "1:1075189843339:web:7a9da81293c53fb58a9b8e"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;
