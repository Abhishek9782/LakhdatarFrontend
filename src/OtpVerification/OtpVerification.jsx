import React, { useState } from "react";
import "./OtpVerification.css";
import { Link } from "react-router-dom";
const OtpVerification = () => {
  // State to hold OTP input values
  const [otp, setOtp] = useState(Array(6).fill("")); // Assuming a 6-digit OTP
  const [isValid, setIsValid] = useState(true); // Validation state

  // Handle change for each OTP input field
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Ensure only digits are entered

    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus the next field if the current field is filled
    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if OTP is valid (i.e., all fields are filled)
    if (otp.some((digit) => digit === "")) {
      setIsValid(false);
      return;
    }

    // Submit the OTP (you can replace this with actual logic to verify the OTP)
    console.log("OTP Submitted:", otp.join(""));
    setIsValid(true);
    // Reset OTP or handle further logic here
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="otp-input"
            />
          ))}
        </div>
        <Link to="/resendOtp">Resend Otp </Link>
        {!isValid && <p className="error-message">Please enter a valid OTP</p>}
        <button type="submit" className="submit-button">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
