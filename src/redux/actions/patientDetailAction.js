import axios from "axios";
import {
  PATIENT_GET_USERVIEW_REQUEST,
  PATIENT_GET_USERVIEW_SUCCESS,
  PATIENT_GET_USERVIEW_FAILURE,
} from "../type";

export const getPatientView = async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_GET_USERVIEW_REQUEST,
    });
    const { data } = await axios.get(
      "https://care-box-backend.herokuapp.com/api/v2/Patient_profile/Patientuserview/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    // const data = await fetch("https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_list/", {
    //   method:"GET",
    //   // headers: {"content-type":"application/json"},
    //   body:JSON.stringify()
    // }).then(response => response.json())

    dispatch({
      type: PATIENT_GET_USERVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_GET_USERVIEW_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
