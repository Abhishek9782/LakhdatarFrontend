import React from "react";
import styled from "styled-components";

const DeliveryAddresss = styled.div`
  color: black;
  background-color: white;
  width: 100%;
  padding: 30px;
  font-family: "kanit";
  font-size: 20px;
  position: relative;
  box-shadow: 2px 2px 5px #999;
  cursor: pointer;
  //
`;
const AddresIcon = styled.span`
  border: 2px solid black;
  padding: 5px;
  position: absolute;
  left: -20px;
  background-color: black;
  top: 20px;
  cursor: pointer;
`;

export const SavedDeliveryAddress = () => {
  return (
    <DeliveryAddresss
      onClick={(e) => {
        handleaddressField(e);
      }}
    >
      Delivery Address
      <AddresIcon>
        <i className="fa-solid fa-location-dot" style={{ color: "white" }}></i>
      </AddresIcon>
      <div className="form-container" id="AddressField">
        <h2>Address Form</h2>
      </div>
    </DeliveryAddresss>
  );
};
