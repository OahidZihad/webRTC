import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// carebox config
// const config = {
//   apiKey: "AIzaSyBDwMF7UJ0mQuGvfZ-2as96Nr49qZX_As4",
//   authDomain: "care-box-front.firebaseapp.com",
//   projectId: "care-box-front",
//   storageBucket: "care-box-front.appspot.com",
//   messagingSenderId: "637956017561",
//   appId: "1:637956017561:web:c143d2c39c973fd4125708",
//   measurementId: "G-HMLVJQ27WK",
// };

// oahidzihad1@gmail.com config
const config = {
  apiKey: "AIzaSyC7bisZl1MAji4eWzk8RTohr9QhmIBha-4",
  authDomain: "online-doctor-bf05f.firebaseapp.com",
  databaseURL: "https://online-doctor-bf05f-default-rtdb.firebaseio.com",
  projectId: "online-doctor-bf05f",
  storageBucket: "online-doctor-bf05f.appspot.com",
  messagingSenderId: "132164590455",
  appId: "1:132164590455:web:ad402a32a83af1e6275f72",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  // firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
