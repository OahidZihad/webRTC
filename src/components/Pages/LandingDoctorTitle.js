import React from "react";
import { Dropdown, Container, Row, Col } from "react-bootstrap";
import "./Landing.css";
import { useHistory } from "react-router-dom";

const LandingDoctorTitle = () => {
  const history = useHistory();
  return (
    <>
      <br />
      <div className="doctorlist">
        <h3>ডাক্তারের তালিকা সমূহ</h3>
      </div>
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Dropdown className="doctorDivision">
              <Dropdown.Toggle variant="Danger" id="dropdown-basic">
                ডাক্তারের বিভাগ নির্ধারণ করুন
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push("/medicine")}>
                  মেডিসিন
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/Pediatrician")}>
                  শিশুরোগ বিশেষজ্ঞ
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/psychology")}>
                  সাইকোলজি
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/gynae")}>
                  স্ত্রীরোগ বিশেষজ্ঞ
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}></Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingDoctorTitle;
