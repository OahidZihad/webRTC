import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../../media/logo.png";
import dropDownIcon from "../../media/dropdown-icon.png";
import FadeIn from "react-fade-in";
import Footer from "../Pages/Footer";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getPatientView } from "../../redux/actions/patientDetailAction";

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

const PatientPortal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [detailshow, setDetailshow] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDetails = () => {
    setDetailshow(!detailshow);
  };
  const history = useHistory();
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPatientView)
  },[])

  const patientDetails = useSelector(state=>state.patientViewGet)
  const {loading, patientView} = patientDetails;
  console.log(patientView)
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
                  স্বাগতম, {patientView.Name}{" "}
                  <img
                    src={dropDownIcon}
                    alt="dropdown"
                    style={{ height: "17px", marginTop: "-5px" }}
                    fluid
                    // id="demo-customized-button"
                    // aria-controls="demo-customized-menu"
                    // aria-haspopup="true"
                    // aria-expanded={open ? "true" : undefined}
                    // variant="contained"
                    // disableElevation
                    onClick={handleClick}
                  />
                  <StyledMenu
                    className="dropdown_container"
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
                      <button
                        onClick={() => history.push("/patientWaitingList")}
                        className="menu_button"
                      >
                        অপেক্ষমান রোগী
                      </button>
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      {/* <MoreHorizIcon /> */}
                      <button className="menu_button">
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

      {/* <div className="doctor_portal_login">
        <h3>প্রদত্ত সেবার বিবরণ</h3>
      </div>

      <br></br>
      <br></br>
      <br></br> */}

      <div className="d-flex justify-content-center">
        <div className="col-md-3 treatment_doctor_info">
          <h5>রোগীর নামঃ</h5>
          <h5 id="name">{patientView.Name}</h5>

          <h5>মোবাইল নাম্বারঃ</h5>
          <h5 id="phone">{patientView.Phone}</h5>

          <h5>রোগীর বয়সঃ</h5>
          <h5 id="age">{patientView.Age}</h5>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <h6 style={{ textAlign: "left", fontWeight: "bold" }}>
            ডাক্তার সেবা ও ঔষদের বিবরণ
          </h6>
          <div className="patient_waitingList_card_container">
            <div className="patient_waitingList_card_content">
              <div className="d-flex justify-content-between treatment_desc_header">
                {/* <div className="header_session_id">
                    <h6>সেশন আইডি</h6>
                  </div>
                  <div className="header_patient_name">
                    <h6>রোগীর নাম</h6>
                  </div>
                  <div className="header_patient_problem">
                    <h6>রোগীর সমস্যার বিবরণ</h6>
                  </div>
                  <div className="header_doctor_action">
                    <h6>সেবা এর বিবরণ</h6>
                  </div> */}

                <div className="col-md-2">
                  <h6>সেশন আইডি</h6>
                </div>
                <div className="col-md-3">
                  <h6>ডাক্তারের নামঃ</h6>
                </div>

                <div className="col-md-6">
                  <h6>ঔষধ এর বিবরণ</h6>
                </div>
              </div>

              <div className="treatment_desc">
                <div className="d-flex justify-content-between">
                  <div className="col-md-2">
                    <h6>402</h6>
                  </div>
                  <div className="col-md-3">
                    <h6>Abdul Karim</h6>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex justify-content-around desc_button">
                      <h6>ঔষধ সমূহ</h6>
                      {/* <button onClick={handleDetails}>
                        {detailshow ? "+" : "-"}
                      </button> */}
                      <img src={dropDownIcon} onClick={handleDetails} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="treatment_desc_detailshow">
                  {detailshow ? null : (
                    <FadeIn delay={200} transitionDuration={600}>
                      {/* <h5 style={{ color: "black" }}>
                      <ul style={{ whiteSpace: "pre-line" }}>
                        sadlkfjsla;dfjk sdalfkjsaldk; fjs;kldafj;sklda
                        fj;skldajf l;kasjd kl;sdajfl;ksjda f;lksadjf ;klsajdf
                        ;klsajdf;lkjsadkl;j f;sladkj f;lskadfj l;j
                      </ul>
                    </h5> */}
                      <div className="col-md-12">
                        {/* <div className="justify-content-between"> */}
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-md-2">
                            <button>প্রেসক্রিপশন</button>
                          </div>
                          <div className="col-md-3">
                            <button>অর্ডার করুন</button>
                          </div>
                          <div className="col-md-6">
                            <div className="prescription_textarea">
                              <textarea
                                style={{
                                  borderRadius: "10px",
                                  border: "1px solid white",
                                }}
                                name="prescription"
                                id="prescription"
                                cols="32"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
              <div className="treatment_desc">
                <div className="d-flex justify-content-between">
                  <div className="col-md-2">
                    <h6>402</h6>
                  </div>
                  <div className="col-md-3">
                    <h6>Abdul Karim</h6>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex justify-content-around desc_button">
                      <h6>ঔষধ সমূহ</h6>
                      {/* <button onClick={handleDetails}>
                        {detailshow ? "+" : "-"}
                      </button> */}
                      <img src={dropDownIcon} onClick={handleDetails} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="treatment_desc_detailshow">
                  {detailshow ? null : (
                    <FadeIn delay={200} transitionDuration={600}>
                      {/* <h5 style={{ color: "black" }}>
                      <ul style={{ whiteSpace: "pre-line" }}>
                        sadlkfjsla;dfjk sdalfkjsaldk; fjs;kldafj;sklda
                        fj;skldajf l;kasjd kl;sdajfl;ksjda f;lksadjf ;klsajdf
                        ;klsajdf;lkjsadkl;j f;sladkj f;lskadfj l;j
                      </ul>
                    </h5> */}
                      <div className="col-md-12">
                        {/* <div className="justify-content-between"> */}
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-md-2">
                            <button>প্রেসক্রিপশন</button>
                          </div>
                          <div className="col-md-3">
                            <button>অর্ডার করুন</button>
                          </div>

                          <div className="col-md-6">
                            <div className="prescription_textarea">
                              <textarea
                                style={{
                                  borderRadius: "10px",
                                  border: "1px solid white",
                                }}
                                name="prescription"
                                id="prescription"
                                cols="32"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
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

export default PatientPortal;
