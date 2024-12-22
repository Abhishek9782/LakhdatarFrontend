import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { cartQuantityHandle } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  State Managaing here
  const user = useSelector((state) => state.user.user);
  const cartsQty = useSelector((state) => state.carts.carts);
  const userCart = useSelector((state) => state.carts);
  const favProduct = useSelector((state) => state.favprod.favProduct);

  // console.log(userCart, "cart Quantity");
  const CartValue = !user ? cartsQty?.length || 0 : userCart?.qty || 0;

  const [profilehandle, setprofilehandle] = useState("none");
  const [allFavProduct, setallFavProducts] = useState([]);
  //Logout Handle here by using this
  const handleLogout = async (e) => {
    document.getElementById("menuSlider").style.display = "none";
    e.preventDefault();
    const res = await axios
      .post(`https://lakahdatarbackend.onrender.com/user-cart-lose/${user._id}`)
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
        // console.log(error.response.data.message);
      });
    // console.log(res.data);

    if (res.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Logout SuccessFully...",
        showConfirmButon: false,
        timer: 1500,
      }).then(() => {
        setprofilehandle("");
        dispatch(logout());
        navigate("/user-login");
      });
    }
  };

  //  Function here to write handle
  //  this all functions for mobile device

  function handlemenubutton() {
    document.getElementById("menuSlider").style.display = "block";
    document.body.style.overflow = "hidden";
  }
  function handlexmarkbutton() {
    document.getElementById("menuSlider").style.display = "none";
    document.body.style.overflow = "scroll";
  }

  function handleMenubaronrender() {
    document.getElementById("menuSlider").style.display = "none";
    document.body.style.overflow = "scroll";
  }

  //  Getting all Faviorate products data from data base

  async function getFavData() {
    const res = await axios
      .get(
        `https://lakahdatarbackend.onrender.com/food/favProduct${favProduct}`
      )
      .catch((error) => {
        console.log(error);
      });

    if (res.data) {
      setallFavProducts(res.data);
    }
  }

  useEffect(() => {
    getFavData();
  }, []);
  return (
    <>
      <div className="navbar" id="navbar">
        <div className="logoname">
          <span>
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
          </span>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>

            <li>
              <Link to="/our-special">Our Special</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>

            {user == null ? (
              <li>
                <Link to="/user-login">Login</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => {
                      setprofilehandle("profile");
                    }}
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/cart">
                Cart
                <i
                  style={{ color: "black" }}
                  className="fa-solid fa-cart-shopping"
                ></i>
                <span className="cartCount">{CartValue}</span>
              </Link>
            </li>
          </ul>
        </div>
        <span className="menuIcon" id="menuicon" onClick={handlemenubutton}>
          <i className="fa-solid fa-bars"></i>
        </span>
      </div>
      <div className="menuSlider" id="menuSlider">
        <span className="xmark" id="xmark" onClick={handlexmarkbutton}>
          <i class="fa-solid fa-xmark"></i>
        </span>

        {/* This onnclick slider  */}
        <div className="menubarforSlider">
          <ul>
            <li>
              <Link to="/" onClick={handleMenubaronrender}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" onClick={handleMenubaronrender}>
                Menu
              </Link>
            </li>

            <li>
              <Link to="/our-special" onClick={handleMenubaronrender}>
                Our Special
              </Link>
            </li>
            <li>
              <Link to="/help" onClick={handleMenubaronrender}>
                Help
              </Link>
            </li>

            {user == null ? (
              <li>
                <Link to="/user-login" onClick={handleMenubaronrender}>
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="" onClick={handleMenubaronrender}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="" onClick={handleLogout}>
                    logout
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/cart" onClick={handleMenubaronrender}>
                Cart ({CartValue})
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {profilehandle == "profile" ? (
        <div className="profilebody">
          <div className="xmark">
            <i
              class="fa-solid fa-xmark"
              onClick={() => {
                setprofilehandle("");
              }}
            ></i>
          </div>
          <div className="prilfilelist">
            <div className="logo">
              <img
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                alt=""
              />
            </div>
            <ul>
              <li className="username">
                <b>Hey ! {user?.fullname}</b>
              </li>
              <li>
                <i class="fa-solid fa-bag-shopping"></i> Your Orders
              </li>
              <li
                onClick={(e) => {
                  setprofilehandle("favorite");
                }}
              >
                <i class="fa-regular fa-heart"></i> Favorite
              </li>
              <li>
                <i class="fa fa-ticket" aria-hidden="true"></i> Your Ticket
              </li>
              <li>
                <i class="fa-regular fa-handshake"></i>Help
              </li>
              <li>
                <i class="fa-solid fa-cart-shopping"></i>
                Cart
              </li>

              <li className="logoutbtn">
                <Link
                  to=""
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                >
                  <button className="LBtn"> Logout</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : profilehandle == "favorite" ? (
        <div className="profilebody">
          <div className="xmark">
            <i
              class="fa-solid fa-xmark"
              onClick={() => {
                setprofilehandle("");
              }}
            ></i>
          </div>
          <div className="favioratedetails">
            <span className="favoritelogo">Lakhdatar Restaurant</span>
            <h3>Your Faviorate Products</h3>
            {allFavProduct.length > 0 ? (
              allFavProduct?.map((data) => (
                <div className="favproductList" key={data._id}>
                  <ul>
                    <li className="img">
                      <img src={data.src} alt="" />
                    </li>
                    <li style={{ flex: "2" }}>{data.name}</li>
                    <li className="deleteicon">
                      <i
                        title="remove from faviorate "
                        class="fa-solid fa-trash"
                      ></i>
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <>
                <h2 className="EmptyFav">No Favioarate product available </h2>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
