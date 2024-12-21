import React from "react";
import "./Footer.css";
export const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="footerPart">
          <h3>Lakhdatar Restaurant</h3>
          <span className="span1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit quia quaerat, accusamus id possimus nesciunt libero
          </span>
          <span className="span2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ullam
            modi ipsum maxime tenetur unde.
          </span>
        </div>
        <div className="footerPart">
          <h3>Opening-Time</h3>
          <div className="timing">
            <ul>
              <li>
                <span>Mon-Wed</span> : 9-10
              </li>
              <li>
                <span>Thu-Sat</span> : 9-8
              </li>
              <li>
                <span>Sunday</span> : Closed
              </li>
              <li>
                <span>We Will Available For You Always </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerPart reviews">
          <h3>Latest Reviews</h3>
          <div className="reviews">
            <ol>
              <li>
                <span>This is Really Good Restaurant</span>
              </li>
              <li>
                <span>Taste is Really Delicious </span>
              </li>
              <li>
                <span>Staff Behavior is too good</span>
              </li>
            </ol>
          </div>
        </div>
        <div className="footerPart ">
          <h3>Social Media</h3>
          <ul className="socialul">
            <li>
              <i class="fa-brands fa-instagram fa-spin"></i>
              <span> : Lakhdatar Restauarnt</span>
            </li>
            <li>
              <i class="fa-brands fa-facebook fa-fade"></i>
              <span> : Lakhdatar Restauarnt </span>
            </li>
            <li>
              <i class="fa-brands fa-linkedin fa-bounce"></i>
              <span> : Lakhdatar Restauarnt</span>
            </li>
            <li>
              <i class="fa-brands fa-twitter fa-flip"></i>
              <span> : Lakhdatar Restauarnt</span>
            </li>
          </ul>
        </div>
        <span className="copyRight">©Copy Right By Lakhdatar Restaurant</span>
      </div>
    </>
  );
};
