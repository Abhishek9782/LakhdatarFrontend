import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { loginAdmin } from "../../../services/authService";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginStart, loginSucess } from "../../../store/userSlice";
const AdminLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // here we chek if admin login and he is come again on login page then we redirect it on home page check jwt is expire or not
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      try {
        const decode = jwtDecode(token.data);
        const isExpired = Date.now() >= decode.exp * 1000;
        if (!isExpired) {
          navigate("/lakhdatar/admin/");
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("user");
      }
    }
  }, [location, navigate]);

  const [cookies, setCookie] = useCookies(["user"]);
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
    dispatch(loginStart());

    //  here we login admin
    const res = await loginAdmin(user);

    if (res.status == 1) {
      toast.success(res.message, { autoClose: 1000 });
      const user = { data: res.data };
      dispatch(loginSucess(user));
      navigate("/lakhdatar/admin/");
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
