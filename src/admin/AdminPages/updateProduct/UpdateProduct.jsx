import React, { useState } from "react";
import "./UpdateProduct.css";
import { axiosPost, imageUrl } from "../../../axios";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { Circles } from "react-loader-spinner";
import Compressor from "compressorjs";
import { ImageSelectable } from "../../../utils/baseUrl";

export const UpdateProduct = ({ product, getAllProducts, hide }) => {
  const [image, setImage] = useState("");
  const [cookies] = useCookies(["jwt"]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // show loader

    try {
      if (image && image[0]) {
        await new Promise((resolve, reject) => {
          new Compressor(image[0], {
            quality: 0.6,
            maxWidth: 800,
            success(result) {
              formData.src = result;
              resolve();
            },
            error(err) {
              console.error("Compression error:", err);
              reject(err);
            },
          });
        });
      }
      const res = await axiosPost(
        `/admin/product/updateproduct/${product._id}`,
        formData,
        true
      );

      if (res.response?.data) {
        toast.error(res.response.data.message);
      }

      if (res.status) {
        toast.success(res.message);
        getAllProducts();
        hide(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // hide loader after everything
    }
  };

  return (
    <div className="update-product-modal">
      <div className="update-product-content">
        {!loading && (
          <button className="close-btn" onClick={() => hide(null)}>
            &times;
          </button>
        )}
        <h2>Update Product</h2>

        {loading ? (
          <div className="loader-container">
            <Circles
              height="60"
              width="60"
              color="#4fa94d"
              ariaLabel="loading"
            />
            <p className="loader-message">
              Please wait Product is updating...{" "}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
              Upload Image
              <input
                type="file"
                name="src"
                onChange={(e) => setImage(e.target.files)}
                accept={ImageSelectable}
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
        )}
      </div>
    </div>
  );
};
