import React from "react";
import "./ProfileSection.css";
import { imageUrl } from "../../../../../axios";
export const ProfileSection = ({
  profileRef,
  profileHandle,
  currentUser,
  setProfileHandle,
  handleFavProduct,
  handleLogout,
  allFavProduct,
}) => {
  return (
    <div className="profilebody" ref={profileRef}>
      <div className="xmark" onClick={() => setProfileHandle(false)}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      {profileHandle === "favorite" ? (
        <>
          <div class="containerr">
            <div class="header">
              <h1>Your Favorite Foods</h1>
              <p>All your delicious favorites in one place</p>
            </div>

            {allFavProduct.length > 0 ? (
              <div class="favorites-container">
                {allFavProduct.map((data) => (
                  <div class="favorite-card fade-in">
                    <div class="card-image">
                      <img src={data.src} alt="Pasta" />
                    </div>
                    <div class="card-content">
                      <h3 class="food-name">{data.name}</h3>
                      <p class="food-description">{data.desc}</p>
                      <div class="card-actions">
                        <span class="food-price">{data.halfprice}₹</span>
                        <button class="delete-btn">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div class="EmptyFav">
                <div class="empty-icon">
                  <i class="fas fa-heart"></i>
                </div>
                <h2>No Favorite products available</h2>
                <p>
                  You haven't added any items to your favorites yet. Start
                  exploring our menu and add your favorite dishes!
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="prilfilelist">
          <div className="logo">
            <img
              src={currentUser?.img || "https://via.placeholder.com/150"}
              alt="Profile"
              loading="lazy"
            />
          </div>
          <ul>
            <li className="username" style={{ listStyle: "none" }}>
              <b>Hey! {currentUser.fullname}</b>
            </li>
            <a href="/orders">
              <li>
                <i className="fa-solid fa-bag-shopping"></i> Your Orders
              </li>
            </a>
            <a href="">
              <li onClick={handleFavProduct}>
                <i className="fa-regular fa-heart"></i> Favorite
              </li>
            </a>
            <a href="">
              <li>
                <i className="fa fa-ticket"></i> Your Ticket
              </li>
            </a>
            <a href="">
              <li>
                <i className="fa-regular fa-handshake"></i> Help
              </li>
            </a>

            <a href="">
              <li>
                <i className="fa-solid fa-cart-shopping"></i> Cart
              </li>
            </a>
            <li
              onClick={handleLogout}
              style={{
                color: "black",
                listStyle: "none",
                lineHeight: "70px",
                fontFamily: "Kanit",
                fontSize: "17px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <i
                className="fa-solid fa-address-card"
                style={{ color: "black" }}
              ></i>{" "}
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
