import React from "react";
import "./Landing.css";

import ssl2 from "../../Assets/ssl2.jpg";
import facebook from "../../Assets/facebook.png";
import instagram from "../../Assets/instagram.png";
import whatsapp from "../../Assets/whatsapp.png";
import email from "../../Assets/email.png";
import { useHistory } from "react-router-dom";

const Footer = () => {
    const history = useHistory()
  return (
    // <div>
    //   <div className="footer">
        <>
          <div className="container8_full_width">
            <div className="container8">
              <div></div>
              <div style={{textAlign:"left" }}>
                <p>Find Us</p>
                <div className="social-icon">
                  <a href="https://www.facebook.com/careboxlimited">
                    <img src={facebook} />
                  </a>
                  <a href="#">
                    <img src={whatsapp} />
                  </a>
                  <a href="https://www.instagram.com/careboxlimited/">
                    <img src={instagram} />
                  </a>
                  <a href="mailto:my@care-box.com">
                    <img src={email} />
                  </a>
                </div>
              </div>

              <div>
                <p style={{ textAlign:"left" }}>Address</p>
                <h6 style={{ paddingRight: "20px", textAlign:"left" }}>
                  149/A Monipuri Para, (Ground Floor) Airport Road, Farmgate,
                  Tejgaon, Dhaka-1215, Bangladesh
                </h6>
              </div>

              <div className="serial-tag">
                <p>About</p>
                {/* <br></br> */}
                <h6
                  onClick={() => history.push("/about-us")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  About Us
                </h6>
                <h6
                  onClick={() => history.push("/career")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Career
                </h6>
                <h6
                  onClick={() => history.push("/doctorPortalHome")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Doctor Apply
                </h6>
                <h6
                  onClick={() => history.push("/doctorLogin")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Doctor Login
                </h6>
               
                <h6
                  onClick={() => history.push("/privacy-policy")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Privacy Policy
                </h6>
                <h6
                  onClick={() => history.push("/return-policy")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Return Policy
                </h6>
                <h6
                  onClick={() => history.push("/terms-condition")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    whiteSpace: "nowrap",
                  }}
                >
                  Terms and Conditions
                </h6>
                <a href="https://www.care-box.tech/" target="_blank">
                  <h6
                    // onClick={tech}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      whiteSpace: "nowrap",
                      color: "white",
                    }}
                  >
                    Care-Box Tech Solutions
                  </h6>
                </a>
                
              </div>

              <div className="POD">
                <p style={{textAlign:"left"}}>Payment Methods</p>
                <img src={ssl2} />
              </div>
              <div></div>
            </div>
            <div className="rights" style={{ lineHeight: "1px" }}>
              <h5>Trade License No: 289236</h5>
              <p style={{fontSize:"14px"}}>
                All rights reserved by @ Care-Box Limited,{" "}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </>
    //   </div>
    // </div>
  );
};

export default Footer;
