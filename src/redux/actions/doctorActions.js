import axios from "axios";
import {
  ONLINE_DOCTOR_LIST_REQUEST,
  ONLINE_DOCTOR_LIST_SUCCESS,
  ONLINE_DOCTOR_LIST_FAILURE,
  PATIENT_WAITINGLIST_REQUEST,
  PATIENT_WAITINGLIST_SUCCESS,
  PATIENT_WAITINGLIST_FAILURE,
} from "../type";

export const listDoctorAction = async (dispatch) => {
  try {
    dispatch({
      type: ONLINE_DOCTOR_LIST_REQUEST,
    });
    const data = await axios.get(
      "https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_list/"
    );
    // const data = await fetch("https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_list/", {
    //   method:"GET",
    //   // headers: {"content-type":"application/json"},
    //   body:JSON.stringify()
    // }).then(response => response.json())

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

export const waitingPatientList = async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_WAITINGLIST_REQUEST,
    });
    const {data} = await axios.get(
      "https://care-box-backend.herokuapp.com/api/v2/Online_Doctor_Booking/doctorAppointments/",{
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Custom-User-Agent":
            "15!@ejh46)(*%#!@s4h68a4rgsagH&^%%$#@!JKFKVYRDTgjsgakjzghfjJ%$#@#%HFYD32434",
        },
      }
    );
    // const data = await fetch("https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_list/", {
    //   method:"GET",
    //   // headers: {"content-type":"application/json"},
    //   body:JSON.stringify()
    // }).then(response => response.json())

    dispatch({
      type: PATIENT_WAITINGLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_WAITINGLIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


