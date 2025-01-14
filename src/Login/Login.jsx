import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSucess, loginFail } from "../store/userSlice";
import { cartClear, cartQuantityHandle } from "../store/cartSlice";

export const Login = () => {
  const stateCart = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Here is all state=------------------------------
  const [eyeShow, seteyeShow] = useState("hide");
  const [user, setUser] = useState({
    email: undefined,
    password: undefined,
  });

  // Here is our functions ------------------------

  //  For catch value input and create a user state
  function handleLogin(event) {
    setUser((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }

  //  Here is our api call to check user is valid or not
  const checkuser = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    const res = await axios
      .post("http://localhost:5000/user-login", {
        user: user,
        cart: stateCart,
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
        dispatch(loginFail());
      });

    // If alll is good email and id both are good then run it

    if (res.data) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successfully...",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(cartQuantityHandle(res.data.carts?.length));
        dispatch(cartClear());
        dispatch(
          loginSucess({ data: res.data, cartlength: res.data.carts?.length })
        );
        navigate("/");

        console.log(res.data);
      });
    }
  };

  return (
    <>
      <div className="Login">
        <div className="Loginform">
          <form
            action=""
            onSubmit={(e) => {
              checkuser(e);
            }}
          >
            <h3>Login Here</h3>

            <input
              type="text"
              placeholder=" Your Email or Mobile Number"
              id="email"
              onChange={handleLogin}
              required
            />

            <input
              spellCheck={true}
              type={eyeShow == "hide" ? "password" : "text"}
              placeholder=" Your Password"
              onChange={handleLogin}
              id="password"
              required
            />
            {eyeShow == "show" ? (
              <i
                class="fa-regular fa-eye show_eye"
                onClick={() => {
                  seteyeShow("hide");
                }}
              ></i>
            ) : (
              <i
                class="fa-regular fa-eye-slash hide_eye"
                onClick={() => {
                  seteyeShow("show");
                }}
              ></i>
            )}
            <span className="RegisterLink">
              <Link to="/user-register">Register Here</Link>
            </span>
            <button type="sumbit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
