import { useEffect } from "react";
import axios from "axios";
import React from "react";
import Loader from "../Pages/Loader";
import "./payment.css";
import logo from "../../media/logo.png"

const PaymentLoading = () => {
  useEffect(() => {
    if (localStorage.getItem("ssl") === "doctor_applied") {
      axios
        .get(
          "https://care-box-backend.herokuapp.com/api/v2/Doctor_CARRIER/payment_request/",
          // 'https://care-box-backend.herokuapp.com/api/v1/payment/payment_request/',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          // should be change in here
          console.log("url:", res.data.message);
          if (res.data.message) {
            if (window.confirm(res.data.message)) {
              window.location.href = "/profile";
            } else {
              window.location.href = "/profile";
            }
          } else {
            window.location.href = res.data;
          }
        })
        .catch((err) => console.log("an issue"));
    }
  }, [localStorage.getItem("ssl")]);
  return (
    <div>
      <br />
      <img
        src={logo}
        alt="logo"
        className="loading_logo"
        style={{ height: "100px" }}
      />
      <br />
      {/* <br /> */}
      <Loader />
      <h3 style={{ textAlign: "center", color: "#CC0A61", fontFamily:"poppins", fontWeight:"bold" }}>
        Your order is shifting into payment getway.
      </h3>
    </div>
  );
};

export default PaymentLoading;
