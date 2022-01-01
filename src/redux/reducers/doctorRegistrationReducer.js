import {
  DOCTOR_APPLY_REGISTRATION_REQUEST,
  DOCTOR_APPLY_REGISTRATION_SUCCESS,
  DOCTOR_APPLY_REGISTRATION_FAIL,
} from "../type";

export const createDoctorReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_APPLY_REGISTRATION_REQUEST:
      return {
        //   loading: true,
        doctorReg: [],
      };
    case DOCTOR_APPLY_REGISTRATION_SUCCESS:
      return {
        //   loading: false,
        //   success: true,
        doctorReg: action.payload,
      };
    case DOCTOR_APPLY_REGISTRATION_FAIL:
      return {
        // loading: false,
        error: "something problem",
      };
    default:
      return state;
  }
};
