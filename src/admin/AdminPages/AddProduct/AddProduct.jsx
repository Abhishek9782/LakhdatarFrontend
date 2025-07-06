import React, { useState } from "react";
import "./AddProduct.css";
import { axiosPost } from "../../../axios";
import { toast, Bounce } from "react-toastify";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";
import { Circles } from "react-loader-spinner";

export const AddProduct = ({ setIsAdd, getAllproducts }) => {
  const [product, setProduct] = useState({
    name: "",
    fullprice: "",
    halfprice: "",
    foodType: "",
    food: "",
    desc: "",
  });

  const [file, setFile] = useState(null);
  const [cookies] = useCookies(["jwt"]);
  const [loading, setLoading] = useState(false);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (file) {
        await new Promise((resolve, reject) => {
          new Compressor(file, {
            quality: 0.6,
            maxWidth: 800,
            success(compressedFile) {
              formData.append("src", compressedFile);
              resolve();
            },
            error(err) {
              console.error("Image compression failed:", err.message);
              reject(err);
            },
          });
        });
      }

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
          theme: "light",
          transition: Bounce,
        });

        setIsAdd(false);
        getAllproducts();
      } else if (res.response?.data?.message) {
        toast.error(res.response.data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-productparent">
      {loading ? (
        <div className="loader-container">
          <Circles height="60" width="60" color="#4fa94d" ariaLabel="loading" />
          <p className="loader-message">Adding product...</p>
        </div>
      ) : (
        <div className="form-box">
          <span className="closebtn" onClick={() => setIsAdd(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>

          <form onSubmit={handleSubmit}>
            <h2>Please Fill Product Details</h2>

            <input
              type="file"
              name="src"
              placeholder="Choose a Product Image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />

            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={product.name}
              onChange={handleProductChange}
              required
            />

            <input
              type="number"
              placeholder="Full Price"
              name="fullprice"
              value={product.fullprice}
              onChange={handleProductChange}
              required
            />

            <input
              type="number"
              placeholder="Half Price"
              name="halfprice"
              value={product.halfprice}
              onChange={handleProductChange}
              required
            />

            <select
              name="foodType"
              value={product.foodType}
              onChange={handleProductChange}
              required
            >
              <option value="" disabled>
                Choose Product Type
              </option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="BreakFast">Breakfast</option>
            </select>

            <input
              type="text"
              placeholder="Dish Name"
              name="food"
              value={product.food}
              onChange={handleProductChange}
              required
            />

            <input
              type="text"
              placeholder="Description"
              name="desc"
              value={product.desc}
              onChange={handleProductChange}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};
