import React from "react";
import "./TableRegisteration.css";

const TableRegisteration = () => {
  return (
    <div className="TR_main">
      <div className="Trbg">
        <img src="restaurantTable.webp" alt="" loading="lazy" />
      </div>
      <div
        className="Trhead"
        data-aos="fade-up"
        data-aos-offset="50"
        data-aos-duration="1"
      >
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
          <select name="" id="">
            <option value="">S-1</option>
            <option value="">S-2</option>
            <option value="">S-3</option>
            <option value="">S-4</option>
            <option value="">S-5</option>
            <option value="">S-6</option>
            <option value="">S-7</option>
            <option value="">S-8</option>
            <option value="">S-9</option>
            <option value="">S-10</option>
          </select>
          <input type="date" placeholder="Choose a Date " required />
          <input type="text" placeholder="Enter Your Message " required />
          <button className="trSumbitButton">Sumbit </button>
        </form>
      </div>
    </div>
  );
};
export default TableRegisteration;
