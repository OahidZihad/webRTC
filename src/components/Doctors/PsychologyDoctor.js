import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorAction } from "../../redux/actions/doctorActions";
import DoctorCard from "../Pages/DoctorCard";
import ParticularDoctorCard from "./ParticularDoctorCard";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import logo from "../../media/logo.png";
import Footer from "../Pages/Footer";
import OtpLoader from "../Login/OtpLoader";

const PsychologyDoctor = () => {
  const dispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctor);
  const { doctor, error } = doctorList;
  console.log("doctorList ****", doctor);

  useEffect(() => {
    dispatch(listDoctorAction);
  }, []);

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
      <Container>
        <div className="d-flex justify-content-center">
          {doctor.data?.length ? (
            <div className="doctor-main-container row">
              {doctor.data
                ?.filter((doctors) => doctors.Department === "সাইকোলজি")
                .map((eachDoctor) => {
                  return (
                    <ParticularDoctorCard
                      key={eachDoctor.id}
                      doctors={eachDoctor}
                    />
                  );
                })}
            </div>
          ) : (
            <OtpLoader></OtpLoader>
          )}
        </div>
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default PsychologyDoctor;
