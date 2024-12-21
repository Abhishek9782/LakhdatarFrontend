import React, { useState, useRef } from "react";
import "./Help.css";
import { Navbar } from "../Navbars/Navbar";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";

export const Help = () => {
  const [showHide, setShowHide] = useState("hide");
  const [secondshowHide, setsecondShowHide] = useState("hide");
  function handleClick(e, value) {
    console.log(value);
    if (value == "hide") {
      setShowHide("show");
    } else {
      setShowHide("hide");
    }
  }
  function secondhandleClick(e, value) {
    if (value == "hide") {
      setsecondShowHide("show");
    } else {
      setsecondShowHide("hide");
    }
  }

  return (
    <>
      <div className="helpContainer ">
        <div className="header">
          <h3>Help & Support </h3>
          <span>Let's take a step ahead and help you better.</span>
        </div>
        <div className="helpSection">
          <div className="helpHeader">
            <span className="helpsubheader">
              <Link className="ankertag active" to="/help">
                Partner Onboarding
              </Link>
            </span>
            <span className="helpsubheader">
              <Link className="ankertag" to="/help/legal">
                Legal
              </Link>
            </span>
          </div>
          <div className="helptype">
            <ul>
              {/* Data is here on li bases  */}
              <li>
                <div className="text">
                  <span>I want to partner my restaurant </span>
                  <div className={showHide}>
                    <h3>Partener with us </h3>
                    <button>SEND AN MAIL</button>
                    <span>We will Revert Within 24-hours</span>
                  </div>
                </div>

                <div className="icon">
                  <i
                    class="fa-solid fa-angle-down"
                    onClick={(e) => {
                      handleClick(e, showHide);
                    }}
                  ></i>
                </div>
              </li>
              <li>
                <div className="text">
                  <span>I want to partner my restaurant </span>
                  <div className={secondshowHide}>
                    <h3>Partener with us </h3>
                    <button>SEND AN MAIL</button>
                    <span>We will Revert Within 24-hours</span>
                  </div>
                </div>

                <div className="icon">
                  <i
                    class="fa-solid fa-angle-down"
                    onClick={(e) => {
                      secondhandleClick(e, secondshowHide);
                    }}
                  ></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
