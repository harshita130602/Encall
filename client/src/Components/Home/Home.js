// Importing relevant files
import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import "./Home.css";
import Footer from "../Footer/Footer";
import homeIcon from "../../assets/video-call.png";
import { APP_NAME } from "../../constants";
import { Link } from "react-router-dom";
import { message } from "antd";
import Navbar from "../Navbar/Navbar";

const Home = (props) => {
  // setting consts
  const paramsCode = props.location.search;
  const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);

  useEffect(() => {
    if (paramsCode.length) {
      if (paramsCode.substring(0, 5) == "?ref=") return; // for product hunt ref
      setMeetingCode(paramsCode.substring(1));
    }

    // new meet has to be NULL in the beginning
    setNewMeet(null);
  }, []);

  // Required HTML for front-end
  return (
    <div className="home">
      <Navbar />
      <div className="meet-body">
        <div className="meet-container">
          <div className="meet-title">
            <img src={homeIcon} alt="" />
            <h3>{APP_NAME}</h3>
          </div>
          <input
            type="text"
            placeholder="Enter meeting code"
            value={meetingCode || ""}
            onChange={(e) => {
              setMeetingCode(e.target.value); // setting meeting code with this function
            }}
            className="meet-input"
          />
          <button // button to join a call
            className="meet-button"
            onClick={() => {
              if (!meetingCode || meetingCode.trim().length === 0) {
                // throwing error if user tries to join meeting without entering the code
                message.error("Please enter the meeting code");
                return;
              }
              props.history.push("join");
            }}
          >
            Join a Meeting
          </button>
          <Link
            className="meet-button"
            to="join"
            onClick={() => {
              setNewMeet(true); // setting new meet on click of this button
            }}
          >
            Host a Meeting
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
