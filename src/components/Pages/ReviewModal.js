import { Rating } from "@mui/material";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctorReview,
  listDoctorDetails,
} from "../../redux/actions/doctorDetailAction";
import "./ReviewModal.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

const customStyles = {
  content: {
    width: "30%",
    height: "350px",
    top: "25%",
    bottom: "25%",
    left: "35%",
    right: "35%",
    border: "1px solid #ccc8c8",
    borderRadius: "40px",
    padding: "30px 10px 20px 10px",
    overflow:"none"
    // bottom: "auto",
    //   marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
};

const ReviewModal = ({ modalIsOpen, closeModal }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [rate, setRating] = React.useState(0);
  // console.log("rate", rate);
  const [comment, setComment] = React.useState("");
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    dispatch(listDoctorDetails(id));
  }, []);
  const doctorDetail = useSelector((state) => state.doctorDetails);
  // console.log("doctorDetail*", doctorDetail);
  const { doctor } = doctorDetail;
  // console.log("doctorDetailss * * *", doctor);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem("access_token")) {
      dispatch(createDoctorReview(id, rate, comment));
      history.push('/patientPortal')
    } else {
      history.push("/login");
    }
  };

  // const doctorReviewPost = useSelector((state) => state.doctorReviewPost);
  // const {loading, success} = doctorReviewPost
  // console.log("test", doctorReviewPost)

  // if(doctorReviewPost.success === true){
  //   history.push('/patientPortal')
  // }

  const handleSkipReview = (e) => {
    history.push("/patientPortal");
  };

  return (
    <Modal
      // className="modal_style"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="col-md-12">
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h5 className="feedback_text">ফিডব্যাক ফরম পূরণ করুনঃ</h5>
            <form onSubmit={handleSubmit} className="modal_form">
              <Stack spacing={1} className="rating">
                <Rating
                  name="hover-feedback"
                  size="large"
                  // defaultValue={0}
                  value={rate}
                  precision={0.5}
                  onChange={(event, newValue) => setRating(newValue)}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  required
                  // readOnly
                />
              </Stack>
              <h6>বিবরণঃ</h6>
              <textarea
                rows="3"
                type="text"
                required
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="d-flex justify-content-center">
                <button type="submit">সেভ করুন</button>
                <button onClick={handleSkipReview}>স্কীপ করুন</button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
