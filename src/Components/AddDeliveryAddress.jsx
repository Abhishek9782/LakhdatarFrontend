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
export const AddDeliveryAddress = ({
  handleaddressField,
  handleSubmit,
  deliveryAddress,
  handleChange,
  errors,
}) => {
  const inputFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter Your Full Name",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "number",
      placeholder: "Enter Your Mobile No.",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Street",
    },
    { name: "city", label: "City", type: "text", placeholder: "City" },
    { name: "state", label: "State", type: "text", placeholder: "State" },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Postal Code",
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Country",
    },
  ];
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
        <form>
          {inputFields.map(({ name, label, type, placeholder }) => (
            <div className="form-group" key={name}>
              <label>
                {label}
                {/* Show error if exists for this field */}
                {errors[name] && (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "0.9em",
                    }}
                  >
                    {errors[name]}
                  </span>
                )}
              </label>

              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={deliveryAddress[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Save
          </button>
        </form>
      </div>
    </DeliveryAddresss>
  );
};
