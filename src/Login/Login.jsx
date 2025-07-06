import React, { useRef, useState } from "react";
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
  const errorRef = useRef(null);

  // Here is all state=------------------------------
  const [eyeShow, seteyeShow] = useState("hide");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // Here is our functions ------------------------

  //  For catch value input and create a user state
  function handleLogin(event) {
    setUser((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }

  //  validate user inputs
  const validate = () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!user.email.trim()) {
      errorRef.current.innerText = "Please Enter a Email Address.";
      return true;
    }
    if (!gmailRegex.test(user.email)) {
      errorRef.current.innerText = "Invalid email format";
      return true;
    }
    if (!user.password.trim()) {
      errorRef.current.innerText = "Please Enter Password ";
      return true;
    }
    return false;
  };

  //  Here is our api call to check user is valid or not
  const Login = async (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
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
    }
  };

  return (
    <>
      <div className="Login">
        <div className="Loginform">
          <form
            action=""
            onSubmit={(e) => {
              Login(e);
            }}
          >
            <h3>Login Here</h3>

            <span className="errortag" ref={errorRef}></span>

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
