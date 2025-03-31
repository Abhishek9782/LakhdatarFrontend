import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSucess, loginFail } from "../store/userSlice";
import { cartClear, cartQuantityHandle } from "../store/cartSlice";
import { axiosPost } from "../axios";
import { toast } from "react-toastify";
import { userEndPoints } from "../utils/baseUrl";
const Login = () => {
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
    const res = await axiosPost(userEndPoints.login, user);

    if (res.error && res.error.status == 0) {
      toast.error(res.error.message);
    }
    // If alll is good email and id both are good then run it

    if (res.data) {
      toast.success("Login SuccessFully.");
      dispatch(loginSucess({ data: res.data }));
      navigate("/");
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
export default Login;
