import React from "react";
import "./Offers.css";

const Offers = () => {
  return (
    <section className="offersSection" id="special-offers">
      <div className="parent-content">
        {/* Left Side - Offer List */}
        <div className="leftCotent">
          <header className="headLeftContent">
            <h2>From The Menu</h2>
            <h3>Special Vegetarian Offers</h3>
          </header>

          {/* Dish 1 */}
          <article className="listLeftContent" data-aos="fade-up-right">
            <figure className="listimg">
              <img
                src="https://images.pexels.com/photos/9609842/pexels-photo-9609842.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Matar Paneer at Lakhdatar Restaurant Jaipur"
              />
            </figure>
            <div className="listdesc">
              <h4>Matar Paneer</h4>
              <p>
                Enjoy the rich and creamy Matar Paneer made with fresh peas,
                paneer, and aromatic spices — a favorite vegetarian dish in
                Jaipur.
              </p>
            </div>
            <div className="listprice">
              <button aria-label="Order Matar Paneer - ₹250">₹250</button>
            </div>
          </article>

          {/* Dish 2 */}
          <article className="listLeftContent" data-aos="fade-up-right">
            <figure className="listimg">
              <img
                src="https://images.pexels.com/photos/10345736/pexels-photo-10345736.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Paneer Lababdar with Malai at Lakhdatar Restaurant"
              />
            </figure>
            <div className="listdesc">
              <h4>Paneer Lababdar With Malai</h4>
              <p>
                A royal vegetarian delight – our Paneer Lababdar with Malai is
                perfect for those who love creamy, spiced gravies with soft
                paneer cubes.
              </p>
            </div>
            <div className="listprice">
              <button aria-label="Order Paneer Lababdar - ₹250">₹250</button>
            </div>
          </article>

          {/* Dish 3 */}
          <article className="listLeftContent" data-aos="flip-left">
            <figure className="listimg">
              <img
                src="https://images.pexels.com/photos/10580197/pexels-photo-10580197.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Lakhdatar Special Vegetarian Thali in Jaipur"
              />
            </figure>
            <div className="listdesc">
              <h4>Lakhdatar Special Dish</h4>
              <p>
                Our signature pure veg dish featuring a premium Rajasthani
                thali, packed with traditional flavors and served with love in
                Jaipur.
              </p>
            </div>
            <div className="listprice">
              <button aria-label="Order Lakhdatar Special Dish - ₹1250">
                ₹1250
              </button>
            </div>
          </article>
        </div>

        {/* Right Side - Carousel */}
        <aside className="rightContent" data-aos="flip-right">
          <div
            id="carouselExampleIndicators"
            className="carousel slide cursol_head"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner curouselhead">
              <div className="carousel-item active">
                <img
                  src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block cursol_image"
                  alt="Vegetarian Rajasthani Cuisine - Lakhdatar Restaurant"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block cursol_image"
                  alt="Family Dining at Pure Veg Restaurant in Jaipur"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="d-block cursol_image"
                  alt="Special Offer on Veg Meals in Jaipur"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Offers;
