import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosPost } from "../axios";
import OtpVerification from "../OtpVerification/Otpverification";

const Register = () => {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    fullname: undefined,
    email: undefined,
    mobile: undefined,
    password: undefined,
  });

  const [ConfirmPassword, setConfirmPassword] = useState("");

  // set Credential:-------------
  const handleRegister = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //  check Confirm Password
  function confirmPassword(e) {
    setConfirmPassword(e.target.value);
    if (credential.password === e.target.value) {
      document.getElementById("isMatch").innerText = "Password Matched...";
      document.getElementById("isMatch").style.color = "green";
      document.getElementById("isMatch").style.display = "block";
    } else {
      document.getElementById("isMatch").innerText = "Password Not Match";
      document.getElementById("isMatch").style.color = "red";
      document.getElementById("isMatch").style.display = "block";
    }
  }

  //  Create user on sumbit
  const createUser = async (e) => {
    e.preventDefault();
    const res = await axiosPost("user-register", credential).catch((error) => {
      document.getElementById("isMatch").innerText =
        error.response.data.message;
      document.getElementById("isMatch").style.color = "red";
      document.getElementById("isMatch").style.display = "block";
    });
    if (res.data) {
      Swal.fire({
        title: "Account Create Sucessfully ",
        text: "You Can Login ",
        icon: "success",
      }).then(() => {
        navigate("/user-login");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${res.data.message}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <>
      <div className="register">
        <div className="Registerform">
          <form
            onSubmit={(e) => {
              createUser(e);
            }}
          >
            <h3>Register Here</h3>
            <input
              type="text"
              placeholder=" Your Full Name"
              required
              id="fullname"
              onChange={handleRegister}
            />
            <input
              type="text"
              placeholder=" Your Email"
              required
              id="email"
              onChange={handleRegister}
            />
            <input
              type="number"
              placeholder=" Your Mobile Number"
              required
              id="mobile"
              onChange={handleRegister}
            />
            <input
              type="password"
              placeholder=" Your Password"
              id="password"
              required
              onChange={handleRegister}
            />

            <p id="isMatch" className="ismatch"></p>

            <input
              type="password"
              placeholder=" Your Confirm Password"
              id="cPassword"
              required
              onChange={(e) => {
                confirmPassword(e);
              }}
            />
            <button style={{ cursor: "pointer" }} type="sumbit">
              Register
            </button>
          </form>
        </div>
        <OtpVerification />
      </div>
    </>
  );
};

export default Register;
