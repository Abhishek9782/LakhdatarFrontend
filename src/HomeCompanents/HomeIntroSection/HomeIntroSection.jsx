import React from "react";
import "./HomeIntroSection.css"; // We'll create custom styles here

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="text-section p-4 p-lg-5">
              <h1 className="display-4 fw-bold mb-4 main-heading">
                Pure Veg Restaurant in Jaipur –{" "}
                <span className="highlight">Lakhdatar Restaurant</span>
              </h1>
              <p className="lead mb-4 content">
                Welcome to Lakhdatar Restaurant – Jaipur's premier vegetarian
                dining destination
              </p>
              <div className="features mb-4">
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Authentic Rajasthani Thalis</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Creamy Paneer Specialties</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Tandoori Delights</span>
                </div>
              </div>
              <p className="mb-4">
                We use fresh ingredients and traditional recipes to bring you an
                authentic dining experience in a cozy, family-friendly
                atmosphere.
              </p>
              <div className="cta-buttons">
                <button className="btn btn-primary me-3 px-4 py-2">
                  Visit Us Today
                </button>
                <button className="btn btn-outline-secondary px-4 py-2">
                  Order Online
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-lg-2 order-1 mb-4 mb-lg-0">
            <div className="image-container">
              <img
                src="https://images.pexels.com/photos/10580197/pexels-photo-10580197.jpeg"
                className="img-fluid rounded-3 shadow-lg hero-image"
                alt="Lakhdatar Pure Veg Restaurant Interior"
                loading="lazy"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
