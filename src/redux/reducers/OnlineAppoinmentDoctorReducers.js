import {
  ONLINE_DOCTOR_LIST_REQUEST,
  ONLINE_DOCTOR_LIST_SUCCESS,
  ONLINE_DOCTOR_LIST_FAILURE,
} from "../type";
import {
  ONLINE_DOCTOR_CATEGORY_REQUEST,
  ONLINE_DOCTOR_CATEGORY_SUCCESS,
  ONLINE_DOCTOR_CATEGORY_FAILURE,
} from "../type";
import {
  ONLINE_DOCTOR_PROFILE_REQUEST,
  ONLINE_DOCTOR_PROFILE_SUCCESS,
  ONLINE_DOCTOR_PROFILE_FAILURE,
} from "../type";

import {
  SET_MAIN_STREAM,
  ADD_PARTICIPANT,
  SET_USER,
  REMOVE_PARTICIPANT,
  UPDATE_USER,
  UPDATE_PARTICIPANT,
} from "../type";

import {
  createOffer,
  initializeListensers,
  updatePreference,
} from "../../server/peerConnection";

export const OnlineAppoinmentDoctorReducer = (
  state = { onlineAppoinment: [] },
  action
) => {
  switch (action.type) {
    case ONLINE_DOCTOR_LIST_REQUEST:
      return {
        loading: true,
        onlineAppoinment: [],
      };
    case ONLINE_DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        onlineAppoinment: action.payload,
      };
    case ONLINE_DOCTOR_LIST_FAILURE:
      return {
        loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};

export const OnlineAppoinmentCategoryReducer = (
  state = { onlineAppoinmentCategory: [] },
  action
) => {
  switch (action.type) {
    case ONLINE_DOCTOR_CATEGORY_REQUEST:
      return {
        loading: true,
        onlineAppoinmentCategory: [],
      };
    case ONLINE_DOCTOR_CATEGORY_SUCCESS:
      return {
        loading: false,
        onlineAppoinmentCategory: action.payload,
      };
    case ONLINE_DOCTOR_CATEGORY_FAILURE:
      return {
        loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};

export const OnlineDoctorProfileReducer = (
  state = { onlineDoctorProfile: [] },
  action
) => {
  switch (action.type) {
    case ONLINE_DOCTOR_PROFILE_REQUEST:
      return {
        loading: true,
        onlineDoctorProfile: [],
      };
    case ONLINE_DOCTOR_PROFILE_SUCCESS:
      return {
        loading: false,
        onlineDoctorProfile: action.payload,
      };
    case ONLINE_DOCTOR_PROFILE_FAILURE:
      return {
        loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};

/// video chat app
let defaultUserState = {
  mainStream: null,
  participants: {},
  currentUser: null,
};

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const userReducer = (state = defaultUserState, action) => {
  if (action.type === SET_MAIN_STREAM) {
    let payload = action.payload;
    state = { ...state, ...payload };
    return state;
  } else if (action.type === ADD_PARTICIPANT) {
    let payload = action.payload;
    const currentUserId = Object.keys(state.currentUser)[0];
    const newUserId = Object.keys(payload.newUser)[0];
    if (state.mainStream && currentUserId !== newUserId) {
      payload.newUser = addConnection(
        payload.newUser,
        state.currentUser,
        state.mainStream
      );
    }

    if (currentUserId === newUserId)
      payload.newUser[newUserId].currentUser = true;
    payload.newUser[newUserId].avatarColor = generateColor();
    let participants = { ...state.participants, ...payload.newUser };
    state = { ...state, participants };
    return state;
  } else if (action.type === SET_USER) {
    let payload = action.payload;
    let participants = { ...state.participants };
    const userId = Object.keys(payload.currentUser)[0];
    payload.currentUser[userId].avatarColor = generateColor();
    initializeListensers(userId);
    state = { ...state, currentUser: { ...payload.currentUser }, participants };
    return state;
  } else if (action.type === REMOVE_PARTICIPANT) {
    let payload = action.payload;
    let participants = { ...state.participants };
    delete participants[payload.id];
    state = { ...state, participants };
    return state;
  } else if (action.type === UPDATE_USER) {
    let payload = action.payload;
    const userId = Object.keys(state.currentUser)[0];
    updatePreference(userId, payload.currentUser);
    state.currentUser[userId] = {
      ...state.currentUser[userId],
      ...payload.currentUser,
    };
    state = {
      ...state,
      currentUser: { ...state.currentUser },
    };
    return state;
  } else if (action.type === UPDATE_PARTICIPANT) {
    let payload = action.payload;
    const newUserId = Object.keys(payload.newUser)[0];

    payload.newUser[newUserId] = {
      ...state.participants[newUserId],
      ...payload.newUser[newUserId],
    };
    let participants = { ...state.participants, ...payload.newUser };
    state = { ...state, participants };
    return state;
  }
  return state;
};

const addConnection = (newUser, currentUser, stream) => {
  const peerConnection = new RTCPeerConnection(servers);
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  const newUserId = Object.keys(newUser)[0];
  const currentUserId = Object.keys(currentUser)[0];

  const offerIds = [newUserId, currentUserId].sort((a, b) =>
    a.localeCompare(b)
  );

  newUser[newUserId].peerConnection = peerConnection;
  if (offerIds[0] !== currentUserId)
    createOffer(peerConnection, offerIds[0], offerIds[1]);
  return newUser;
};
///video chat end
