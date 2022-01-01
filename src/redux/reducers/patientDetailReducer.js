import axios from "axios";
import {
  PATIENT_GET_USERVIEW_REQUEST,
  PATIENT_GET_USERVIEW_SUCCESS,
  PATIENT_GET_USERVIEW_FAILURE,
} from "../type";

export const getPatientViewReducer = (state = { patientView: [] }, action) => {
    switch (action.type) {
      case PATIENT_GET_USERVIEW_REQUEST:
        return {
            loading: true,
          patientView: [],
        };
      case PATIENT_GET_USERVIEW_SUCCESS:
        return {
            loading: false,
            patientView: action.payload,
        };
      case PATIENT_GET_USERVIEW_FAILURE:
        return {
            loading: false,
          error: "something problem",
        };
      default:
        return state;
    }
  };