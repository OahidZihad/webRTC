import firebase from "firebase";
import { useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

var firebaseConfig = {
  // debashish
  // apiKey: "AIzaSyDWQEpnnLjqa0aWhNNvUiGqST3qTrCi13o", // Add API Key
  // databaseURL:"https://carebox-doctor-live-default-rtdb.asia-southeast1.firebasedatabase.app/" // Add databaseURL

  //zihad
  apiKey: "AIzaSyC7bisZl1MAji4eWzk8RTohr9QhmIBha-4",
  databaseURL: "https://online-doctor-bf05f-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

// export const userName = prompt("What's your name?");
// export const usePrompt = (message = 'Are you sure you want to quit without saving your changes?', when) => {
//   const history = useHistory();
//   const self = useRef(null);

//   const onWindowOrTabClose = event => {
//     if (!when) {
//       return;
//     }

//     if (typeof event == 'undefined') {
//       event = window.event;
//     }

//     if (event) {
//       event.returnValue = message;
//     }

//     return message;
//   };

//   useEffect(() => {
//     if (when) {
//       self.current = history.block(message);
//     } else {
//       self.current = null;
//     }

//     window.addEventListener('beforeunload', onWindowOrTabClose);

//     return () => {
//       if (self.current) {
//         self.current();
//         self.current = null;
//       }

//       window.removeEventListener('beforeunload', onWindowOrTabClose);
//     }
//   }, [message, when]);
// };

const urlparams = new URLSearchParams(window.location.search);
console.log(urlparams);
const roomId = urlparams.get("id");
console.log("****", roomId);

if (roomId) {
  // <Link to="/videochat"></Link>
  firepadRef = firepadRef.child(roomId);
} else {
  // <Link to="/videochat"></Link>
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
}

export default firepadRef;
