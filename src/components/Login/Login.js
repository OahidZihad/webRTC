// import React from 'react';
import "./Login.css";
// import "./Register.css"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpLoader from "./OtpLoader";
import Footer from "../../components/Pages/Footer";
import axios from "axios";
import firebase from "./firebase.config";
import { login } from "../../redux/actions/userActions";
import logo from "../../media/logo.png";
import registerImg from "../../media/Group-input.png";
import { useHistory } from "react-router";
import {useLocation } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


  const [numberdisplay, setNumberdisplay] = useState("block");
  const [otpdisplay, setOtpdisplay] = useState("none");
  const [message, setMessage] = useState(
    "The number is not valid number and must use (+88) country code"
  );
  const [number, setNumber] = useState("+88");
  const [otp, setOtp] = useState("");
  const [messageshow, setMessageshow] = useState(false);
  const [otpsuccess, setOtpsuccess] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [afterOtpLoading, setAfterOtpLoading] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [notuser, setnotuser] = useState(false);

  let form_data = new FormData();
  form_data.append("username", `1ds#2d54${number}df15kg2@3456gfh`);
  form_data.append(
    "password",
    "gdfiugh>-fhfgh^&*^5~+!i(mki6y48jk93xem!t2*xdlau-)e=)g8(ad_aghn3eu4^$_ln"
  );

  useEffect(() => {
    if (otpsuccess === true) {
      axios
        .post(
          // "https://www.api-care-box.click/api/token/",
          "https://care-box-backend.herokuapp.com/api/token/",
          form_data
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          //console.log( "this is login:", res.data);
          localStorage.setItem("registerd", "done");
          history.replace(from);
          // if (localStorage.getItem("url")) {
          //   history.push(localStorage.getItem("url"));
          // } else {
          //   history.push("/online-doctor");
          // }
        })
        .catch((err) => console.log("error message:", err));
    }
  }, [history, userInfo, otpsuccess]);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // return new Promise(function (resolve, reject) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          // console.log("Recaptca varified", response);
          // resolve()
          // });
        },
        defaultCountry: "BD",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    if (number.length !== 14) {
      setMessageshow(true);
    } else {
      setMessageshow(false);
      // this is connected from redux and call the register dispatch
      // check whether it is an user or not
      dispatch(login(number));
      if (error === "User not found") {
        setnotuser(true);
        // alert("you are not register in out system")
      } else {
        configureCaptcha();
        const phoneNumber = number;
        // console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // console.log("OTP has been sent");
            setNumberdisplay("none");
            setOtpdisplay("block");
            // ...
          })
          .catch((error) => {
            // Error SMS not sent
            console.log("this is an error", error.message);
          });
      }
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    //console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        //console.log(JSON.stringify(user))
        console.log(user, "User is verified");
        setOtpsuccess(true);
        localStorage.setItem("success", "");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("there is an error ", error);
        alert("Incorrect OTP, Refresh page and send OTP again");
      });
  };

  return (
    <div>
      <div className="registerLogo">
        <img src={logo}></img>
      </div>
      <div className="login_page">
        <div className="pres_container">
          <div className="left_section_pres_login">
            <h1>স্বাগতম,</h1>
            {/* <br/>
            <br/> */}

            {numberdisplay == "block" ? (
              <h4>
                {/* কেয়ার-বক্স অনলাইন ডাক্তার সেবা প্লাটফর্ম এ আপনাকে স্বাগতম, */}
                সেবা নিতে অনুগ্রহ করে আপনার ফোন নাম্বার টি ভেরিফাই করে
                রেজিস্ট্রেশন সম্পূর্ণ করুন........
              </h4>
            ) : (
              <h4>এস এম এস এ প্রদত্ত OTP টি প্রদান করুন.........</h4>
            )}

            {/* <h4>এস এম এস এ প্রদত্ত OTP টি প্রদান করুন........</h4> */}
            <img src={registerImg} />
          </div>
          <div className="right_section_pres">
            <form
              onSubmit={onSignInSubmit}
              style={{ display: `${numberdisplay}` }}
            >
              <h4>মোবাইল নাম্বার:</h4>
              <div id="sign-in-button"></div>
              <input
                style={{ opacity: "35%" }}
                type="text"
                name="mobile"
                required
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
              <br />

              {/* <h4>রোগীর নাম:</h4>
              <input
                style={{ opacity: "35%" }}
                type="text"
                name="mobile"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <br></br> */}

              {otpLoading ? <OtpLoader /> : <h4></h4>}
              <div id="recaptcha-container"></div>
              <button
                className="registerButton"
                type="submit"
                onClick={() => setOtpLoading(true)}
              >
                ভেরিফাই করুন
              </button>
            </form>
            <br></br>

            <form onSubmit={onSubmitOTP} style={{ display: `${otpdisplay}` }}>
              <h4 className="otp_text">OTP</h4>
              <input
                style={{ opacity: "35%" }}
                type="text"
                name="otp"
                required
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <br />
              {afterOtpLoading ? <OtpLoader /> : <h4></h4>}
              <button
                className="registerButton"
                type="submit"
                onClick={() => setAfterOtpLoading(true)}
              >
                যাচাই করুন
              </button>
            </form>
            <br></br>
            {messageshow ? (
              <p
                style={{
                  color: "#CC0A61",
                  textAlign: "left",
                  paddingRight: "23%",
                }}
              >
                {message}
              </p>
            ) : (
              <p></p>
            )}
            <label></label>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
