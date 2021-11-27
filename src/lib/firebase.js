import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrjf9mnsiGj-6pLorp2IWuqYDA7EgnHfE",
    authDomain: "unify-38633.firebaseapp.com",
    projectId: "unify-38633",
    storageBucket: "unify-38633.appspot.com",
    messagingSenderId: "298724202700",
    appId: "1:298724202700:web:43d1370401668a76138a69",
    measurementId: "G-JRS946DB8X"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;
