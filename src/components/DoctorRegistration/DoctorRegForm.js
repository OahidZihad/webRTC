import React, { useEffect, useState } from "react";
import Footer from "../Pages/Footer";
import HeaderBox from "../Pages/HeaderBox";
import doctorRegImage from "../../media/doctorRegImage.png";
import { Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";
import logo from "../../media/logo.png";
import banner from "../../media/cover-01.png";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../Pages/Landing.css";
import { createDoctor } from "../../redux/actions/doctorRegistrationAction";
import { getUserDetails } from "../../redux/actions/userActions";

const DoctorRegForm = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");
  const [degree, setDegree] = useState("");
  const [bmdc, setBmdc] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [time, setTime] = useState("");
  const [week, setWeek] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  console.log("user", user.Name)

  // const userId = user.id;
  const userId = 102;
  console.log(userId);

  const amount = 150;

  useEffect(() => {
    if (localStorage.getItem("registerd") === "done") {
      dispatch(getUserDetails());
      localStorage.setItem("name", user.Name);
    } else {
      history.push("/login");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createDoctor(
        userId,
        name,
        phone,
        email,
        nid,
        degree,
        bmdc,
        speciality,
        time,
        week,
        amount
      )
    );
  };

  return (
    <div>
      <div className="headerBox3">
        <Navbar>
          <Container>
            <Navbar.Brand>
              <img
                onClick={() => history.push("/")}
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

      <div className="doctor-reg">
        <div>
          <img src={doctorRegImage}></img>
        </div>
        <div className="doctor-reg-form">
          <form onSubmit={handleSubmit}>
            <h4
              style={{
                fontWeight: "700",
                borderBottom: "2px solid #BD095A",
                paddingBottom: "5px",
              }}
            >
              ডাক্তার আবেদন ফরমঃ
            </h4>
            <p style={{ marginTop: "20px" }}>আপনার নামঃ</p>
            <input
              type="text"
              required
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <p>মোবাইল নাম্বার:</p>
            <input
              type="text"
              placeholder=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <p>ইমেলঃ</p>
            <input
              type="text"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <p>জাতীয় পরিচয়-পত্র / পাসপোর্ট নাম্বারঃ</p>
            <input
              required
              type="text"
              placeholder=""
              value={nid}
              onChange={(e) => setNid(e.target.value)}
            />
            <br />
            <p>শিক্ষাগত যোগ্যতাঃ</p>
            <input
              type="text"
              placeholder=""
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
            <br />
            <p>বি এম ডি সি নাম্বারঃ</p>
            <input
              type="text"
              placeholder=""
              value={bmdc}
              onChange={(e) => setBmdc(e.target.value)}
            />
            <br />
            <p>বিশেষত্বঃ</p>
            <input
              type="text"
              placeholder=""
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            />
            <br />
            <p>আপনার সেবার সময়সূচীঃ </p>
            <input
              type="text"
              placeholder="I.E. 5pm - 8pm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <br />
            <p>সেবার দিন সমূহঃ </p>
            <input
              type="text"
              placeholder="I.E. Sun-Mon-Thurs"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            />
            <br />
            <Button
              style={{ marginLeft: "100px", fontWeight: "bold" }}
              variant="warning"
              type="submit"
              // onClick={handleDoctorReg}
            >
              আবেদন করুন
            </Button>
          </form>

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group mb-3">
              <input
                type="text"
                placeholder="name"
                className="form-control"
                {...register("name", { required: true })}
                onBlur={handleBlur}
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div class="form-group mb-3">
              <input
                type="text"
                placeholder="phone"
                className="form-control"
                {...register("phone", { required: true })}
                onBlur={handleBlur}
              />
              {errors.phone && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div class="form-group mb-3">
              <input
                type="email"
                placeholder="email"
                className="form-control"
                {...register("email", { required: true })}
                onBlur={handleBlur}
              />
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div class="form-group mb-3">
              <input
                type="text"
                placeholder="nid"
                className="form-control"
                {...register("nid", { required: true })}
                onBlur={handleBlur}
              />
              {errors.nid && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div class="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="degree"
                {...register("degree", { required: true })}
                onBlur={handleBlur}
              />
              {errors.degree && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div class="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="bmdc"
                {...register("bmdc", { required: true })}
                onBlur={handleBlur}
              />
              {errors.bmdc && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div class="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="speciality"
                {...register("speciality", { required: true })}
                onBlur={handleBlur}
              />
              {errors.speciality && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div class="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="time"
                {...register("time", { required: true })}
                onBlur={handleBlur}
              />
              {errors.time && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div class="form-group">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="week"
                {...register("week", { required: true })}
                onBlur={handleBlur}
              />
              {errors.week && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-dark">
                Send
              </button>
            </div>
          </form> */}
        </div>
      </div>
      <br></br>
      <Footer></Footer>
    </div>
  );
};

export default DoctorRegForm;
