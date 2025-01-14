import React, { useEffect, useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartClear, cartQuantityHandle } from "../../store/cartSlice";
import { FavCheck } from "../../store/FavPSlice";

export const Menu = () => {
  const carts = useSelector((state) => state.carts.carts);
  const user = useSelector((state) => state.user.user);
  const faviorateProduct = useSelector((state) => state.favprod.favProduct);

  const dispatch = useDispatch();

  const [food, setFood] = useState([]);
  const [loading, setloading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setnextPage] = useState(true);

  //  fetch data according page
  let limit = 15;
  let skip = (pageNum - 1) * limit;
  //here we get all products from database
  const GetProducts = async () => {
    const res = await axios.get(
      `https://lakahdatarbackend.onrender.com/food/?limit=${limit}&skip=${skip}`
    );
    setFood(true);
    if (res.data) {
      setFood(res.data.allProducts);
      setloading(false);
      setnextPage(res.data.hasNextPage);
    }
  };

  useEffect(() => {
    GetProducts();
  }, [pageNum]);

  // Onclick evenet handle after some time
  function handleMenu(e, type) {
    e.preventDefault();
    //  Here i use foreach to change all element on class FoodType
    let parentFood = document.getElementById("foodTypeparent");
    parentFood.childNodes.forEach((elem) => {
      elem.className = "foodType";
    });
    //  After save foodType i add on that element class which one i clicked
    e.target.className = "foodtype active";
    const getFilteredProduct = async () => {
      const res = await axios.get(
        `https://lakahdatarbackend.onrender.com/food/type/${type}`
      );
      if (res.data) {
        setFood(res.data);
      }
    };
    getFilteredProduct();
  }

  //  Here we are hanlde cart

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

  //  Handle Faviorate product
  function handleFavProduct(e, id) {
    if (faviorateProduct.includes(id)) {
      // setFavCheck(false);
      const filterFrpoduct = faviorateProduct.filter((data) => {
        return data !== id;
      });
      dispatch(FavCheck(filterFrpoduct));
    } else {
      // setFavCheck(true);
      dispatch(FavCheck([...faviorateProduct, id]));
    }
  }

  function handlePage(type) {
    if (type == "Decrease") {
      if (pageNum > 1) {
        setPageNum(pageNum - 1);
      }
    } else if (type == "increament") {
      setPageNum(pageNum + 1);
    }
  }

  return (
    <div>
      {/*  Here we pass background remove our background in menu bar */}
      <div data-aos="fade-up" className="menusection">
        <h3>Here is our menu section</h3>
        <div className="menuslider">
          <div className="menubar" id="foodTypeparent">
            <span
              className="foodtype "
              onClick={(e) => {
                handleMenu(e, "BreakFast");
              }}
            >
              BreakFast
            </span>
            <span
              className="foodtype"
              onClick={(e) => {
                handleMenu(e, "Launch");
              }}
            >
              Launch
            </span>
            <span
              className="foodtype"
              onClick={(e) => {
                handleMenu(e, "Dinner");
              }}
            >
              Dinner
            </span>
            <span
              className="foodtype"
              onClick={(e) => {
                handleMenu(e, "ourspecial");
              }}
            >
              Our Special
            </span>
            <span
              className="foodtype"
              onClick={(e) => {
                handleMenu(e, "paneerspecial");
              }}
            >
              Paneer special
            </span>
          </div>
          <h3 className="apperance">Apperance</h3>
          {/*  Items are here you can use here your data to add menu here  */}
          {loading && (
            <div className="empty-food-container">
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
              <h2>Please Wait Food Is Loading ...</h2>
            </div>
          )}
          {food.length > 0 ? (
            <div className="menuitem">
              {food.map((food) => (
                <div div key={food._id}>
                  <div className="item">
                    <Link to={`/menu/${food._id}`} className="img">
                      <img src={food.src} alt="" />
                    </Link>
                    <div className="fav-heart">
                      {faviorateProduct.includes(food._id) ? (
                        <i
                          class="fa-solid fa-heart"
                          style={{ color: "red" }}
                          onClick={(e) => {
                            handleFavProduct(e, food._id);
                          }}
                        ></i>
                      ) : (
                        <i
                          class="fa-regular fa-heart"
                          onClick={(e) => {
                            user
                              ? handleFavProduct(e, food._id)
                              : alert("Please Login Your Account ");
                          }}
                        ></i>
                      )}
                    </div>
                    <div className="details">
                      <h3>{food.name}</h3>
                      <span>{food.food}</span>
                      {food.rating > 3 ? (
                        <>
                          <div className="rating">
                            {food.rating}
                            <i className="fa-regular fa-star"></i>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="rating">New</div>
                        </>
                      )}
                    </div>
                    <div className="price">
                      {/* Full  And Half buttons right now i didn't work on it that's why i comment it  */}
                      <div className="buttons">
                        {/* <div className="quantity">
                          <span className="">Full </span>
                          <span className="">Half</span>
                        </div> */}
                        <div className="cart">
                          <span>₹ {food.price}</span>
                          <div
                            className="cart-button"
                            onClick={(e) => {
                              handleCart(e, food);
                            }}
                          >
                            Add to cart
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-food-container">
              <h2>Currently Not available</h2>
            </div>
          )}
        </div>
      </div>
      <nav
        aria-label="Page navigation example"
        style={{ display: "flex", justifyContent: "end", marginRight: "50px " }}
      >
        <ul class="pagination">
          <li class="page-item" onClick={() => handlePage("Decrease")}>
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              {pageNum}
            </a>
          </li>

          {nextPage ? (
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                onClick={() => handlePage("increament")}
              >
                Next
              </a>
            </li>
          ) : (
            <li class="page-item">
              <a class="page-link" href="#" disabled>
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
