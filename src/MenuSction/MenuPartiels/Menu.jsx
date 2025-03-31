import React, { useCallback, useEffect, useState, useMemo } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FavCheck } from "../../store/FavPSlice";
import { axiosGet, axiosPost, imageUrl } from "../../axios";
import { toast } from "react-toastify";
import { useJwt } from "react-jwt";

const Menu = () => {
  const user = useSelector((state) => state.user.user);
  const favoriteProducts = useSelector((state) => state.favprod.favProduct);
  const dispatch = useDispatch();

  const jwtVerify = useJwt(user);
  const userId = jwtVerify.decodedToken?.id || null;

  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [activeType, setActiveType] = useState(null);

  const pageSize = 15;

  const GetProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosPost("food/", { pageNumber: pageNum, pageSize });
      if (res.status === 1) {
        setFood(res.data.data);
        setNextPage(res.data.hasNextPage);
      }
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  }, [pageNum]);

  useEffect(() => {
    GetProducts();
  }, [GetProducts]);

  const handleMenu = useCallback(async (e, type) => {
    e.preventDefault();
    setActiveType(type);

    setLoading(true);
    const res = await axiosGet(`food/type/${type}`);

    if (res.status == 1) {
      setFood(res.data);
      setLoading(false);
    }

    if (res.error) {
      toast.error(res.error.message);
      setFood([]);
      setLoading(false);
    }
  }, []);

  const handleFavProduct = useCallback(
    (e, id) => {
      e.preventDefault();
      dispatch(
        FavCheck(
          favoriteProducts.includes(id)
            ? favoriteProducts.filter((prod) => prod !== id)
            : [...favoriteProducts, id]
        )
      );
    },
    [favoriteProducts, dispatch]
  );

  const handlePage = useCallback(
    (type) => {
      setPageNum((prev) =>
        type === "Decrease" && prev > 1
          ? prev - 1
          : type === "Increase" && nextPage
          ? prev + 1
          : prev
      );
    },
    [nextPage]
  );

  return (
    <div>
      <div data-aos="fade-up" className="menusection">
        <h3>Here is our menu section</h3>
        <div className="menuslider">
          <div className="menubar" id="foodTypeparent">
            {[
              "BreakFast",
              "Lunch",
              "Dinner",
              "Our Special",
              "Paneer Special",
            ].map((type) => (
              <span
                key={type}
                className={`foodtype ${activeType === type ? "active" : ""}`}
                onClick={(e) => handleMenu(e, type)}
              >
                {type}
              </span>
            ))}
          </div>

          {loading ? (
            <div className="empty-food-container">
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
              <h2>Please Wait, Food Is Loading...</h2>
            </div>
          ) : food.length > 0 ? (
            <div className="menuitem">
              {food.map((foodItem) => (
                <div key={foodItem._id} className="item">
                  <Link to={`/menu/${foodItem._id}`} className="img">
                    <img
                      src={`${imageUrl}/${foodItem.src}`}
                      alt=""
                      loading="lazy"
                    />
                  </Link>
                  <div className="fav-heart">
                    <i
                      className={`fa-${
                        favoriteProducts.includes(foodItem._id)
                          ? "solid"
                          : "regular"
                      } fa-heart`}
                      style={{
                        color: favoriteProducts.includes(foodItem._id)
                          ? "red"
                          : "inherit",
                      }}
                      onClick={(e) => handleFavProduct(e, foodItem._id)}
                    ></i>
                  </div>
                  <div className="details">
                    <h3>{foodItem.name}</h3>
                    <span>{foodItem.food}</span>
                    <div className="rating">
                      {foodItem.rating > 3 ? `${foodItem.rating} ⭐` : "New"}
                    </div>
                  </div>
                  <div className="price">
                    <div className="buttons">
                      <div className="quantity">
                        <span className="qty_active">Full</span>
                        <span>Half</span>
                      </div>
                      <div className="cart">
                        <span>₹ {foodItem.fullprice}</span>
                        <div className="cart-button">Add to cart</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-food-container">
              <h2>Currently Not Available</h2>
            </div>
          )}
        </div>
      </div>

      <nav aria-label="Page navigation" className="pagination-container">
        <ul className="pagination">
          <li className="page-item" onClick={() => handlePage("Decrease")}>
            Previous
          </li>
          <li className="page-item">{pageNum}</li>
          <li className="page-item" onClick={() => handlePage("Increase")}>
            {nextPage ? "Next" : "Next (Disabled)"}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
