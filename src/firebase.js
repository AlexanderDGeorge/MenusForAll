import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDsthvKi0madL26bGsWIjm-eF9wVwcvKbw",
    authDomain: "menusforall.firebaseapp.com",
    databaseURL: "https://menusforall.firebaseio.com",
    projectId: "menusforall",
    storageBucket: "menusforall.appspot.com",
    messagingSenderId: "230892145861",
    appId: "1:230892145861:web:1f0ab51ef4ce9f06dcb4ac",
    measurementId: "G-EFYJLSYCZP"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserDocument = async (user, additionalData) => {
    // If there is no user, let's not do this.
    if (!user) return;

    // Get a reference to the location in the Firestore where the user
    // document may or may not exist.
    const userRef = firestore.doc(`users/${user.uid}`);

    // Go and fetch a document from that location.
    const snapshot = await userRef.get();

    // If there isn't a document for that user. Let's use information
    // that we got from either Google or our sign up form.
    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();
        try {
        await userRef.set({
            displayName,
            email,
            photoURL,
            createdAt,
            ...additionalData,
        });
        } catch (error) {
        console.error('Error creating user', console.error);
        }
    }

    // Get the document and return it, since that's what we're
    // likely to want to do next.
    return getUserDocument(user.uid);
};
  
export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore
        .collection('users')
        .doc(uid)
        .get();

        return { uid, ...userDocument.data() };
    } catch (error) {
        console.error('Error fetching user', error.message);
    }
};

export default firebase;