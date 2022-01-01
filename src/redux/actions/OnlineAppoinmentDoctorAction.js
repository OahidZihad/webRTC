import axios from "axios";
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

export const OnlineAppoinmentDoctorAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ONLINE_DOCTOR_LIST_REQUEST,
    });
    const data = await axios.get("www.google.com/");

    dispatch({
      type: ONLINE_DOCTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ONLINE_DOCTOR_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const OnlineAppoinmentCategoryAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ONLINE_DOCTOR_CATEGORY_REQUEST,
    });
    const data = await axios.get("www.google.com/");

    dispatch({
      type: ONLINE_DOCTOR_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ONLINE_DOCTOR_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const OnlineDoctorProfileAction =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ONLINE_DOCTOR_PROFILE_REQUEST,
      });
      const data = await axios.get(`www.google.com/${id}`);

      dispatch({
        type: ONLINE_DOCTOR_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ONLINE_DOCTOR_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

///// video chat
export const setMainStream = (stream) => {
  return {
    type: SET_MAIN_STREAM,
    payload: {
      mainStream: stream,
    },
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const addParticipant = (user) => {
  return {
    type: ADD_PARTICIPANT,
    payload: {
      newUser: user,
    },
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const updateParticipant = (user) => {
  return {
    type: UPDATE_PARTICIPANT,
    payload: {
      newUser: user,
    },
  };
};

export const removeParticipant = (userId) => {
  return {
    type: REMOVE_PARTICIPANT,
    payload: {
      id: userId,
    },
  };
};
//// video chat end
