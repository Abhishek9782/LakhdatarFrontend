import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiRequest, axiosPost } from "../axios";
import OtpVerification from "../OtpVerification/OtpVerification";
import { useEffect } from "react";
import { useRef } from "react";
import { userEndPoints } from "../utils/baseUrl";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const errorRef = useRef(null); // For form validation errors
  const matchRef = useRef(null); // For confirm password match

  const registerInputs = [
    {
      type: "text",
      placeholder: " Your Full Name",
      id: "fullname",
    },
    {
      type: "text",
      placeholder: " Your Email",
      id: "email",
    },
    {
      type: "number",
      placeholder: " Your Mobile Number",
      id: "mobile",
    },
    {
      type: "password",
      placeholder: " Your Password",
      id: "password",
    },
  ];

  //  for validation error input
  const validate = () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:\";'<>?,./]).{8,}$"
    );

    if (!credential.fullname.trim()) {
      errorRef.current.innerText = "Please Enter Your Fullname ";
      errorRef.current.style.color = "red";
      return true;
    }
    if (credential.fullname.length < 5) {
      errorRef.current.innerText =
        "Fullname Length should be atleast 5 charachter";
      errorRef.current.style.color = "red";
      return true;
    }
    if (!credential.email.trim()) {
      errorRef.current.innerText = "Please Enter Your Email Address";
      errorRef.current.style.color = "red";
      return true;
    }

    if (!gmailRegex.test(credential.email)) {
      errorRef.current.innerText = "Please Enter a Valid Email Address";
      errorRef.current.style.color = "red";
      return true;
    }
    if (!credential.mobile.trim()) {
      errorRef.current.innerText = "Please Enter Your Mobile Number ";
      errorRef.current.style.color = "red";
      return true;
    }
    if (credential.mobile.length !== 10) {
      errorRef.current.innerText =
        "Please Enter a Valid 10 DIgit  Mobile Number ";
      errorRef.current.style.color = "red";
      return true;
    }
    if (!credential.password.trim()) {
      errorRef.current.innerText = "Please Enter a Password ";
      errorRef.current.style.color = "red";
      return true;
    }
    if (!passwordRegex.test(credential.password)) {
      errorRef.current.innerText =
        "Weak password. Use A-Z, a-z, 0-9, and a symbol.";
      errorRef.current.style.color = "red";
      return true;
    }
    errorRef.current.innerText = "";
    return false;
  };

  // set Credential:-------------
  const handleRegister = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //  check Confirm Password
  function confirmPassword(e) {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);

    const isMatch = credential.password === confirmValue;
    setPassMatch(isMatch);

    if (matchRef.current) {
      if (isMatch) {
        matchRef.current.innerText = "Password Matched...";
        matchRef.current.style.color = "green";
        matchRef.current.style.display = "block";
      } else {
        matchRef.current.innerText = "Password Not Match";
        matchRef.current.style.color = "red";
        matchRef.current.style.display = "block";
      }
    }
  }

  useEffect(() => {
    if (passMatch === true) {
      const messageElement = document.getElementById("isMatch");
      const timer = setTimeout(() => {
        if (messageElement) messageElement.style.display = "none";
      }, 2000);

      // Cleanup
      return () => clearTimeout(timer);
    }
  }, [passMatch]);

  //  Create user on sumbit
  const createUser = async (e) => {
    e.preventDefault();
    let err = validate();
    if (!err) {
      const res = await apiRequest({
        method: "post",
        url: userEndPoints.register,
        data: credential,
      });

      if (res.success == 0) {
        toast.error(res?.error?.message);
      }

      if (res.success) {
        setShow(true);
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
    }
  };

  return (
    <>
      <div className="register">
        {!show && (
          <div className="Registerform">
            <form
              onSubmit={(e) => {
                createUser(e);
              }}
            >
              <p ref={errorRef} className="validation-error"></p>
              <p ref={matchRef} className="ismatch" id="isMatch"></p>

              <h3>Register Here </h3>
              {registerInputs.map((form) => (
                <>
                  <input
                    type={form.type}
                    placeholder={form.placeholder}
                    id={form.id}
                    onChange={handleRegister}
                  />
                </>
              ))}

              <input
                type="password"
                placeholder=" Your Confirm Password"
                id="cPassword"
                onChange={(e) => {
                  confirmPassword(e);
                }}
              />
              <button style={{ cursor: "pointer" }} type="sumbit">
                Register
              </button>
            </form>
          </div>
        )}
        {show && <OtpVerification />}
      </div>
    </>
  );
};

export default Register;
