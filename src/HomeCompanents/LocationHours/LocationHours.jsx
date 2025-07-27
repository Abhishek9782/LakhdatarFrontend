import React from "react";
import "./LocationHours.css";

const LocationHours = () => {
  return (
    <section className="location-hours-section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-title">
            Visit <span className="highlight">Lakhdatar</span> in Jaipur
          </h2>
          <p className="section-subtitle">
            Experience authentic Rajasthani vegetarian cuisine at our welcoming
            restaurant
          </p>
        </div>

        <div className="row g-4" style={{ width: "100%" }}>
          <div className="col-lg-6">
            <div className="info-card address-card">
              <div className="card-header">
                <i className="bi bi-geo-alt-fill"></i>
                <h3 className="card-title">Our Location</h3>
              </div>
              <div className="card-body">
                <address>
                  <strong>Lakhdatar Restaurant</strong>
                  <br />
                  MUND MARKET, MAHARANI GARDAN ROAD, opp. INDIAN BANK, Manyawas,
                  Mohru Nagar
                  <br />
                  Jaipur, Rajasthan 302020
                  <br />
                  <br />
                  <div className="contact-item">
                    <i className="bi bi-telephone-fill"></i>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope-fill"></i>
                    <a href="mailto:info@lakhdatarestaurant.com">
                      info@lakhdatarestaurant.com
                    </a>
                  </div>
                </address>

                <div className="map-container mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d846.0683101472663!2d75.73973826736983!3d26.863805209595185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1753616463414!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: "0px" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Lakhdatar Restaurant Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="info-card hours-card">
              <div className="card-header">
                <i className="bi bi-clock-fill"></i>
                <h3 className="card-title">Opening Hours</h3>
              </div>
              <div className="card-body">
                <ul className="hours-list">
                  <li>
                    <span className="day">Monday - Friday</span>
                    <span className="hours">10:00 AM - 11:00 PM</span>
                  </li>
                  <li>
                    <span className="day">Saturday - Sunday</span>
                    <span className="hours">9:00 AM - 11:30 PM</span>
                  </li>
                </ul>

                <div className="special-note mt-4">
                  <i className="bi bi-info-circle-fill"></i>
                  <p>
                    We remain open on all public holidays with special festive
                    menus!
                  </p>
                </div>

                <div className="holiday-hours mt-3">
                  <h4>Festival Hours:</h4>
                  <ul>
                    <li>Diwali: 8:00 AM - 12:00 AM</li>
                    <li>Holi: 9:00 AM - 10:00 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHours;
