import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//import { OnlineAppoinmentDoctorReducer, OnlineAppoinmentCategoryReducer } from './reducers/OnlineAppoinmentDoctorReducers';
// import {userReducer}  from "../store/reducer";
// import { userReducer } from "../store/reducer";
// import { userReducer } from "../store/reducer";
import { userReducer } from "./reducers/OnlineAppoinmentDoctorReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  allDoctorReducer,
  doctorReducer,
  waitingPatientListReducer,
} from "./reducers/doctorReducers";
import {
  doctorDetailReducers,
  doctorReviewCreateReducer,
  doctorReviewGetReducer,
  createDoctorAppointmentReducer,
} from "./reducers/doctorDetailReducer";
import { createDoctorReducer } from "./reducers/doctorRegistrationReducer";
import { getPatientViewReducer } from "./reducers/patientDetailReducer";

const reducer = combineReducers({
  //   online appoinment
  //   OnlineAppoinmentDoctor: OnlineAppoinmentDoctorReducer,
  //   OnlineAppoinmentCategory: OnlineAppoinmentCategoryReducer
  webRTC: userReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,

  //doctor List
  doctor: doctorReducer,
  // allDoctor: allDoctorReducer

  //doctor detail
  doctorDetails: doctorDetailReducers,

  //doctor registration
  doctorCreate: createDoctorReducer,

  //waiting Patient List
  waitingPatientList: waitingPatientListReducer,

  //doctor review
  doctorReviewPost: doctorReviewCreateReducer,
  doctorReviewGet: doctorReviewGetReducer,

  //doctor appointment
  createDoctorAppointment: createDoctorAppointmentReducer,

  //patient detail
  patientViewGet: getPatientViewReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
