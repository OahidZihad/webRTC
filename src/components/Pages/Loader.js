import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <div></div>
      <div></div>
    </div>
  );
};
export default Loader;

// return (
//   <div style={{paddingLeft : "50%"}}>
//     <CircularProgress disableShrink color="secondary" />
//   </div>
// );
