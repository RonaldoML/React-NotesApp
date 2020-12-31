import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBawE919p-enUEJH1YbfH7nFaOzfUDePfE",
    authDomain: "react-apps-adb17.firebaseapp.com",
    projectId: "react-apps-adb17",
    storageBucket: "react-apps-adb17.appspot.com",
    messagingSenderId: "206947590393",
    appId: "1:206947590393:web:c7033755adf3ee2825c228"
  };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   const db = firebase.firestore();
   const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

   export {
       db,
       googleAuthProvider,
       firebase
   }