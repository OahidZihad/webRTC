import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import logo from "../../media/logo.png";
import banner from "../../media/cover-01.png";
import "./Landing.css";
import { useHistory } from "react-router";

const HeaderBox = () => {
  const history = useHistory();
  return (
    <div className="headerBox">
      <Navbar>
        <Container>
          <Navbar.Brand
          // href="/"
          >
            <img
              onClick={() => history.push("/")}
              style={{cursor: "pointer"}}
              className="landingLogo"
              src={logo}
              alt="logo"
              fluid
              style={{ height: "90px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <input type="text" placeholder="এখানে ডাক্তার সার্চ করুন......" />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <img src={logo} alt="logo" style={{ height: "80px" }} /> */}
      {/* <Navbar/> */}
      {/* <img src={banner} alt="banner" fluid style={{ width: "100%", zIndex:"-1" }} /> */}
    </div>
  );
};

export default HeaderBox;
