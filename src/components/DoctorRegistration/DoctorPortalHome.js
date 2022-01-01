import React from "react";
import { Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";
import logo from "../../media/logo.png";
import doctorRegImage from "../../media/doctorRegImage.png";
import doctorRegImage2 from "../../media/doctorRegImage2.png";
import Footer from "../Pages/Footer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorPortalHome = () => {
  const history = useHistory()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  const doctorRegHandler = () =>{
    // if(userInfo == null){
    //   history.push('/login')
    // }else{
      history.push('/doctorRegistrationForm')
    // }
  }
  return (
    <div>
      <div className="headerBox_doctor_portal_home">
        <Navbar>
          <Container>
            <Navbar.Brand>
              <img
                // onClick={() => history.push("/")}
                style={{ cursor: "pointer" }}
                className="landingLogo"
                src={logo}
                alt="logo"
                fluid
                style={{ height: "90px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Container>
        </Navbar>
      </div>
      <br></br>

      <div className="doctor_home">
        <div>
          <img className="doctor_home_img" src={doctorRegImage}></img>
        </div>
        <div className="doctor_reg_card">
          <div className="doctor_reg_card_container">
            <div className="doctor_reg_card_content">
              <img
                style={{ marginTop: "20px", marginBottom: "8px" }}
                src={doctorRegImage2}
              ></img>
              <p style={{fontSize: "18px"}}>
                অনলাইনে ডাক্তার সেবা দিতে আজই <br />
                যুক্ত হন কেয়ার-বক্সের সাথে।
              </p>
              <Button style={{ fontSize: "20px" }} variant="warning" onClick={doctorRegHandler}>
              নিবন্ধন করুন
              </Button>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <div className="doctor_benefit">
        <h3>ডাক্তারের তালিকা সমূহ</h3>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <section className="d-flex justify-content-center">
        <div className="w-75 row">
          <div className="col-md-4">
            <div className="col-md-10">
              <div className="doctor_reg_card_container">
                <div className="doctor_reg_card_content">
                  <img
                    style={{ marginTop: "20px", marginBottom: "8px" }}
                    src={doctorRegImage2}
                  ></img>
                  <p>
                    অনলাইনে ডাক্তার সেবা দিতে আজই <br />
                    যুক্ত হন কেয়ার-বক্সের সাথে।
                  </p>
                  <Button style={{ fontWeight: "bold" }} variant="warning">
                    রেজিস্টার করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="col-md-10">
              <div className="doctor_reg_card_container">
                <div className="doctor_reg_card_content">
                  <img
                    style={{ marginTop: "20px", marginBottom: "8px" }}
                    src={doctorRegImage2}
                  ></img>
                  <p>
                    অনলাইনে ডাক্তার সেবা দিতে আজই <br />
                    যুক্ত হন কেয়ার-বক্সের সাথে।
                  </p>
                  <Button style={{ fontWeight: "bold" }} variant="warning">
                    রেজিস্টার করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="col-md-10">
              <div className="doctor_reg_card_container">
                <div className="doctor_reg_card_content">
                  <img
                    style={{ marginTop: "20px", marginBottom: "8px" }}
                    src={doctorRegImage2}
                  ></img>
                  <p>
                    অনলাইনে ডাক্তার সেবা দিতে আজই <br />
                    যুক্ত হন কেয়ার-বক্সের সাথে।
                  </p>
                  <Button style={{ fontWeight: "bold" }} variant="warning">
                    রেজিস্টার করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
};

export default DoctorPortalHome;
