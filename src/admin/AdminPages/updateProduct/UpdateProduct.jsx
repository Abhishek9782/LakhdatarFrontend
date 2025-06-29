import React, { useState } from "react";
import "./UpdateProduct.css";
import { axiosPost, imageUrl } from "../../../axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export const UpdateProduct = ({ product, getAllProducts, hide }) => {
  const [image, setImage] = useState("");
  const [cookies] = useCookies(["jwt"]);

  const [formData, setFormData] = useState({
    name: product.name,
    fullprice: product.fullprice,
    halfprice: product.halfprice,
    foodType: product.foodType,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      formData.src = image[0];
    }
    const res = await axiosPost(
      `lakhdatar/admin/product/updateproduct/${product._id}`,
      formData,
      true
    );
    if (res.response?.data) {
      toast.error(res.response.data.message);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: res.response.data.message,
      // });
    }

    if (res.status) {
      Swal.fire({
        icon: "success",
        text: res.message,
      }).then(() => {
        getAllProducts();
        hide(null);
      });
    }
  };

  return (
    <div className="update-product-modal">
      <div className="update-product-content">
        <button className="close-btn" onClick={() => hide(null)}>
          &times;
        </button>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          {/* {console.log(formData)} */}
          <label>
            Upload Image
            <input
              type="file"
              name="src"
              value={formData.src}
              onChange={(e) => setImage(e.target.files)}
            />
          </label>
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Full Price
            <input
              type="number"
              name="fullprice"
              value={formData.fullprice}
              onChange={handleChange}
            />
          </label>
          <label>
            Half Price
            <input
              type="number"
              name="halfprice"
              value={formData.halfprice}
              onChange={handleChange}
            />
          </label>

          <label>
            Food Type
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
