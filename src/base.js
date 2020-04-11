import Rebase from "re-base";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyANQdSNj8gJdGk2N2rootq4KHpk5X_7ZOc",
    authDomain: "catch-of-the-day-hetty82.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-hetty82.firebaseio.com"
    // projectId: "catch-of-the-day-hetty82",
    // storageBucket: "catch-of-the-day-hetty82.appspot.com",
    // messagingSenderId: "740573632497",
    // appId: "1:740573632497:web:077ecde02410c596945650",
    // measurementId: "G-YDJCN589L4"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
