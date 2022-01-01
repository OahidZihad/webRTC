import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { userReducer } from "./redux/reducers/OnlineAppoinmentDoctorReducers";
// import { userReducer } from "./store/reducer";
import {
  userRegisterReducer,
  userLoginReducer,
} from "./redux/reducers/userReducers";

import store from "./redux/store";
import Main from "./components/Main";
import { Switch, Router, Route } from "react-router-dom";

export const store3 = store;

// export const store2 = createStore(userReducer);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store2}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

ReactDOM.render(
  [
    <Provider store={store3}>
      <App />
    </Provider>,
    // <Provider store={store2}>
    //   <Main />
    // </Provider>,
  ],
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
