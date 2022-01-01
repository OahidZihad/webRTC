import React, { useEffect, useCallback, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DoctorCard from "./DoctorCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listDoctorAction } from "../../redux/actions/doctorActions";
import "./Landing.css";
import "./Arrow.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import OtpLoader from "../Login/OtpLoader";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

const LandingDoctorList = () => {
  const dispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctor);
  const { doctor, error } = doctorList;
  console.log("doctorList ****", doctor);

  const history = useHistory();

  // const [data, setData] = useState([]);
  // console.log(data);

  //   const get_data = useCallback(() => {
  //     dispatch(listDoctorAction);
  //   }, []);

  useEffect(() => {
    dispatch(listDoctorAction);
    // get_data();
  }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://care-box-backend.herokuapp.com/api/v2/live_doctor/doctor_list/"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      // {
      //   breakpoint: 2048,
      //   width: 400,
      //   settings: {
      //     slidesToShow: 1,
      //     arrows: true,
      //     slidesToScroll: 1,
      //     speed: 3000,
      //     autoplay: true,
      //     swipeToSlide: true,
      //     autoplaySpeed: 3000,
      //   },
      // },
      {
        breakpoint: 1368,
        width: 400,
        settings: {
          slidesToShow: 3,
          arrows: true,
          slidesToScroll: 1,
          speed: 1000,
          autoplay: true,
          swipeToSlide: true,
          autoplaySpeed: 3000,
        },
      },
      // {
      //   breakpoint: 1024,
      //   width: 400,
      //   settings: {
      //     slidesToShow: 2,
      //     arrows: true,
      //     slidesToScroll: 1,
      //     speed: 3000,
      //     autoplay: true,
      //     swipeToSlide: true,
      //     autoplaySpeed: 3000,
      //   },
      // },
      // {
      //   breakpoint: 600,
      //   width: 400,
      //   settings: {
      //     slidesToShow: 2,
      //     arrows: true,
      //     slidesToScroll: 1,
      //     speed: 3000,
      //     autoplay: true,
      //     swipeToSlide: true,
      //     autoplaySpeed: 3000,
      //   },
      // },
      // {
      //   breakpoint: 480,
      //   width: 400,
      //   settings: {
      //     slidesToShow: 2,
      //     arrows: true,
      //     slidesToScroll: 1,
      //     speed: 2000,
      //     autoplay: true,
      //     swipeToSlide: true,
      //     autoplaySpeed: 2000,
      //   },
      // },
    ],
  };

  return (
    <div>
      <Container>
        <div className="doctor_title_flex">
          <div className="doctor_title_flex_left" style={{ fontWeight: "600" }}>
            মেডিসিন বিভাগ
          </div>
          <div
            className="doctor_title_flex_right"
            onClick={() => history.push("/medicine")}
          >
            সকল ডাক্তার দেখুন
          </div>
        </div>
        <br />
        {/* <div className="doctor_slider"> */}
        {doctor.data?.length ? (
          <Container>
            <div className="d-flex justify-content-center">
              <div className="doctor-main-container">
                <Slider {...settings}>
                  {doctor.data
                    ?.filter((doctors) => doctors.Department === "মেডিসিন")
                    .map((eachDoctor) => {
                      return (
                        <DoctorCard key={eachDoctor.id} doctor={eachDoctor} />
                      );
                    })}
                </Slider>
              </div>
            </div>
          </Container>
        ) : (
          <OtpLoader></OtpLoader>
        )}
        {/* </div> */}
      </Container>
      <br />
      <br />
      <br />
      <Container>
        <div className="doctor_title_flex">
          <div className="doctor_title_flex_left" style={{ fontWeight: "600" }}>
            শিশুরোগ বিভাগ
          </div>
          <div
            className="doctor_title_flex_right"
            onClick={() => history.push("/Pediatrician")}
          >
            সকল ডাক্তার দেখুন
          </div>
        </div>
        <br />
        {doctor.data?.length ? (
          <Container>
            <div className="d-flex justify-content-center">
              <div className="doctor-main-container">
                <Slider {...settings}>
                  {doctor.data
                    ?.filter((doctors) => doctors.Department === "পেডিয়াট্রিক")
                    .map((eachDoctor) => {
                      return (
                        <DoctorCard key={eachDoctor.id} doctor={eachDoctor} />
                      );
                    })}
                </Slider>
              </div>
            </div>
          </Container>
        ) : (
          <OtpLoader></OtpLoader>
        )}
      </Container>
      {/* <br />
      <br />
      <br /> */}
      {/* <Container>
        <div className="doctor_title_flex">
          <div className="doctor_title_flex_left">মেডিসিন বিভাগ</div>
          <div className="doctor_title_flex_right">সকল ডাক্তার দেখুন</div>
        </div>
        <br />
        <Container>
        <Container>
            <div className="d-flex justify-content-center">
              <div className="doctor-main-container">
                <Slider {...settings}>
                  {doctor.data
                    ?.filter((doctors) => doctors.Department === "মেডিসিন")
                    .map((eachDoctor) => {
                      return (
                        <DoctorCard key={eachDoctor.id} doctor={eachDoctor} />
                      );
                    })}
                </Slider>
              </div>
            </div>
          </Container>
        </Container>
      </Container> */}
      <br />
      <br />
      <br />
      <Container>
        <div className="doctor_title_flex">
          <div className="doctor_title_flex_left" style={{ fontWeight: "600" }}>
            গাঈণী বিভাগ
          </div>
          <div
            className="doctor_title_flex_right"
            onClick={() => history.push("/gynae")}
          >
            সকল ডাক্তার দেখুন
          </div>
        </div>
        <br />
        {doctor.data?.length ? (
          <Container>
            <div className="d-flex justify-content-center">
              <div className="doctor-main-container">
                <Slider {...settings}>
                  {doctor.data
                    ?.filter(
                      (doctors) => doctors.Department === "স্ত্রীরোগ বিশেষজ্ঞ"
                    )
                    .map((eachDoctor) => {
                      return (
                        <DoctorCard key={eachDoctor.id} doctor={eachDoctor} />
                      );
                    })}
                </Slider>
              </div>
            </div>
          </Container>
        ) : (
          <OtpLoader></OtpLoader>
        )}
      </Container>
      <br />
      <br />
      <br />
      <Container>
        <div className="doctor_title_flex">
          <div className="doctor_title_flex_left" style={{ fontWeight: "600" }}>
            সাইকোলজি বিভাগ
          </div>
          <div
            className="doctor_title_flex_right"
            onClick={() => history.push("/psychology")}
          >
            সকল ডাক্তার দেখুন
          </div>
        </div>
        <br />
        {doctor.data?.length ? (
          <Container>
            <div className="d-flex justify-content-center">
              <div className="doctor-main-container">
                <Slider {...settings}>
                  {doctor.data
                    ?.filter((doctors) => doctors.Department === "সাইকোলজি")
                    .map((eachDoctor) => {
                      return (
                        console.log("each doctor", eachDoctor),
                        (<DoctorCard key={eachDoctor.id} doctor={eachDoctor} />)
                      );
                    })}
                </Slider>
              </div>
            </div>
          </Container>
        ) : (
          <OtpLoader></OtpLoader>
        )}
      </Container>
      <br />
      <br />
      <br />
    </div>
  );
};

export default LandingDoctorList;
