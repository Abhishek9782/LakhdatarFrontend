import React from "react";
import "./WhyChoose.css";

const WhyChooseUs = () => {
  return (
    <section className="why-us-section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-title">
            Why Choose <span className="highlight">Lakhdatar</span> Restaurant?
          </h2>
          <p className="section-subtitle">
            As Jaipur's premier vegetarian restaurant, we focus on purity,
            taste, and authentic local experience. Here's what makes us special:
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-egg-fill"></i>
              </div>
              <h3 className="feature-title">100% Pure Veg</h3>
              <p className="feature-description">
                No egg, no meat – just clean, vegetarian food crafted with care
                and premium ingredients.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-basket-fill"></i>
              </div>
              <h3 className="feature-title">Authentic Rajasthani Thalis</h3>
              <p className="feature-description">
                Experience flavors of Rajasthan with traditional recipes passed
                down through generations.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-truck"></i>
              </div>
              <h3 className="feature-title">Quick Delivery Across Jaipur</h3>
              <p className="feature-description">
                Fast, reliable delivery service to bring our delicious food to
                your doorstep.
              </p>
            </div>
          </div>

          {/* Additional features for better visual balance */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-star-fill"></i>
              </div>
              <h3 className="feature-title">Premium Quality Ingredients</h3>
              <p className="feature-description">
                We source only the freshest, highest quality ingredients for
                every dish.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h3 className="feature-title">Family-Friendly Atmosphere</h3>
              <p className="feature-description">
                A warm, welcoming environment perfect for family dining.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-award-fill"></i>
              </div>
              <h3 className="feature-title">Award-Winning Recipes</h3>
              <p className="feature-description">
                Recognized for excellence in vegetarian Rajasthani cuisine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
