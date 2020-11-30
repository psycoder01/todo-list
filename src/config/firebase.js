import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//configs
const firebaseConfig = {
    apiKey: "AIzaSyDv5OnYJmzoDCeU0b4hYAhjItgmkIoloNg",
    authDomain: "todo-list-c2979.firebaseapp.com",
    databaseURL: "https://todo-list-c2979.firebaseio.com",
    projectId: "todo-list-c2979",
    storageBucket: "todo-list-c2979.appspot.com",
    messagingSenderId: "41890019499",
    appId: "1:41890019499:web:5650ceebe4f51e117b1fee",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//authentication methods
export const signup = (email, pass) =>
    auth.createUserWithEmailAndPassword(email, pass);

export const signin = (email, pass) =>
    auth.signInWithEmailAndPassword(email, pass);

export const signout = () => auth.signOut();
