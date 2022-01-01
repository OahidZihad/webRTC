import React from "react";
// import doc_image from "../../media/img_avatar.png";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const ParticularDoctorCard = (props) => {    
      console.log("props",props)
      const history = useHistory();
      const handleButtonPush = () => {
        history.push(`/online-doctor/${props.doctors.id}`);
      };
    return (
        <div className="col-md-4">
          <div className="doctor_card_container">
            <div
              onClick={handleButtonPush}
              className="doctor_content mt-4"
              style={{ cursor: "pointer" }}
            >
              <div className="doctor_flex">
                <div className="doctor_flex_image">
                  <img src={props.doctors.Image} alt="doctor name" />
                </div>
                <div className="doctor_flex_details">
                  <h2 style={{ fontSize: "25px" }}>{props.doctors.Name}</h2>
                  <p style={{ fontSize: "15px", marginTop: "-13px" }}>
                    {props.doctors.Designation}
                  </p>
                  <div className="doctor-fees" style={{ marginTop: "-8px" }}>
                    <h5>চার্জ: {props.doctors.Fees} টাকা</h5>
                  </div>
                  <Stack spacing={1}>
                    <Rating
                      name="size-small"
                      // defaultValue={4.5}
                      value={props.doctors.Rating}
                      size="small"
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                  <p style={{ fontSize: "13px" }}>সময়ঃ {props.doctors.Appointment_Time_Range}</p>
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
                {props.doctors.Background.length > 320 ? (
                  <p>{props.doctors.Background.substring(0, 255)}. . .</p>
                ) : (
                  <p>{props.doctors.Background}</p>
                )}
              </div>
            </div>
           </div>
         </div>
      );
    
};

export default ParticularDoctorCard;

