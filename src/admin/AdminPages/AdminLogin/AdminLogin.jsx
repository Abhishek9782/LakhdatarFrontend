import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../services/authService";

const AdminLogin = () => {
  const [cookies, setCookie] = useCookies(["user"]);
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

    //  here we login admin
    const res = await loginAdmin(user);
    if (res.status == 1) {
      console.log(res);
      toast.success(res.message, { autoClose: 1000 });
      localStorage.setItem("user", res.data);
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
