import React from "react";
import "./Offers.css";

export const Offers = () => {
  return (
    <div className="offersSection">
      <div className="container">
        <div className="leftCotent">
          <div className="headLeftContent">
            <span> From The Menu</span>
            <span>Special Offers</span>
          </div>
          <div className="listLeftContent" data-aos="fade-up-right">
            <div className="listimg">
              <img
                src="https://images.pexels.com/photos/9609842/pexels-photo-9609842.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div className="listdesc">
              <h3>Matar Paneer </h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro debitis reprehenderit nihil facilis doloribus
                perferendis? Nostrum quas quo praesentium?
              </span>
            </div>
            <div className="listprice">
              <button>₹250</button>
            </div>
          </div>
          <div className="listLeftContent" data-aos="fade-up-right">
            <div className="listimg">
              <img
                src="https://images.pexels.com/photos/10345736/pexels-photo-10345736.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div className="listdesc">
              <h3>Paneer Lababdar With Malai</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro debitis reprehenderit nihil facilis doloribus
                perferendis? Nostrum quas quo praesentium?
              </span>
            </div>
            <div className="listprice">
              <button>₹250</button>
            </div>
          </div>
          <div className="listLeftContent" data-aos="flip-left">
            <div className="listimg">
              <img
                src="https://images.pexels.com/photos/10580197/pexels-photo-10580197.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div className="listdesc">
              <h3>Lakhdatar Special Dish</h3>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro debitis reprehenderit nihil facilis doloribus
                perferendis? Nostrum quas quo praesentium?
              </span>
            </div>
            <div className="listprice">
              <button>₹1250</button>
            </div>
          </div>
        </div>
        <div className="rightContent" data-aos="flip-right">
          <div
            id="carouselExampleIndicators"
            className="carousel slide cursol_head"
            data-bs-ride="true"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner curouselhead">
              <div className="carousel-item active">
                <img
                  src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block cursol_image"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block cursol_image"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block cursol_image"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
