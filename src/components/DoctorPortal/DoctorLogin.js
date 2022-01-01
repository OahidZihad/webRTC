import React, { useState } from "react";
import { Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";
import logo from "../../media/logo.png";
import doctorRegImage2 from "../../media/doctorRegImage2.png";
import Footer from "../Pages/Footer";
import { useHistory } from "react-router-dom";

const DoctorLogin = () => {
    const history = useHistory()
  const [name, setName] = useState("");
  console.log(name);
  const [password, setPassword] = useState("");
  console.log(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleDoctorLogin = ()=>{
      history.push('/patientWaitingList')
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
      <br></br>
      <br></br>

      <div className="doctor_portal_login">
        <h3>ডাক্তার পোর্টাল</h3>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="d-flex justify-content-center">
        <div className="col-md-3">
        <div className="doctor_login_card_container">
            <div className="doctor_login_card_content">
              <img
                style={{ marginTop: "20px", marginBottom: "8px" }}
                src={doctorRegImage2}
              ></img>
              <form onSubmit={handleSubmit}>
                <h5 style={{textAlign:"left", marginLeft:"30px"}}>ডাক্তারের নামঃ</h5>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h5 style={{textAlign:"left", marginLeft:"30px", marginTop:"20px"}}>পাসওয়ার্ডঃ</h5>
                <input
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <Button
                  variant="warning"
                  type="submit"
                  onClick={handleDoctorLogin}
                >
                  লগইন করুন
                </Button>
              </form>
              <p className="doctor_forget_password">পাসওয়ার্ড ভুলে গিয়েছেন?</p>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
};

export default DoctorLogin;
