import React, { useEffect, useState } from "react";
import "./FeaturedProducts.css";
import axios from "axios";
import { cartAdd, cartClear, cartQuantityHandle } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export const Featuredproducts = () => {
  const [FeatureProducts, setFeatureProducts] = useState([]);
  const carts = useSelector((state) => state.carts.carts);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getFeatureData = async () => {
    const res = await axios
      .get("http://localhost:5000/food/featureProducts")
      .catch((error) => {
        console.log(error);
      });
    if (res.data) {
      setFeatureProducts(res.data);
    }
  };
  //  Use effects to get data

  useEffect(() => {
    getFeatureData();
  }, []);

  const handleCart = (e, data) => {
    // console.log(data);
    e.preventDefault();
    // this situatuon user in not login
    if (user === null) {
      if (carts === null) {
        const createarrayforcart = [data];
        dispatch(cartAdd(createarrayforcart));
        dispatch(cartQuantityHandle(1));
      } else {
        // console.log(carts);
        const addcart = [...carts, data];
        console.log(addcart);
        dispatch(cartAdd(addcart));
        dispatch(cartQuantityHandle(1));
      }
    } else {
      if (carts !== null) {
        console.log("carts!==null");
        const addtocart = async () => {
          const res = await axios
            .post(`http://localhost:5000/user-cart-add/${user._id}`, data)
            .catch((error) => {
              console.log(error);
            });
          if (res.data) {
            console.log(res.data);
            dispatch(cartClear(null));
            dispatch(cartQuantityHandle(1));
          }
        };
        addtocart();
      } else {
        const addtocart = async () => {
          console.log("carts==null");
          const res = await axios
            .post(`http://localhost:5000/user-cart-add/${user._id}`, data)
            .catch((error) => {
              console.log(error);
            });

          if (res.data) {
            console.log("I have no localstorage ", res.data);
            dispatch(cartQuantityHandle(1));
          }
        };
        addtocart();
      }
    }
  };

  return (
    <>
      <div className="FpContainer">
        <div className="fpchildcontainer">
          <h3 className="fpHead">Featured Products </h3>
          <div className="fpcards">
            {FeatureProducts.map((data) => (
              <div className="fpcard" data-aos="flip-up" key={data._id}>
                <img src={data.src} alt="" />
                <div className="fpdetails">
                  <div className="fptop">
                    <h3>{data.name} </h3>
                    <img
                      className="fptopimage"
                      src="https://i.pinimg.com/originals/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.png"
                      alt=""
                    />
                  </div>
                  <span className="feature-rating">
                    {data.rating} <i className="fa-regular fa-star"></i>
                  </span>
                  <div className="fpbottom">
                    <button
                      onClick={(e) => {
                        handleCart(e, data);
                      }}
                    >
                      Add To cart
                    </button>
                    <span>{data.price}₹</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
