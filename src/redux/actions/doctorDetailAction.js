import axios from "axios";
import {
  ONLINE_DOCTOR_DETAIL_REQUEST,
  ONLINE_DOCTOR_DETAIL_SUCCESS,
  ONLINE_DOCTOR_DETAIL_FAILURE,
  DOCTOR_CREATE_REVIEW_REQUEST,
  DOCTOR_CREATE_REVIEW_SUCCESS,
  DOCTOR_CREATE_REVIEW_FAILURE,
  DOCTOR_GET_REVIEW_REQUEST,
  DOCTOR_GET_REVIEW_SUCCESS,
  DOCTOR_GET_REVIEW_FAILURE,
  DOCTOR_CREATE_APPOINTMENT_REQUEST,
  DOCTOR_CREATE_APPOINTMENT_SUCCESS,
  DOCTOR_CREATE_APPOINTMENT_FAILURE,
} from "../type";

export const listDoctorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ONLINE_DOCTOR_DETAIL_REQUEST });
    const { data } = await axios.get(
      `https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_detail/${id}`
    );
    dispatch({
      type: ONLINE_DOCTOR_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ONLINE_DOCTOR_DETAIL_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createDoctorReview =
  (id, rate, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_CREATE_REVIEW_REQUEST,
      });
      // console.log("id",id);
      // console.log("rate",rate);
      // console.log('comment',comment);

      let form_data = new FormData();
      form_data.append("Doctor_Profile", id);
      form_data.append("Review_Description", comment);
      form_data.append("Rating", rate);
      //console.log(`Bearer ${localStorage.getItem('access_token')}`)
      const config = {
        headers: {
          "Custom-User-Agent":
            "15!@ejh46)(*%#!@s4h68a4rgsagH&^%%$#@!JKFKVYRDTgjsgakjzghfjJ%$#@#%HFYD32434",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };

      await axios.post(
        "https://care-box-backend.herokuapp.com/api/v2/live_doctor/post_doctor_review/",
        form_data,
        config
      );

      dispatch({
        type: DOCTOR_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      // if (message === 'Not authorized, token failed') {
      //   // dispatch(logout())
      // }
      dispatch({
        type: DOCTOR_CREATE_REVIEW_FAILURE,
        payload: message,
      });
    }
  };

export const getDoctorReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_GET_REVIEW_REQUEST,
    });
    console.log("id", id);
    // console.log("rate",rate);
    // console.log('comment',comment);

    let form_data = new FormData();
    form_data.append("id", id);
    // form_data.append('Review_Description', comment);
    // form_data.append('Rating', rate);
    //console.log(`Bearer ${localStorage.getItem('access_token')}`)
    // const config = {
    //   headers: {
    //     'Custom-User-Agent': '15!@ejh46)(*%#!@s4h68a4rgsagH&^%%$#@!JKFKVYRDTgjsgakjzghfjJ%$#@#%HFYD32434',
    //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //   },
    // }

    const { data } = await axios.get(
      `https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_review/?id=${id}`,
      form_data
      // config
    );

    dispatch({
      type: DOCTOR_GET_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === 'Not authorized, token failed') {
    //   // dispatch(logout())
    // }
    dispatch({
      type: DOCTOR_GET_REVIEW_FAILURE,
      payload: message,
    });
  }
};

export const createDoctorAppointment =
  (
    patientName,
    patientPhone,
    patientAge,
    patientGender,
    docID,
    patientHealthIssue,
    patientPrescription
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_CREATE_APPOINTMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const formData = new FormData();
      formData.append("Patient_Name", patientName);
      formData.append("Patient_Phone", patientPhone);
      formData.append("Patient_Age", patientAge);
      formData.append("Patient_Gender", patientGender);
      formData.append("Doctor", docID);
      formData.append("Health_Issue", patientHealthIssue);
      formData.append("Report_or_Prescription", patientPrescription);

      let url =
        "https://care-box-backend.herokuapp.com/api/v2/Online_Doctor_Booking/postDoctorAppointment/";

      const { data } = await axios.post(url, formData, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          // "Custom-User-Agent":
          //   "15!@ejh46)(*%#!@s4h68a4rgsagH&^%%$#@!JKFKVYRDTgjsgakjzghfjJ%$#@#%HFYD32434",
          // media_type: "multipart/form-data",
          // "content-type": "application/x-www-form-urlencoded",
        },
      });

      dispatch({
        type: DOCTOR_CREATE_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
        console.log("Not authorized, token failed");
      }
      dispatch({
        type: DOCTOR_CREATE_APPOINTMENT_FAILURE,
        payload: message,
      });
    }
  };
