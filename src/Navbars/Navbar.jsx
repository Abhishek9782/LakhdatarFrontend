import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { axiosGet } from "../axios";
import { userEndPoints } from "../utils/baseUrl";
import { useJwt } from "react-jwt";
import "./Navbar.css";
import Swal from "sweetalert2";

const Navbar = () => {
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const favProduct = useSelector((state) => state.favprod.favProduct);

  // Extract userId directly
  const { decodedToken } = useJwt(user);
  const userId = decodedToken?.id || null;

  const [profileHandle, setProfileHandle] = useState(false);
  const [allFavProduct, setAllFavProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // Fetch favorite products
  const getFavData = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axiosGet(`food/favProduct/${userId}`);
      if (res?.data) setAllFavProducts(res.data);
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  }, [userId]);

  // Fetch user profile
  const getProfile = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axiosGet(`${userEndPoints.getProfile}/${userId}`);
      if (res.status === 1) setCurrentUser(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [userId]);

  // Handle logout
  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logout());
      setProfileHandle(false);
      Swal.fire({
        title: "Logout SuccessFully.",
        icon: "success",
        draggable: true,
      }).then(() => {
        navigate(userEndPoints.login);
      });
    },
    [dispatch, navigate]
  );

  // Handle favorite section toggle
  const handleFavProduct = useCallback(
    (e) => {
      e.preventDefault();
      setProfileHandle("favorite");
      getFavData();
    },
    [getFavData]
  );

  // Memoized cart count
  const cartCount = useMemo(() => favProduct.length, [favProduct]);

  // Fetch user profile and favorite data on mount or userId change
  useEffect(() => {
    getProfile();
    getFavData();
  }, [getProfile, getFavData]);

  return (
    <>
      <div className="navbar">
        <div className="logoname">
          <span>
            Lakhdatar Restaurant
            <i
              className="fa-solid fa-utensils"
              style={{ color: "black", marginLeft: "5px" }}
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
            {user ? (
              <li>
                <Link onClick={() => setProfileHandle(true)}>Profile</Link>
              </li>
            ) : (
              <li>
                <Link to="/user-login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/cart">
                Cart <i className="fa-solid fa-cart-shopping"></i>
                <span className="cartCount">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
        <span
          className="menuIcon"
          onClick={() => document.body.classList.add("menu-open")}
        >
          <i className="fa-solid fa-bars"></i>
        </span>
      </div>

      {/* Mobile Menu */}
      <div className="menuSlider">
        <span
          className="xmark"
          onClick={() => document.body.classList.remove("menu-open")}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <div className="menubarforSlider">
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => document.body.classList.remove("menu-open")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                onClick={() => document.body.classList.remove("menu-open")}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/our-special"
                onClick={() => document.body.classList.remove("menu-open")}
              >
                Our Special
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                onClick={() => document.body.classList.remove("menu-open")}
              >
                Help
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="#" onClick={() => setProfileHandle(true)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/user-login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/cart">Cart ({cartCount})</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Popup */}
      {profileHandle && (
        <div className="profilebody" ref={profileRef}>
          <div className="xmark" onClick={() => setProfileHandle(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          {profileHandle === "favorite" ? (
            <div className="favioratedetails">
              <span className="favoritelogo">Lakhdatar Restaurant</span>
              <h3>Your Favorite Products</h3>
              {allFavProduct.length > 0 ? (
                allFavProduct.map((data) => (
                  <div className="favproductList" key={data._id}>
                    <ul>
                      <li className="img">
                        <img src={data.src} alt={data.name} />
                      </li>
                      <li style={{ flex: "2" }}>{data.name}</li>
                      <li className="deleteicon">
                        <i
                          className="fa-solid fa-trash"
                          title="Remove from favorite"
                        ></i>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <h2 className="EmptyFav">No Favorite products available</h2>
              )}
            </div>
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
                <li className="username">
                  <b>Hey! {currentUser.fullname}</b>
                </li>
                <li>
                  <i className="fa-solid fa-bag-shopping"></i> Your Orders
                </li>
                <li onClick={handleFavProduct}>
                  <i className="fa-regular fa-heart"></i> Favorite
                </li>
                <li>
                  <i className="fa fa-ticket"></i> Your Ticket
                </li>
                <li>
                  <i className="fa-regular fa-handshake"></i> Help
                </li>
                <li>
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </li>
                <li onClick={handleLogout}>
                  <i className="fa-solid fa-address-card"></i> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(Navbar);
