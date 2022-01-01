import MainScreen from "./MainScreen/MainScreen.component";
import firepadRef, { db } from "../server/firebase";
// import firepadRef, { db, userName } from "../server/firebase";
// import firepadRef, { db, usePrompt } from "../server/firebase";
// import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import {
//   setMainStream,
//   addParticipant,
//   setUser,
//   removeParticipant,
//   updateParticipant,
// } from "../store/actioncreator";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "../redux/actions/OnlineAppoinmentDoctorAction";
import { connect } from "react-redux";

const Main = (props) => {
  //   const userReducer = useSelector((state) => state.userReducer);
  //   console.log("user Reducer ***", userReducer)
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     // dispatch(SliderAction())
  //     dispatch(userReducer.currentUser)
  // }, []);

  console.log(props);

  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };

  useEffect(async () => {
    const stream = await getUserStream();
    stream.getVideoTracks()[0].enabled = false;
    props.setMainStream(stream);
    // const userName = prompt("What's your name?");

    connectedRef.on("value", (snap) => {
      if (snap.val()) {
        const defaultPreference = {
          audio: true,
          video: false,
          screen: false,
        };

        const userName = prompt("What's your name?");

        const userStatusRef = participantRef.push({
          userName,
          preferences: defaultPreference,
        });

        props.setUser({
          [userStatusRef.key]: { name: userName, ...defaultPreference },
        });
        userStatusRef.onDisconnect().remove();
      }
    });
  }, []);

  const connectedRef = db.database().ref(".info/connected");
  const participantRef = firepadRef.child("participants");

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      participantRef.on("child_added", (snap) => {
        const preferenceUpdateEvent = participantRef
          .child(snap.key)
          .child("preferences");
        preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      participantRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);

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
  //         usePrompt,
  //         preferences: defaultPreference,
  //       });
  //       props.setUser({
  //         [userStatusRef.key]: { name: usePrompt, ...defaultPreference },
  //       });
  //       userStatusRef.onDisconnect().remove();
  //     }
  //   });
  // }, []);

  // const connectedRef = db.database().ref(".info/connected");
  // const participantRef = firepadRef.child("participants");

  // const isUserSet = !!props.user;
  // const isStreamSet = !!props.stream;

  // useEffect(() => {
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
  //       const { usePrompt: name, preferences = {} } = snap.val();
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
    <div>
      <MainScreen />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
