import React from "react";
import "./TableRegisteration.css";

export const TableRegisteration = () => {
  return (
    <div className="TR_main">
      <div className="Trbg">
        <img
          src="https://images.pexels.com/photos/9738992/pexels-photo-9738992.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div className="Trhead" data-aos="zoom-in">
        <h3>
          Your Table <span>Reservation Now </span>{" "}
        </h3>
        <form action="" className="TrForm">
          <input
            type="text"
            placeholder="First Name"
            spellCheck={true}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            spellCheck={true}
            required
          />
          <input type="number" placeholder="Mob No." required />
          <input type="text" placeholder="Table No." required />
          <input type="date" placeholder="Choose a Date " required />
          <input type="text" placeholder="Enter Your Message " required />
          <button className="trSumbitButton">Sumbit </button>
        </form>
      </div>
    </div>
  );
};
