import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyAwUUAEAOi-ePiTmfVnGMVhEzM3krLjDKQ",
    authDomain: "upperline-app.firebaseapp.com",
    databaseURL: "https://upperline-app.firebaseio.com",
    projectId: "upperline-app",
    storageBucket: "",
    messagingSenderId: "837043626791",
    appId: "1:837043626791:web:69b8e37241c861e7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth()
  export const db = firebase.firestore()
  
  export default firebase