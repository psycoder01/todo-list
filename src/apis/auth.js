import { auth } from "../config/firebase";

const signup = (email, pass) =>
    auth.createUserWithEmailAndPassword(email, pass);

const signin = (email, pass) =>
    auth.signInWithEmailAndPassword(email, pass);

const signout = () => auth.signOut();

export { signin, signout, signup };
