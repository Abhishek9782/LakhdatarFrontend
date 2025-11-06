import React from "react";
import "./RestaurantMenu.css";
const RestaurantMenu = () => {
  return (
    <div className="Rm_parent">
      <div className="head_part">
        <h3>Restaurant Menu</h3>
      </div>
      <div className="MenuDishes">
        <div className="MenuDish">
          <div
            className="dish1"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img
              src="https://images.pexels.com/photos/20408432/pexels-photo-20408432/free-photo-of-photo-of-a-curry-dish-served-in-a-pan.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <span>420₹</span>
          </div>
          <div
            className="dish2"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img
              src="https://images.pexels.com/photos/20408462/pexels-photo-20408462/free-photo-of-indian-flatbread-with-tomato-and-cream-on-a-plate.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <span>450₹</span>
          </div>
          <div
            className="dish3"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img src="https://images.pexels.com/photos/10508207/pexels-photo-10508207.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <span>450₹</span>
          </div>
        </div>
        <div className="MenuDish">
          <div
            className="dish2"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img
              src="https://images.pexels.com/photos/20408438/pexels-photo-20408438/free-photo-of-spices-and-meal-in-pot.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <span>450₹</span>
          </div>
          <div
            className="dish1"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img
              src="https://images.pexels.com/photos/28674541/pexels-photo-28674541/free-photo-of-delicious-paneer-tikka-in-rich-tomato-gravy.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <span>450₹</span>
          </div>

          <div
            className="dish3"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img src="https://images.pexels.com/photos/20446394/pexels-photo-20446394/free-photo-of-top-view-of-a-dish-in-a-frying-pan-and-lachha-bread.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <span>450₹</span>
          </div>
        </div>
        <div className="MenuDish">
          <div
            className="dish2"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img
              src="https://images.pexels.com/photos/12737920/pexels-photo-12737920.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <span>450₹</span>
          </div>
          <div
            className="dish3"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img src="https://images.pexels.com/photos/9609835/pexels-photo-9609835.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <span>450₹</span>
          </div>
          <div
            className="dish1"
            data-aos="fade-up"
            data-aos-offset="50"
            data-aos-duration="1"
          >
            <img
              src="https://images.pexels.com/photos/20408463/pexels-photo-20408463/free-photo-of-photo-of-a-curry-dish-served-in-a-pan-and-bowls-with-spices.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <span>450₹</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
