import React from "react";
import logo from "../../media/logo.png";
import Countdown from "react-countdown";

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <h1 className="countdown_timer">
        {minutes}:{seconds}
      </h1>
    );
  }
};

const CountdownTimer = () => {
  return (
    <div>
      <img src={logo} alt="logo" />
      <br />
      <br />
      <br />
      <h2>অনুগ্রহ করে অপেক্ষা করুন, ডাক্তার অতি সিগ্রই যুক্ত হবেন</h2>
      <div className="countDown">
        <Countdown date={Date.now() + 600000} renderer={renderer} />
      </div>
    </div>
  );
};

export default CountdownTimer;
