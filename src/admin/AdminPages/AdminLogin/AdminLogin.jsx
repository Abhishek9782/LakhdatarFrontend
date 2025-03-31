import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleUser(e) {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  //  Here we are handle form sumbiting
  async function handleSumbit(e) {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:5000/lakhdatar/admin/login", user, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch((error) => {
        if (error.response?.data.message) {
          toast.error(error.response?.data.message, {
            icon: true,
            autoClose: 3000,
          });
        }
      });

    if (res.data) {
      toast.success(res.data.message, { autoClose: 2000 });
      setCookie("jwt", res.data.data);
      navigate("/lakhdatar/admin/home");
    }
  }
  return (
    <>
      <div className="admincontainer">
        <div className="login-box">
          <h3>Please Fill Your Deatails </h3>
          <form action="" onSubmit={handleSumbit}>
            <input
              type="email"
              placeholder="Enter Your E- Mail Id  "
              required
              name="email"
              onChange={(e) => {
                handleUser(e);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={(e) => {
                handleUser(e);
              }}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
