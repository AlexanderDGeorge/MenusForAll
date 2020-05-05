import firebase from 'firebase/app';
import 'firebase/firestore';

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

// firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;

export default firebase;