import React, { useEffect, useState } from "react";
import { Navbar, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Footer from "./Footer";
import Stack from "@mui/material/Stack";
import logo from "../../media/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctorAppointment,
  listDoctorDetails,
} from "../../redux/actions/doctorDetailAction";
import OtpLoader from "../Login/OtpLoader";
import ReviewModal from "./ReviewModal";
import { getPatientView } from "../../redux/actions/patientDetailAction";

const DoctorForm = (props) => {
  // const {Image, Name, Designation, Department, Appointment_Time_Range, Fees, Background} = props.formDoctor;
  // console.log("props", props);

  const { id } = useParams();

  const [patientName, setPatientName] = useState("");
  console.log(patientName);
  const [patientPhone, setPatientPhone] = useState("");
  console.log(patientPhone);
  const [patientAge, setPatientAge] = useState("");
  console.log(patientAge);
  const [patientGender, setPatientGender] = useState("");
  console.log(patientGender);
  const [patientHealthIssue, setPatientHealthIssue] = useState("");
  console.log(patientHealthIssue);
  const [patientPrescription, setPatientPrescription] = useState(null);
  console.log(patientPrescription);

  const dispatch = useDispatch();
  const doctorDetail = useSelector((state) => state.doctorDetails);
  const { doctor } = doctorDetail;
  console.log("doctorDetailss * * *", doctor);

  // const userDetails = useSelector((state) => state.userDetails);
  // const { user } = userDetails;
  // const userId = user.id;
  // console.log('user',user);

  useEffect(() => {
    dispatch(listDoctorDetails(id));
  }, []);

  const patientDetails = useSelector((state) => state.patientViewGet);
  const { loading, patientView, error } = patientDetails;
  console.log(patientView);

  useEffect(() => {
    dispatch(getPatientView);
  }, []);

  const history = useHistory();
  const HandleClickSession = (e) => {
    e.preventDefault();
    history.push("/countdown");
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    const docID = doctor[0].id;
    console.log("docID", docID);
    e.preventDefault();
    dispatch(
      createDoctorAppointment(
        patientName,
        patientPhone,
        patientAge,
        patientGender,
        docID,
        patientHealthIssue,
        patientPrescription
      )
    );
  };

  const postDoctorAppointment = useSelector(
    (state) => state.createDoctorAppointment
  );
  // console.log("postDoctorAppointment", postDoctorAppointment.doctorAppointment?.message)

  if (
    postDoctorAppointment.doctorAppointment?.message ===
    "Session booked successfully"
  ) {
    history.push("/countdown");
  } else {
  }

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setPatientPrescription(newFile);
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
                <p style={{ fontWeight: "900" }}>স্বাগতম, {patientView.Name}</p>
                {/* <p style={{ fontWeight: "900" }}>স্বাগতম, {patientView.Name}</p> */}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <br />
      <br />
      <br />
      <div>
        <Container>
          <Row>
            <Col className="online_appinment_form" xs={6} md={4}>
              <Form onSubmit={handleSubmit}>
                <h3>ফরম পূরণ করুনঃ</h3>
                <br />
                <h4>রোগীর নাম:</h4>
                <input
                  type="text"
                  placeholder=""
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  // required
                  // style={{
                  //   backgroundImage: "linear-gradient(#090610, #701657)",
                  //   color: "#fff",
                  //   opacity: "62%",
                  // }}
                />
                <br />
                <h4>মোবাইল নাম্বার:</h4>
                <input
                  type="text"
                  placeholder=""
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  // required
                  // style={{
                  //   backgroundImage: "linear-gradient(#090610, #701657)",
                  //   color: "#fff",
                  //   opacity: "62%",
                  // }}
                />
                <br />
                <h4>রোগীর বয়স:</h4>
                <input
                  type="text"
                  placeholder=""
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  // required
                  // style={{
                  //   backgroundImage: "linear-gradient(#090610, #701657)",
                  //   color: "#fff",
                  //   opacity: "62%",
                  // }}
                />
                <br />

                <h4>আপনি কি পুরুষ/মহিলা/অন্যান্য: </h4>
                <div className="form-check form-check-inline">
                  <input
                    name="group1"
                    id="Male"
                    type="radio"
                    className="form-check-input"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.id)}
                  />
                  <label title className="form-check-label">
                    পুরুষ
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="group1"
                    id="Female"
                    type="radio"
                    className="form-check-input"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.id)}
                  />
                  <label title className="form-check-label">
                    মহিলা
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="group1"
                    id="Other"
                    type="radio"
                    className="form-check-input"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.id)}
                  />
                  <label title className="form-check-label">
                    অন্যান্য
                  </label>
                </div>

                <br />
                <h4>সমস্যার বিবরণ:</h4>
                <textarea
                  name=""
                  id=""
                  rows="3"
                  value={patientHealthIssue}
                  onChange={(e) => setPatientHealthIssue(e.target.value)}
                  // required
                ></textarea>
                <br />
                <h4>প্রেসক্রিপশন/ রিপোর্ট আপলোড করুনঃ</h4>
                <label class="custom-file-upload">
                  <input
                    type="file"
                    // value={patientPrescription}
                    onChange={handleFileChange}
                  />
                  আপলোড
                </label>
                <br />
                <br />
                <Button
                  variant="warning"
                  // onClick={HandleClickSession}
                  type="submit"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    left: "20%",
                    marginLeft: "30%",
                  }}
                >
                  সেশন বুক করুন
                </Button>
              </Form>
            </Col>
            <Col xs={2} md={4}></Col>
            {doctor.length ? (
              <Col style={{ textAlign: "left" }} xs={4} md={4}>
                <br />
                <div>
                  <img
                    className="each_doctor_image"
                    src={doctor[0].Image}
                    alt="doctor name"
                  />
                </div>
                <br />
                <h2 style={{ fontSize: "25px" }}>{doctor[0].Name}</h2>
                <p style={{ fontSize: "15px", marginBottom: "0rem" }}>
                  {doctor[0].Designation}
                </p>

                <Stack spacing={1}>
                  <Rating
                    style={{
                      // marginTop: "-15px",
                      marginLeft: "-3px",
                    }}
                    name="size-small"
                    // defaultValue={4.5}
                    // precision={0.5}
                    value={doctor[0].Rating}
                    size="small"
                    readOnly
                  />
                </Stack>
                <p style={{ fontSize: "15px" }}>
                  সময়ঃ{" "}
                  <span style={{ fontSize: "12px" }}>
                    {doctor[0].Appointment_Time_Range}
                  </span>
                </p>
                <button className="charge_fifty">
                  চার্জঃ {doctor[0].Fees} টাকা
                </button>
                <h4 className="session_25">(প্রতি সেশনঃ ২৫ মিনিট)</h4>
                <button onClick={openModal}>Rate the Doctor</button>
                <ReviewModal
                  modalIsOpen={modalIsOpen}
                  closeModal={closeModal}
                ></ReviewModal>
                <br />
              </Col>
            ) : (
              <OtpLoader></OtpLoader>
            )}
          </Row>
        </Container>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default DoctorForm;
