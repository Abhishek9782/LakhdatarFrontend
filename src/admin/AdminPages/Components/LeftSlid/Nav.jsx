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
          <li className={activeIndex === 0 ? "active" : ""}>
            <Link to="/lakhdatar/admin/">Home</Link>
          </li>

          <li className={activeIndex === 1 ? "active" : ""}>
            <Link to="/lakhdatar/admin/products">Products Edit</Link>
          </li>

          <li className={activeIndex === 2 ? "active" : ""}>
            <Link to="/lakhdatar/admin/allusers">All User</Link>
          </li>
          {/* all users see and block  */}

          <li className={activeIndex === 3 ? "active" : ""}>
            <Link to="/lakhdatar/admin/allemailTemplates">
              Email Templates{" "}
            </Link>
          </li>

          <li className={activeIndex === 4 ? "active" : ""}>
            <Link>Faq Management </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
