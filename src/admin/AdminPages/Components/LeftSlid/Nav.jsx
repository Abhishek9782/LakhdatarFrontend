import React, { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

export const Nav = ({ activeIndex }) => {
  // const [activeIndex, setactiveIndex] = useState(0);

  // function changeBack(e, active) {
  //   e.preventDefault();
  //   //  here we set index
  //   setactiveIndex(active);
  // }

  return (
    <div className="leftNav">
      <nav>
        <h3>
          Lakhdatar Restaurant
          <i
            className="fa-solid fa-utensils"
            style={{
              color: "black ",
              position: "relative",
              transform: "rotateZ(270deg)",
              marginLeft: "5px",
            }}
          ></i>
        </h3>
        <ul>
          <li
            className={activeIndex === 0 ? "active" : ""}
            onClick={(e) => {
              changeBack(e, 0);
            }}
          >
            <Link to="/lakhdatar/admin/home">Home</Link>
          </li>

          <li
            className={activeIndex === 1 ? "active" : ""}
            onClick={(e) => {
              changeBack(e, 1);
            }}
          >
            <Link to="/lakhdatar/admin/products">Products Edit</Link>
          </li>

          <li
            className={activeIndex === 2 ? "active" : ""}
            onClick={(e) => {
              changeBack(e, 2);
            }}
          >
            <Link to="/lakhdatar/admin/allusers">All User</Link>
          </li>
          {/* all users see and block  */}

          <li
            className={activeIndex === 3 ? "active" : ""}
            onClick={(e) => {
              changeBack(e, 3);
            }}
          >
            <Link to="/total-order">Email Templates </Link>
          </li>

          <li
            className={activeIndex === 4 ? "active" : ""}
            onClick={(e) => {
              changeBack(e, 4);
            }}
          >
            <Link>Faq Management </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
