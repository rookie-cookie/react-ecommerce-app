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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey)
  // console.log(collectionRef)

  //batch write groups all request into one big request
  //batch() object is built in to firestore
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    //creates a new document reference in this collection and a randomly generated id for each doc  
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef) 
    batch.set(newDocRef, obj)
  });

  //will run the batch request, this returns a promise with null value 
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  // console.log(transformedCollection)
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  },{})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
