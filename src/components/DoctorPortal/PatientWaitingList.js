import React, { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../../media/logo.png";
import dropDownIcon from "../../media/dropdown-icon.png";
import Footer from "../Pages/Footer";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { waitingPatientList } from "../../redux/actions/doctorActions";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import FileCopyIcon from "@mui/icons-material/FileCopy";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    backgroundColor: "#D2D2D2",
    // color:
    //   theme.palette.mode === "light"
    //     ? "rgb(55, 65, 81)"
    //     : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      // paddingLeft: "-10px",
      // paddingRight:"-30px",
      paddingTop: "7px",
      paddingBottom: "0px",
    },
    // "& .MuiMenuItem-root": {
    //   "& .MuiSvgIcon-root": {
    //     fontSize: 18,
    //     color: theme.palette.text.secondary,
    //     marginRight: theme.spacing(1.5),
    //   },
    // "&:active": {
    //   backgroundColor: alpha(
    //     theme.palette.primary.main,
    //     theme.palette.action.selectedOpacity
    //   ),
    // },
    // },
  },
}));

const PatientWaitingList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();

  const dispatch = useDispatch();
  const patientList = useSelector((state) => state.waitingPatientList);
  const { loading, waitingPatient } = patientList;
  console.log("waitingPatient****", waitingPatient);

  useEffect(() => {
    dispatch(waitingPatientList);
  }, []);

  // useEffect(()=>{
  //   fetch('https://care-box-backend.herokuapp.com/api/v2/Online_Doctor_Booking/doctorAppointments/',{
  //     headers: {
  //       // "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       "Custom-User-Agent":
  //         "15!@ejh46)(*%#!@s4h68a4rgsagH&^%%$#@!JKFKVYRDTgjsgakjzghfjJ%$#@#%HFYD32434",
  //     },
  //   }).then(response=>response.json()).then(data=>console.log("patient info", data))
  // },[])

  return (
    <div>
      <div className="headerBox2">
        <Navbar>
          <Container>
            <Navbar.Brand>
              <img
                src={logo}
                onClick={() => history.push("/")}
                alt="logo"
                fluid
                style={{ height: "80px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  স্বাগতম, সিফাত{" "}
                  <img
                    src={dropDownIcon}
                    alt="dropdown"
                    style={{ height: "17px", marginTop: "-5px" }}
                    fluid
                    // id="demo-customized-button"
                    // aria-controls="demo-customized-menu"
                    // aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    // variant="contained"
                    // disableElevation
                    onClick={handleClick}
                  />
                  <StyledMenu
                    className="dropdown_container"
                    // elevation={0}
                    // anchorOrigin={{
                    //   vertical: "bottom",
                    //   horizontal: "center",
                    // }}
                    // transformOrigin={{
                    //   vertical: "top",
                    //   horizontal: "right",
                    // }}
                    // id="demo-customized-menu"
                    // MenuListProps={{
                    //   "aria-labelledby": "demo-customized-button",
                    // }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      {/* <EditIcon /> */}
                      <button className="menu_button">প্রোফাইল</button>
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      {/* <FileCopyIcon /> */}
                      <button className="menu_button">ড্যাশবোর্ড</button>
                    </MenuItem>
                    {/* <Divider sx={{ my: 0.5 }} /> */}
                    <MenuItem onClick={handleClose} disableRipple>
                      {/* <ArchiveIcon /> */}
                      <button className="menu_button">অপেক্ষমান রোগী</button>
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      {/* <MoreHorizIcon /> */}
                      <button
                        onClick={() => history.push("/treatmentDescription")}
                        className="menu_button"
                      >
                        প্রদত্ত সেবার ডাটা
                      </button>
                    </MenuItem>
                  </StyledMenu>
                </p>
                {/* <Button
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  // endIcon={<KeyboardArrowDownIcon />}
                >
                  Options
                </Button> */}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <br></br>
      <br></br>

      <div className="doctor_portal_login">
        <h3>ডাক্তার পোর্টাল</h3>
      </div>

      <br></br>
      <br></br>
      <br></br>

      <div className="d-flex justify-content-center">
        <div className="col-md-9">
          <h6 style={{ textAlign: "left", fontWeight: "bold" }}>
            অপেক্ষমান রোগীর তালিকা
          </h6>
          <div className="patient_waitingList_card_container">
            <div className="patient_waitingList_card_content">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center treatment_desc_header">
                  <div className="col-md-1">
                    <h6>সেশন আইডি</h6>
                  </div>
                  <div className="col-md-2">
                    <h6>রোগীর নাম</h6>
                  </div>
                  <div className="col-md-2">
                    <h6>সমস্যার বিবরণ</h6>
                  </div>
                  <div className="col-md-2">
                    <h6>তারিখ এবং সময়</h6>
                  </div>
                  <div className="col-md-4">
                    <h6>অ্যাকশন</h6>
                  </div>
                </div>
              </div>
              {waitingPatient.message ? (
                <div className="waitingList_info_container">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-md-12 mt-2">
                        <h3>আপাতত রোগীর সংখ্যা শূন্য. . .</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {waitingPatient.map((item) => (
                    <div className="waitingList_info_container">
                      <div className="col-md-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-md-1">
                            <h6>{item.id}</h6>
                          </div>
                          <div className="col-md-2">
                            <h6>{item.Patient_Name}</h6>
                          </div>
                          <div className="col-md-2 patient_problem">
                            <h6>{item.Health_Issue}</h6>
                          </div>
                          <div className="col-md-2">
                            <h6>{item.Appointment_Date}</h6>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex justify-content-around">
                              <button>সেবা দিন</button>
                              <button>অপেক্ষায় রাখুন</button>
                              <button>বাতিল করুন</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* <div className="waitingList_info_container">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-1">
                      <h6>402</h6>
                    </div>
                    <div className="col-md-2">
                      <h6>রোগীর নাম</h6>
                    </div>
                    <div className="col-md-2 patient_problem">
                      <h6>
                        সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ
                        সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ
                      </h6>
                    </div>
                    <div className="col-md-2">
                      <h6>তারিখ এবং সময়</h6>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-around">
                        <button>সেবা দিন</button>
                        <button>অপেক্ষায় রাখুন</button>
                        <button>বাতিল করুন</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div><div className="waitingList_info_container">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-1">
                      <h6>402</h6>
                    </div>
                    <div className="col-md-2">
                      <h6>রোগীর নাম</h6>
                    </div>
                    <div className="col-md-2 patient_problem">
                      <h6>
                        সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ
                        সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ
                      </h6>
                    </div>
                    <div className="col-md-2">
                      <h6>তারিখ এবং সময়</h6>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-around">
                        <button>সেবা দিন</button>
                        <button>অপেক্ষায় রাখুন</button>
                        <button>বাতিল করুন</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div><div className="waitingList_info_container">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-1">
                      <h6>402</h6>
                    </div>
                    <div className="col-md-2">
                      <h6>রোগীর নাম</h6>
                    </div>
                    <div className="col-md-2 patient_problem">
                      <h6>
                        সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ
                        সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ সমস্যার বিবরণ
                      </h6>
                    </div>
                    <div className="col-md-2">
                      <h6>তারিখ এবং সময়</h6>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-around">
                        <button>সেবা দিন</button>
                        <button>অপেক্ষায় রাখুন</button>
                        <button>বাতিল করুন</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer></Footer>
    </div>
  );
};

export default PatientWaitingList;
