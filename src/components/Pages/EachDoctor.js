import React, { useEffect } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import logo from "../../media/logo.png";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Button } from "react-bootstrap";
import doc_image from "../../media/img_avatar.png";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import "./Landing.css";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorReview,
  listDoctorDetails,
} from "../../redux/actions/doctorDetailAction";
import OtpLoader from "../Login/OtpLoader";

const EachDoctor = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDoctorDetails(id));
  }, []);

  const doctorDetail = useSelector((state) => state.doctorDetails);
  console.log("doctorDetail*", doctorDetail);
  const { doctor } = doctorDetail;
  console.log("doctorDetailss * * *", doctor);

  useEffect(() => {
    dispatch(getDoctorReview(id));
  }, []);
  const doctorReview = useSelector((state) => state.doctorReviewGet);
  const { loading, rating, success } = doctorReview;
  console.log("FEEDBACK*", rating);

  const HandleClickSession = (e) => {
    e.preventDefault();
    history.push(`/DoctorForm/${id}`);
  };
  return (
    <div>
      <div className="headerBox2">
        <Navbar>
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" fluid style={{ height: "80px" }} />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <input
                  type="text"
                  placeholder="এখানে ডাক্তার সার্চ করুন......"
                />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <br />
      <br />
      {doctor.length ? (
        <Container style={{ textAlign: "left" }}>
          <Row>
            <Col md={6} xs={6}>
              <h2>{doctor[0].Name}</h2>
              <p
                style={{
                  fontSize: "18px",
                  marginTop: "-16px",
                }}
              >
                {doctor[0].Designation}
              </p>
              <Stack spacing={1}>
                <Rating
                  style={{
                    marginTop: "-15px",
                    marginLeft: "-3px",
                  }}
                  name="size-small"
                  defaultValue={4.5}
                  size="small"
                  value={doctor[0].Rating}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <p style={{ fontSize: "14px" }}>
                সময়ঃ {doctor[0].Appointment_Time_Range}
              </p>
              <button
                style={{ cursor: "context-menu" }}
                className="charge_fifty"
              >
                চার্জঃ {doctor[0].Fees} টাকা
              </button>
              <h4 className="session_25">(প্রতি সেশনঃ ২৫ মিনিট)</h4>

              <div className="doctor_desc">
                <h5 className="doctor-description">ডাক্তারের বিবরণঃ</h5>
                <p style={{ fontSize: "13px" }}>{doctor[0].Background}</p>
              </div>
              <br />
              <Button
                variant="warning"
                onClick={HandleClickSession}
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  // left: "20%",
                  marginLeft: "30%",
                  height: "42px",
                }}
              >
                সেশন বুক করুন
              </Button>
            </Col>
            <Col md={1} xs={1}></Col>
            <Col md={5} xs={5}>
              <img
                className="each_doctor_image"
                src={doctor[0].Image}
                alt="doctor name"
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <OtpLoader></OtpLoader>
      )}
      <br />
      <Footer />
    </div>
  );
};

export default EachDoctor;
