import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpLoader from "./OtpLoader";
import "./Register.css";
import Footer from "../Pages/Footer";
import registerImg from "../../media/Group-input.png";
import logo from "../../media/logo.png";
import firebase from "./firebase.config";
import { register } from "../../redux/actions/userActions";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  const [numberdisplay, setNumberdisplay] = useState("block");
  const [otpdisplay, setOtpdisplay] = useState("none");
  const [message, setMessage] = useState(
    "The number is not valid number and must use (+88) country code"
  );
  const [number, setNumber] = useState("+88");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [messageshow, setMessageshow] = useState(false);
  const [otpsuccess, setOtpsuccess] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [afterOtpLoading, setAfterOtpLoading] = useState(false);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  console.log("***userRegister****", userRegister);

  let form_data = new FormData();
  form_data.append("username", `1ds#2d54${number}df15kg2@3456gfh`);
  form_data.append(
    "password",
    "gdfiugh>-fhfgh^&*^5~+!i(mki6y48jk93xem!t2*xdlau-)e=)g8(ad_aghn3eu4^$_ln"
  );

  console.log("form_data******", form_data);

  useEffect(() => {
    if (otpsuccess === true) {
      axios
        .post(
          //   "https://www.api-care-box.click/api/token/",
          "https://care-box-backend.herokuapp.com/api/token/",
          form_data
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          //console.log( "this is login:", res.data);
          localStorage.setItem("registerd", "done");
          if (localStorage.getItem("url")) {
            history.push(localStorage.getItem("url"));
          } else {
            history.push("/online-doctor");
          }
          //history.push("/profile");
        })
        .catch((err) => console.log(err));
    }
  }, [history, userInfo, otpsuccess]);

  if (userInfo) {
    console.log(userInfo);
  }

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          // console.log("Recaptca varified")
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
      dispatch(register(username, number));
      loading ? <OtpLoader></OtpLoader> : configureCaptcha();
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
          console.log("this is an error");
        });
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        //console.log(JSON.stringify(user))
        console.log("User is verified");
        setOtpsuccess(true);
        localStorage.setItem("success", "");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
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
          <div className="left_section_pres">
            {/* <h1>Hi,</h1> */}
            <h1>স্বাগতম,</h1>
            {/* <br/>
            <br/> */}

            {numberdisplay == "block" ? (
              <h4>অনুগ্রহ করে আপনার নাম লিখুন......</h4>
            ) : (
              <h4>এস এম এস এ প্রদত্ত OTP টি প্রদান করুন.........</h4>
            )}

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

              <h4>রোগীর নাম:</h4>
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
              <br></br>

              {otpLoading ? <OtpLoader /> : <h4></h4>}
              <div id="recaptcha-container"></div>
              <button
                className="registerButton"
                type="submit"
                onClick={() => setOtpLoading(true)}
              >
                প্রবেশ করুন
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

export default Register;
