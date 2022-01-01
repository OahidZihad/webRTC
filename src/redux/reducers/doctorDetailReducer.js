import {
  ONLINE_DOCTOR_DETAIL_REQUEST,
  ONLINE_DOCTOR_DETAIL_SUCCESS,
  ONLINE_DOCTOR_DETAIL_FAILURE,
  DOCTOR_CREATE_REVIEW_REQUEST,
  DOCTOR_CREATE_REVIEW_SUCCESS,
  DOCTOR_CREATE_REVIEW_FAILURE,
  DOCTOR_CREATE_REVIEW_RESET,
  DOCTOR_GET_REVIEW_REQUEST,
  DOCTOR_GET_REVIEW_SUCCESS,
  DOCTOR_GET_REVIEW_FAILURE,
  DOCTOR_CREATE_APPOINTMENT_REQUEST,
  DOCTOR_CREATE_APPOINTMENT_SUCCESS,
  DOCTOR_CREATE_APPOINTMENT_FAILURE,
} from "../type";

export const doctorDetailReducers = (state = { doctor: [] }, action) => {
  switch (action.type) {
    case ONLINE_DOCTOR_DETAIL_REQUEST:
      return {
        //   loading: true,
        ...state,
      };

    case ONLINE_DOCTOR_DETAIL_SUCCESS:
      return {
        //   loading: false,
        doctor: action.payload,
      };
    case ONLINE_DOCTOR_DETAIL_FAILURE:
      return {
        //    loading:false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const doctorReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case DOCTOR_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_CREATE_REVIEW_FAILURE:
      return { loading: false, error: action.payload };
    case DOCTOR_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const doctorReviewGetReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_GET_REVIEW_REQUEST:
      return { loading: true };
    case DOCTOR_GET_REVIEW_SUCCESS:
      return { loading: false, success: true, rating: action.payload };
    case DOCTOR_GET_REVIEW_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createDoctorAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_CREATE_APPOINTMENT_REQUEST:
      return {
        //   loading: true,
        doctorAppointment: [],
      };
    case DOCTOR_CREATE_APPOINTMENT_SUCCESS:
      return {
        //   loading: false,
        //   success: true,
        doctorAppointment: action.payload,
      };
    case DOCTOR_CREATE_APPOINTMENT_FAILURE:
      return {
        // loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};
