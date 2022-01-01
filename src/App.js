import MainScreen from "./components/MainScreen/MainScreen.component";
import EachDoctor from "./components/Pages/EachDoctor";
import DoctorForm from "./components/Pages/DoctorForm";
import Countdown from "./components/Pages/CountdownTimer";
import Landing from "./components/Pages/Landing";

import firepadRef, { db, userName } from "./server/firebase";
import "./App.css";
import { useEffect } from "react";
// import {
//   setMainStream,
//   addParticipant,
//   setUser,
//   removeParticipant,
//   updateParticipant,
// } from "./store/actioncreator";
import { connect, Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import MedicineDoctor from "./components/Doctors/MedicineDoctor";
import PediatricDoctor from "./components/Doctors/PediatricDoctor";
import PsychologyDoctor from "./components/Doctors/PsychologyDoctor";
import GynaeDoctor from "./components/Doctors/GynaeDoctor";
import DoctorRegForm from "./components/DoctorRegistration/DoctorRegForm";
import DoctorPortalHome from "./components/DoctorRegistration/DoctorPortalHome";
import PrivateRoute from "./components/Pages/PrivateRoute";
import DoctorLogin from "./components/DoctorPortal/DoctorLogin";
import PatientWaitingList from "./components/DoctorPortal/PatientWaitingList";
import TreatmentDescription from "./components/DoctorPortal/TreatmentDescription";
import PatientPortal from "./components/PatientPortal/PatientPortal";
import PaymentLoading from "./components/Payment/PaymentLoading";
import { createStore } from "redux";
import { userReducer } from "./redux/reducers/OnlineAppoinmentDoctorReducers";

export const store2 = createStore(userReducer);
function App(props) {
  // const getUserStream = async () => {
  //   const localStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });

  //   return localStream;
  // };
  // useEffect(async () => {
  //   const stream = await getUserStream();
  //   stream.getVideoTracks()[0].enabled = false;
  //   props.setMainStream(stream);

  //   connectedRef.on("value", (snap) => {
  //     if (snap.val()) {
  //       const defaultPreference = {
  //         audio: true,
  //         video: false,
  //         screen: false,
  //       };
  //       const userStatusRef = participantRef.push({
  //         userName,
  //         preferences: defaultPreference,
  //       });
  //       props.setUser({
  //         [userStatusRef.key]: { name: userName, ...defaultPreference },
  //       });
  //       userStatusRef.onDisconnect().remove();
  //     }
  //   });

  //   // const stream = await getUserStream();
  //   // stream.getVideoTracks()[0].enabled = false;
  //   // props.setMainStream(stream);
  // }, []);

  // const connectedRef = db.database().ref(".info/connected");
  // const participantRef = firepadRef.child("participants");

  // const isUserSet = !!props.user;
  // const isStreamSet = !!props.stream;

  // useEffect(() => {
  //   // if (isUserSet) {
  //   if (isStreamSet && isUserSet) {
  //     participantRef.on("child_added", (snap) => {
  //       const preferenceUpdateEvent = participantRef
  //         .child(snap.key)
  //         .child("preferences");
  //       preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
  //         props.updateParticipant({
  //           [snap.key]: {
  //             [preferenceSnap.key]: preferenceSnap.val(),
  //           },
  //         });
  //       });
  //       const { userName: name, preferences = {} } = snap.val();
  //       props.addParticipant({
  //         [snap.key]: {
  //           name,
  //           ...preferences,
  //         },
  //       });
  //     });
  //     participantRef.on("child_removed", (snap) => {
  //       props.removeParticipant(snap.key);
  //     });
  //   }
  // }, [isStreamSet, isUserSet]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/PaymentLoading">
            <PaymentLoading></PaymentLoading>
          </Route>
          <Route path="/patientPortal">
            <PatientPortal></PatientPortal>
          </Route>
          <Route path="/treatmentDescription">
            <TreatmentDescription></TreatmentDescription>
          </Route>
          <Route path="/patientWaitingList">
            <PatientWaitingList></PatientWaitingList>
          </Route>
          <Route path="/doctorLogin">
            <DoctorLogin></DoctorLogin>
          </Route>
          <Route path="/doctorPortalHome">
            <DoctorPortalHome></DoctorPortalHome>
          </Route>
          {/* <Route path="/doctorRegistrationForm">
            <DoctorRegForm></DoctorRegForm>
          </Route> */}
          <PrivateRoute path="/doctorRegistrationForm">
            <DoctorRegForm></DoctorRegForm>
          </PrivateRoute>
          <Route path="/medicine">
            <MedicineDoctor></MedicineDoctor>
          </Route>
          <Route path="/Pediatrician">
            <PediatricDoctor></PediatricDoctor>
          </Route>
          <Route path="/psychology">
            <PsychologyDoctor></PsychologyDoctor>
          </Route>
          <Route path="/gynae">
            <GynaeDoctor></GynaeDoctor>
          </Route>
          <Route path="/online-doctor/:id">
            <EachDoctor></EachDoctor>
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
          <PrivateRoute path="/DoctorForm/:id">
            <DoctorForm />
          </PrivateRoute>
          <Route path="/countdown">
            <Countdown />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/* <Route path="/videochat">
            <MainScreen />
          </Route> */}
          <Provider store={store2}>
            <Route path="/videochat">
              <Main></Main>
            </Route>
          </Provider>
        </Switch>
      </Router>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     stream: state.mainStream,
//     user: state.currentUser,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setMainStream: (stream) => dispatch(setMainStream(stream)),
//     addParticipant: (user) => dispatch(addParticipant(user)),
//     setUser: (user) => dispatch(setUser(user)),
//     removeParticipant: (userId) => dispatch(removeParticipant(userId)),
//     updateParticipant: (user) => dispatch(updateParticipant(user)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
