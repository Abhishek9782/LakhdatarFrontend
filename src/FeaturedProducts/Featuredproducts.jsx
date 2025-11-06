import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./FeaturedProducts.css";
import { cartAdd, cartClear, cartQuantityHandle } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosGet, axiosPost, imageUrl } from "../axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { axiosRequest, userEndPoints } from "../utils/baseUrl";

const Featuredproducts = () => {
  const [FeatureProducts, setFeatureProducts] = useState([]);
  const [loader, setloader] = useState(false);
  const carts = useSelector((state) => state.carts.carts);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getFeatureData = useCallback(async () => {
    setloader(true);
    const res = await axiosRequest(
      "user",
      "get",
      userEndPoints.FeatureProducts
    );
    if (res.success) {
      setloader(false);
      setFeatureProducts(res.data?.data);
    }
  }, []);

  //  Use effects to get data
  useEffect(() => {
    getFeatureData();
  }, [getFeatureData]);

  // handle cart section
  async function handleCart(e, id) {
    e.preventDefault();
    if (user == null) {
      dispatch(cartAdd(id));
      dispatch(cartQuantityHandle(1));
    } else {
      const res = await axiosPost(`addToCart/${id}`).catch((err) => {
        if (err) {
          toast.error(err.message);
        }
      });
      if (res.status) {
        toast.success(res.message);
        dispatch(cartQuantityHandle(1));
      }
    }
  }
  return (
    <>
      <div className="FpContainer">
        <div className="fpchildcontainer">
          <h3 className="fpHead">Featured Products </h3>
          <div className="fpcards">
            {FeatureProducts.map((data) => (
              <div
                className="fpcard"
                data-aos="flip-up"
                data-aos-offset="50"
                data-aos-duration="1"
                key={data._id}
                loading="Lazy"
              >
                {/* for locally we use this */}
                <img
                  src={data.src}
                  alt={`${data?.name} - Lakhdatar Restaurant Jaipur `}
                  loading="lazy"
                />

                <div className="fpdetails">
                  <div className="fptop">
                    <h3>{data.name} </h3>
                    <img
                      className="fptopimage"
                      src="https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <span className="feature-rating">
                    {data.rating} <i className="fa-regular fa-star"></i>
                  </span>
                  <div className="fpbottom">
                    <button
                      onClick={(e) => {
                        handleCart(e, data._id);
                      }}
                    >
                      Add To cart
                    </button>
                    <span>{data.halfprice}₹</span>
                  </div>
                </div>
              </div>
            ))}

            {loader && (
              <svg className="svg-loader" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Featuredproducts;
