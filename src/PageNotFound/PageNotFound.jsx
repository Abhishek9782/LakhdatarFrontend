import { useLocation } from "react-router-dom";

// import React from "react";
const PageNotFound = () => {
  const location = useLocation();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        src="https://lottie.host/embed/ab79dd6d-91c8-4dee-b099-66cc26522d5d/dcuGxsKpjP.lottie"
        loop
        autoplay
      />
      <h3
        style={{
          color: "black",
          fontFamily: "serif",
          fontWeight: "600",
        }}
      >
        {" "}
        Page Not Found{" "}
      </h3>
    </div>
  );
};
export default PageNotFound;
