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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()
  console.log(snapshot)

  if(!snapshot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user ', error.message)
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;
