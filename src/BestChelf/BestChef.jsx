import React from "react";
import "./BestChef.css";
export const BestChef = () => {
  return (
    <div className="ChefContaner">
      <h3>
        Our Best Chef <i className="fa-solid fa-kitchen-set"></i>
      </h3>
      <div className="chefcards">
        <div className="chefcard" data-aos="flip-up">
          <div className="img">
            <img src="./chef.png" alt="" />
          </div>
          <div className="aboutchef">
            <h5>Senior Chef</h5>
            <h3>Mr. Abhishek Mishra</h3>
          </div>
          <div className="chefmedia">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
        <div className="chefcard" data-aos="flip-up" data-aos-delay="900">
          <div className="img">
            <img src="./chef.png" alt="" />
          </div>
          <div className="aboutchef">
            <h5>Senior Chef</h5>
            <h3>Mr. Abhishek Mishra</h3>
          </div>
          <div className="chefmedia">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
        <div className="chefcard" data-aos="flip-up" data-aos-delay="1100">
          <div className="img">
            <img src="./chef.png" alt="" />
          </div>
          <div className="aboutchef">
            <h5>Senior Chef</h5>
            <h3>Mr. Abhishek Mishra</h3>
          </div>
          <div className="chefmedia">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
        <div className="chefcard" data-aos="flip-up" data-aos-delay="1300">
          <div className="img">
            <img src="./chef.png" alt="" />
          </div>
          <div className="aboutchef">
            <h5>Senior Chef</h5>
            <h3>Mr. Abhishek Mishra</h3>
          </div>
          <div className="chefmedia">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
