import React from "react";
import "./Location.css";

const Location = () => {
  return (
    <>
      <div className="ourLocation">
        <img
          src="https://images.unsplash.com/photo-1520299607509-dcd935f9a839?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <img
          className="pngimage1"
          src="deliveryboy.webp"
          alt="Delivery boy - Lakhdatar Restarant Jaipur"
        />

        <div className="contactus">
          <div className="contact">
            <span>Contact Us</span>
            <h4>Get Into Touch</h4>
            <i class="fa-solid fa-minus"></i>
            <i class="fa-solid fa-location-dot"></i>
            <i class="fa-solid fa-minus"></i>
          </div>
          <div className="contactno">
            <span>
              <a href="">+91 9823456789</a>
            </span>
          </div>
          <div className="address">
            <h4>Address</h4>
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
              non obcaecati, recusandae inventore accusantium adipisci labore
              voluptate repudiandae saepe voluptates.
            </span>
          </div>
          <div className="mail">
            <h4>Email</h4>
            <span>
              <a href="mailto=Lakhdatar.Restaurant.jaipur@gmail.com">
                Lakhdatar.Restaurant.jaipur@gmail.com
              </a>
            </span>
            <span>
              <a href="">Lakhdatar.Restaurant.malvinagar@gmail.com</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
