import React from "react";
import "./Navbarbg.css";
export const Navbarbg = () => {
  return (
    <div className="bgImgwtext">
      <img
        className="homebgimage"
        src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <div className="greetingmessage">
        <span>
          <p>Welcome</p>To Lakdatar Restaurant
        </span>
        <br />
        <span className="family">Healthy And Family Restaurant </span>
      </div>
    </div>
  );
};
