import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import { axiosForImage, axiosPost } from "../../../axios";
import { toast, Bounce } from "react-toastify";
import { useCookies } from "react-cookie";

export const AddProduct = ({ setIsAdd, getAllproducts }) => {
  const [product, setProduct] = useState({
    name: "",
    fullprice: "",
    halfprice: "",
    foodType: "",
    food: "",
    desc: "",
  });
  const [file, setfile] = useState({});
  const [cookies] = useCookies(["jwt"]);

  async function handleProduct(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }
  async function handleChange(e) {
    setfile(e.target.files[0]);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("src", file); // Append file with key 'image'
    }
    try {
      const res = await axiosPost(
        "lakhdatar/admin/product/productadd",
        formData,
        true
      );

      if (res?.status) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsAdd(false);
        getAllproducts();
      }

      if (res.response.data.message) {
        toast.error(res.response.data.message);
      }
    } catch (error) {
      console.log(error, ">>>>>>>>>>>>>>>>>>>>>>>>");
    }
  }
  return (
    <div className="add-productparent ">
      <div className="form-box">
        <span
          className="closebtn"
          onClick={() => {
            setIsAdd(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <form
          action=""
          onSubmit={(e) => {
            handleSumbit(e);
          }}
        >
          <h2>Please Fill Product Details </h2>
          <input
            type="file"
            name="src"
            placeholder="Choose an Product"
            onChange={handleChange}
            accept="image/*"
          />
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            required
            onChange={(e) => handleProduct(e)}
          />
          <input
            type="number"
            placeholder="Product Full Price"
            name="fullprice"
            required
            onChange={(e) => {
              handleProduct(e);
            }}
          />
          <input
            type="number"
            placeholder="Product Half Price"
            name="halfprice"
            required
            onChange={(e) => {
              handleProduct(e);
            }}
          />
          <select
            name="foodType"
            id=""
            required
            onChange={(e) => {
              handleProduct(e);
            }}
          >
            <option unselectable="">Choose Product Type</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner </option>
            <option value="BreakFast">BreakFast</option>
          </select>
          <input
            type="text"
            placeholder="Dish"
            name="food"
            required
            onChange={(e) => {
              handleProduct(e);
            }}
          />
          <input
            type="text"
            placeholder="Description"
            name="desc"
            required
            onChange={(e) => {
              handleProduct(e);
            }}
          />

          <button type="sumbit">Submit</button>
        </form>
      </div>
    </div>
  );
};
