import React from "react";
import "./HelpLegal.css";
import { Navbar } from "../Navbars/Navbar";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Legaldata } from "../Data";

export const HelpLegal = () => {
  return (
    <>
      <div className="legalhelpContainer ">
        <div className="helpLegalheader">
          <h3>Help & Support </h3>
          <span>Let's take a step ahead and help you better.</span>
        </div>
        <div className="LegalhelpSection">
          <div className="LeagalhelpHeader">
            <Link to="/help" className="link">
              <span>Partner Onboarding</span>
            </Link>
            <Link className="link" to="/help/legal">
              <span>Legal</span>
            </Link>
          </div>
          <div className="Legalhelptype">
            <ul>
              {/* Data is here on li bases  */}
              {Legaldata.map((value) => (
                <li key={value._id}>
                  <div className="text">
                    <span>{value.heading}</span>
                    <div className="show">
                      <span>{value.Summary}</span>
                      <p>{value.read}</p>
                    </div>
                  </div>

                  <div className="icon">
                    <i class="fa-solid fa-angle-down"></i>
                  </div>
                </li>
              ))}
              ;
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
