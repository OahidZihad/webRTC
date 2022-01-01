import React, { useEffect, useCallback } from "react";
import doc_image from "../../media/img_avatar.png";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const DoctorCard = (props) => {
  console.log("props",props.doctor.Rating)
  const history = useHistory();
  const handleButtonPush = () => {
    history.push(`/online-doctor/${props.doctor.id}`);
  };
  return (
    // <div className="col-md-4">
    <div className="doctor_card_container">
      <div
        onClick={handleButtonPush}
        className="doctor_content"
        style={{ cursor: "pointer" }}
      >
        <div className="doctor_flex">
          <div className="doctor_flex_image">
            <img src={props.doctor.Image} alt="doctor name" />
          </div>
          <div className="doctor_flex_details">
            <h2 style={{ fontSize: "25px" }}>{props.doctor.Name}</h2>
            <p style={{ fontSize: "15px", marginTop: "-13px" }}>
              {props.doctor.Designation}
            </p>
            <div className="doctor-fees" style={{ marginTop: "-8px" }}>
              <h5>চার্জ: {props.doctor.Fees} টাকা</h5>
            </div>
            <Stack spacing={1}>
              <Rating
                style={{ marginTop: "0px" }}
                name="size-small"
                size="small"
                defaultValue={4.5}
                value={props.doctor.Rating}
                precision={0.5}
                readOnly
              />
            </Stack>
            <p style={{ fontSize: "13px" }}>সময়ঃ {props.doctor.Appointment_Time_Range}</p>
            {/* <div className="doctor-fees" style={{ marginTop: "-8px" }}>
                <h5>চার্জ: {Fees} টাকা</h5>
              </div> */}
            <Button
              class="session_bounce"
              variant="warning"
              // style={{ fontSize: "14px", fontWeight: "bold" }}
              onClick={handleButtonPush}
            >
              সেশন বুক করুন
            </Button>
          </div>
        </div>
        <div className="doctor_desc">
          <h5 className="doctor-description">বিবরণঃ</h5>
          {props.doctor.Background.length > 320 ? (
            <p>{props.doctor.Background.substring(0, 255)}. . .</p>
          ) : (
            <p>{props.doctor.Background}</p>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DoctorCard;
