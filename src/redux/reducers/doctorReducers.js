import {
  ONLINE_DOCTOR_LIST_REQUEST,
  ONLINE_DOCTOR_LIST_SUCCESS,
  ONLINE_DOCTOR_LIST_FAILURE,
  PATIENT_WAITINGLIST_REQUEST,
  PATIENT_WAITINGLIST_SUCCESS,
  PATIENT_WAITINGLIST_FAILURE,
} from "../type";

export const doctorReducer = (state = { doctor: [] }, action) => {
  switch (action.type) {
    case ONLINE_DOCTOR_LIST_REQUEST:
      return {
        //   loading: true,
        doctor: [],
      };
    case ONLINE_DOCTOR_LIST_SUCCESS:
      return {
        //   loading: false,
        doctor: action.payload,
      };
    case ONLINE_DOCTOR_LIST_FAILURE:
      return {
        //   loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};

// export const allDoctorReducer = (state = { doctor: [] }, action) => {
//     switch (action.type) {
//       case ONLINE_DOCTOR_LIST_REQUEST:
//         return {
//           //   loading: true,
//           doctor: [],
//         };
//       case ONLINE_DOCTOR_LIST_SUCCESS:
//         return {
//           //   loading: false,
//           doctor: action.payload,
//         };
//       case ONLINE_DOCTOR_LIST_FAILURE:
//         return {
//           //   loading: false,
//           error: "something problem",
//         };
//       default:
//         return state;
//     }
//   };


export const waitingPatientListReducer = (state = { waitingPatient: [] }, action) => {
  switch (action.type) {
    case PATIENT_WAITINGLIST_REQUEST:
      return {
          loading: true,
        waitingPatient: [],
      };
    case PATIENT_WAITINGLIST_SUCCESS:
      return {
          loading: false,
          waitingPatient: action.payload,
      };
    case PATIENT_WAITINGLIST_FAILURE:
      return {
          loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};