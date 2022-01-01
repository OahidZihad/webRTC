import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  DOCTOR_APPLY_REGISTRATION_REQUEST,
  DOCTOR_APPLY_REGISTRATION_SUCCESS,
  DOCTOR_APPLY_REGISTRATION_FAIL,
} from "../type";

export const createDoctor =
  (
    userId,
    name,
    phone,
    email,
    nid,
    degree,
    bmdc,
    speciality,
    time,
    week,
    amount
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_APPLY_REGISTRATION_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const formData = new FormData();
      formData.append("user", userId);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("national_id", nid);
      formData.append("eductional_expericence", degree);
      formData.append("bmdc_number", bmdc);
      formData.append("expertise", speciality);
      formData.append("time_table", time);
      formData.append("dayfor_treatment", week);
      formData.append("amount", amount);

      // formData.append("user", 1);
      // formData.append("name", "Oahid");
      // formData.append("phone", "01752746973");
      // formData.append("email", "oahidzihad1@gmail.com");
      // formData.append("national_id", "5435435443535");
      // formData.append("eductional_expericence", "CSE");
      // formData.append("bmdc_number", "54547");
      // formData.append("expertise", "Web Development");
      // formData.append("time_table", "10.10AM");
      // formData.append("dayfor_treatment", "Sunday");
      // formData.append("amount", 150);

      let url =
        "https://care-box-backend.herokuapp.com/api/v2/Doctor_CARRIER/doc_registration/";

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
        type: DOCTOR_APPLY_REGISTRATION_SUCCESS,
        payload: data,
      });

      if (
        userId &&
        name &&
        phone &&
        email &&
        nid &&
        degree &&
        bmdc &&
        speciality &&
        time &&
        week &&
        amount
      ) {
        localStorage.setItem("ssl", "doctor_applied");
        window.location.href = "/PaymentLoading";
      }
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
        type: DOCTOR_APPLY_REGISTRATION_FAIL,
        payload: message,
      });
    }
  };
