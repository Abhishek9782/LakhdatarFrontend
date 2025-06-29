import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Await, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import axios from "axios";

import { cartQuantityHandle } from "../store/cartSlice";
import { axiosGet, axiosPost, imageUrl } from "../axios";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

//  This is our all styled Components of any component
const CartBody = styled.div`
  width: 100%;
  background-color: #9999996a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CartSection = styled.div`
  height: auto;
  /* height: 100vh; */
  max-height: max-content;
  width: 100%;
  max-width: 1244px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
  top: 80px;
  margin-bottom: 100px;
`;
const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  gap: 30px;
  padding: 10px;
  width: 70%;
`;
const RightPart = styled.div`
  color: black;
  width: 30%;
`;
const IsAccount = styled.div`
  color: black;
  background-color: red;
  width: 100%;
  height: auto;
`;
const MainIsaccount = styled.div`
  background-color: white;
  padding: 30px;
  display: flex;
  flex-direction: row;
  position: relative;
  box-shadow: 2px 2px 5px #999;
`;
const MainAccHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
  position: relative;
`;
const MainAccH3 = styled.h3`
  color: black;
  font-family: "kanit";
  font-size: 20px;
  margin: 0px;
`;
const MainAccSpan = styled.span`
  color: black;
  font-size: 16px;
  font-family: "sans-serif";
  margin: 0px;
`;
const MainAccButttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px 0px;
`;
const MainAccAnkertag = {
  color: "green",
  border: " 2px solid green",
  padding: "2px 10px",
  cursor: "pointer",
  textDecoration: "none",
};
const MAccinnerButton = styled.span`
  display: block;
  color: green;
  text-align: center;
  border-top: 2px solid green;
`;
const MainAccImageP = styled.div`
  width: 30%;
`;
const MainAccImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  opacity: 0.9;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const MainAccIcon = styled.span`
  color: black;
  position: absolute;
  left: -20px;
  top: 40%;
  border: 2px solid black;
  padding: 5px;
  background-color: black;
  cursor: pointer;
`;

const DeliveryAddress = styled.div`
  color: black;
  background-color: white;
  width: 100%;
  padding: 30px;
  font-family: "kanit";
  font-size: 20px;
  position: relative;
  box-shadow: 2px 2px 5px #999;
  cursor: pointer;
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
const Payment = styled.div`
  color: black;
  background-color: white;
  width: 100%;
  padding: 30px;
  font-family: "kanit";
  font-size: 20px;
  position: relative;
  box-shadow: 2px 2px 5px #999;
`;
const PaymentIcon = styled.span`
  border: 2px solid black;
  padding: 5px;
  position: absolute;
  left: -20px;
  background-color: black;
  top: 20px;
  cursor: pointer;
`;
//  Right part css is here for understanding
const RImagHead = styled.div`
  width: 100%;
  background-color: white;
  padding: 40px;
  margin: 10px 0px 0px 0px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  box-shadow: 2px 2px 5px #9999999b;
  align-items: center;
`;
const RImgParent = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #99999986;
`;
const RImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
const RHeadParent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;
const RHeadH3 = styled.h3`
  font-size: 18px;
  color: black;
  margin-bottom: 0px;
  font-family: "kanit";
`;
const RHeadSpan = styled.span`
  color: black;
  font-family: sans-serif;
  font-size: 15px;
  border-bottom: 2px solid black;
`;
//  For CartItem css is here to understand
const CartItem = styled.div`
  background-color: white;
  padding: 20px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 1px 0px 1px 0px;
`;
const CartImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 2%;
  margin: 0px 30px 0px 0px;
`;
const CartItemName = styled.h3`
  font-size: 15px;
  margin-bottom: 0px;
  color: black;
  font-family: "kanit";
  flex: 2;
`;
const CartItemQuantity = styled.div`
  /* background-color: yellow; */
  /* padding: 0px 10px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  color: black;
  flex: 1;
  border: 2px solid black;
`;
const CartItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-align: end;
  flex: 2;
  position: relative;
`;
//  Bill Details are here
const BillDeatils = styled.div`
  background-color: white;
  padding: 20px 20px;
`;
const BillDeatilsH3 = styled.h3`
  font-size: 15px;
  font-family: "Kanit";
  color: black;
  position: relative;
  left: 40px;
`;
const BillDetilsHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BillDeatilSpans = styled.div``;
const BillDeatilSpan = styled.span`
  display: block;
  color: black;
  margin: 5px 0px;
  font-size: 14px;
  font-family: sans-serif;
  padding: 5px 0px;
  text-align: start;
`;
// Delivery section is here
const DeliveryDetails = styled.div`
  padding: 0px 20px;
  margin-top: 1px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PaymentSection = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 2px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PaymentSpan = styled.span`
  color: black;
  font-size: 16px;
  font-family: "kanit";
`;

// For overflow on scroll
const OverflowScroll = styled.div`
  height: 58vh;
  overflow: scroll;
  overflow-x: hidden;
`;

// EMPTY CART CSS IS HERE
const EmptyCart = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: black;
`;
const EmptyCartImg = styled.img`
  color: black;
  width: 200px;
  height: auto;
`;
const EmptyCarthead = styled.h3`
  color: black;
  font-family: "knait";
  margin-bottom: 0px;
`;
const EmptyCartSpan = styled.span`
  color: black;
  margin: 10px 0px;
`;
const EmptyCartButton = styled.button`
  color: black;
  padding: 10px 20px;
  background-color: orangered;
  border: 1px solid orangered;
  color: white;
  margin-top: 10px;
`;

//  IF cart is empty then right is also empty
const RightEmptyPart = styled.div`
  background-color: white;
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightEmptyh3 = styled.h3`
  color: black;
  font-family: "knait";
  font-size: 35px;
`;
const RightEmptyImg = styled.img`
  width: 300px;
`;

//  Here is our function

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stateUser = useSelector((state) => state.user.user);
  const stateCarts = useSelector((state) => state.carts.carts);
  const [cartValue, setCartValue] = useState(0);
  const [loader, setLoader] = useState(true);
  const [addclicked, SetaddClicked] = useState(false);
  const [paymentclicked, SetPaymentClicked] = useState(false);
  const [cart, setcart] = useState([]);
  const [deliveryTip, setDeliveryTip] = useState(20);
  const [platfromFees, setplatfromFees] = useState(50);
  const [currentUserId, setCurrentUserId] = useState(jwtDecode(stateUser));
  const [userDetails, setUserDetails] = useState(null);
  const [errors, setErrors] = useState({});

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  //  For getting all carts by user id from databases
  const getCarts = useCallback(async () => {
    const res = await axiosGet(
      `getAllCarts`,
      localStorage.getItem("user")
    ).catch((err) => {
      if (err && err.response.status == 401) {
        toast.error(err.response.data.message);
      }
    });
    setcart(res.data);
    if (res.data !== null) {
      setCartValue(res.data.carts.length);
    } else {
      setCartValue(0);
    }
    setLoader(false);
  }, []); // empty dependency array is correct here

  async function handleDecreaseqty(e, id) {
    const res = await axiosPost(`cartDecreaseQty/${id}`, {
      userId: stateUser._id,
    }).catch((error) => {
      console.log(error);
    });
    if (res?.status) {
      setLoader(false);
      dispatch(cartQuantityHandle(-1));
      getCarts(); // ❗ You missed this earlier
    }
  }

  async function handleIncrement(e, id) {
    const res = await axiosPost(`cartIncreaseQty/${id}`, {
      userId: stateUser._id,
    }).catch((error) => {
      console.log(error);
    });
    if (res?.status) {
      setLoader(false);
      dispatch(cartQuantityHandle(1));
      getCarts(); // ✅ This was already correct
    }
  }

  let totalAmount = 0;
  if (cartValue > 1) {
    for (let i = 0; i < cart?.carts.length; i++) {
      totalAmount += cart?.carts[i]?.price * cart?.carts[i]?.qty;
    }
  } else {
    for (let i = 0; i < cart?.carts?.length; i++) {
      totalAmount += cart?.carts[i]?.price * cart?.carts[i]?.qty;
    }
  }

  const GST = (totalAmount * 5) / 100;

  const finalAmount = totalAmount + GST + deliveryTip + platfromFees;

  //  Delivery address data handle from here--------------------------
  function handleaddressField(e) {
    e.preventDefault();
    document.getElementById("AddressField").style.display = "Block";
  }
  function handlecloseAddress(e) {
    e.preventDefault();
    document.getElementById("AddressField").style.display = "none";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const isValid = validate();

    if (isValid) {
      console.log("Submitting form...");
      try {
        const res = await axiosPost("/addaddress", deliveryAddress);
        if (res.status) {
          toast.success(res.message);
          document.getElementById("AddressField").style.display = "none";
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    } else {
      console.log("Validation failed", errors);
    }
  };

  //  handle Payment click by event
  function handlePaymentClick(e) {
    // SetPaymentClicked(!paymentclicked);
    // if (paymentclicked) {
    // } else {
    // }
  }
  //  -----------------------get current user details ----------------------

  useEffect(() => {
    getCarts();
  }, [getCarts]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axiosGet(`getProfile/${currentUserId.id}`);
        if (res && res.data) {
          setUserDetails(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [currentUserId.id]);
  // ----------------Payment Integration ----------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        return resolve(true);
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // first we are load script
    const isLoaded = await loadRazorpayScript();

    // not loaded then give us error
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // create order
    const { success, order } = await axiosPost("api/create-payment-order", {
      finalAmount: finalAmount,
      // in future we can optimize it using showing ul all address and by selecting i give that idf
    });

    if (!success || !order?.id) {
      toast.error("Failed to create payment order");
      return;
    }

    const options = {
      key: "rzp_test_sDX2c2fCWsiXsN", // ✅ Use ENV in production
      amount: finalAmount,
      currency: "INR",
      name: userDetails.fullname,
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: userDetails.fullname,
        email: userDetails.email,
        contact: userDetails.mobile,
      },
      theme: {
        color: "#0288d1",
      },
      handler: async (response) => {
        // 2. Verify Payment
        const { success, paymentDetails, paymentMethod } = await axiosPost(
          "api/verify-payment",
          response
        );

        if (!success) {
          toast.error("Payment verification failed");
          return;
        }

        // 3. Save Order
        const saveOrderRes = await axiosPost("/save-order", {
          finalAmount,
          gst: GST,
          deliveryTip,
          platfromFees,
          deliveryAddress: "684481b6a1c6b8d80554fd78",
          razorpay_order_id: paymentDetails.order_id,
          razorpay_payment_id: paymentDetails.id,
          paymentMethod,
        });

        if (saveOrderRes.success) {
          toast.success("Order placed successfully!");
          dispatch(cartQuantityHandle(0));
          navigate(0);
        } else {
          toast.error("Failed to save order");
        }
      },
      modal: {
        ondismiss: () => {
          toast.warn("Payment popup closed.");
        },
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

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
    { name: "address", label: "Address", type: "text", placeholder: "Street" },
    { name: "city", label: "City", type: "text", placeholder: "City" },
    { name: "state", label: "State", type: "text", placeholder: "State" },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Postal Code",
    },
    { name: "country", label: "Country", type: "text", placeholder: "Country" },
  ];

  //  calidation check error
  const validate = () => {
    const newErrors = {};

    if (!deliveryAddress.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!/^\d{10}$/.test(deliveryAddress.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!deliveryAddress.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!deliveryAddress.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!deliveryAddress.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!deliveryAddress.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    }

    if (!deliveryAddress.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors); // Update the errors state

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  return (
    <CartBody>
      {cartValue == 0 && stateUser !== null && (
        <EmptyCart>
          <EmptyCartImg src="./emptyCart.png" alt="Image not found " />
          <EmptyCarthead>Your Cart is Empty</EmptyCarthead>
          <EmptyCartSpan>
            You can go to home page to view more menu
          </EmptyCartSpan>
          <Link to="/menu">
            <EmptyCartButton>SEE RESTAURANT NEAR YOU</EmptyCartButton>
          </Link>
        </EmptyCart>
      )}
      <CartSection className={stateUser ? "MainCartsection" : ""}>
        <LeftPart className={stateUser ? "leftPart" : ""}>
          {!stateUser ? (
            <IsAccount>
              {/* Main acc Head Part is start from here */}
              <MainIsaccount>
                <MainAccHead>
                  <MainAccH3>Account </MainAccH3>
                  <MainAccSpan>
                    To place your order now, log in to your existing account or
                    sign up..
                  </MainAccSpan>

                  <MainAccButttons>
                    <Link style={MainAccAnkertag} to="/user-login">
                      Have An Account
                      <MAccinnerButton>Login</MAccinnerButton>
                    </Link>
                    <Link style={MainAccAnkertag} to="/user-register">
                      New on Lakhdatar
                      <MAccinnerButton>Register</MAccinnerButton>
                    </Link>
                  </MainAccButttons>
                </MainAccHead>
                {/* Main account images section sttart from here  */}
                <MainAccImageP>
                  <MainAccImage src="./paneer.png" alt="" />
                  <MainAccIcon>
                    <i
                      style={{ color: "white", fontSize: "30px" }}
                      class="fa-regular fa-user"
                    ></i>
                  </MainAccIcon>
                </MainAccImageP>
              </MainIsaccount>
            </IsAccount>
          ) : (
            <></>
          )}
          {cartValue > 0 && (
            <>
              <DeliveryAddress
                onClick={(e) => {
                  handleaddressField(e);
                }}
              >
                Delivery Address
                <AddresIcon>
                  <i className="fa-solid fa-location-dot"></i>
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
              </DeliveryAddress>
              <Payment>
                Payment
                <PaymentIcon onClick={handlePaymentClick}>
                  <i
                    style={{ color: "white", fontSize: "20px" }}
                    class="fa-solid fa-wallet"
                  ></i>
                </PaymentIcon>
              </Payment>
            </>
          )}
        </LeftPart>
        {cartValue > 0 ? (
          <RightPart className={stateUser ? "rightPart" : ""}>
            <RImagHead>
              <RImgParent>
                <RImg
                  src="https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </RImgParent>
              <RHeadParent>
                <RHeadH3>Lakhdatar Restaurant </RHeadH3>
                <RHeadSpan>Jaipur</RHeadSpan>
              </RHeadParent>
            </RImagHead>
            <OverflowScroll>
              {/* Cart item is here  */}

              {cart?.carts.map((cart) => (
                <>
                  <CartItem key={cart._id}>
                    <span
                      style={{
                        color: "black",
                        margin: "0px 20px 0px 0px ",
                      }}
                      className="cartSr"
                    >
                      {0}
                    </span>
                    <CartImage
                      src={`${imageUrl}/${cart.prodId.src}`}
                      className="cartImage"
                    />
                    <CartItemName>{`${cart.prodId.name}`}</CartItemName>
                    <CartItemQuantity>
                      <span
                        style={{
                          padding: "0px 10px",
                          color: "black",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          handleDecreaseqty(e, cart.prodId?._id);
                        }}
                      >
                        -
                      </span>
                      <span
                        style={{
                          padding: "0px 10px",
                          borderRight: "2px solid black",
                          borderLeft: "2px solid black",
                          color: "black",
                        }}
                      >
                        {cart.qty}
                      </span>
                      <span
                        style={{
                          padding: "0px 10px",
                          color: "black",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          handleIncrement(e, cart.prodId._id);
                        }}
                      >
                        +
                      </span>
                    </CartItemQuantity>
                    <CartItemPrice>
                      <del
                        style={{
                          color: "black",
                          position: "absolute",
                          top: "-11px",
                          right: "2px",
                        }}
                      >
                        ₹{cart.price + 100}
                      </del>
                      <span
                        style={{
                          color: "black",
                          fontSize: "17px",
                          fontFamily: "Kanit",
                        }}
                      >
                        ₹{cart.price}
                      </span>
                    </CartItemPrice>
                  </CartItem>
                </>
              ))}

              {/* Bill Details are here  */}
              <BillDeatils>
                <BillDeatilsH3 className={stateUser ? "billdetHead" : ""}>
                  Bill Details{" "}
                </BillDeatilsH3>
                <BillDetilsHead className={stateUser ? "billDetails" : ""}>
                  <BillDeatilSpans>
                    <BillDeatilSpan>Item Total</BillDeatilSpan>
                    <BillDeatilSpan>Delivery Fee | 2.0 kms</BillDeatilSpan>
                    <BillDeatilSpan> Extra Discount For You </BillDeatilSpan>
                  </BillDeatilSpans>
                  <BillDeatilSpans style={{ padding: " 0px 10px" }}>
                    <BillDeatilSpan>₹{totalAmount}</BillDeatilSpan>
                    <BillDeatilSpan>₹ 40</BillDeatilSpan>
                    <BillDeatilSpan>-₹ 40</BillDeatilSpan>
                  </BillDeatilSpans>
                </BillDetilsHead>
              </BillDeatils>
              {/* Delivery charges And off  */}
              <DeliveryDetails className={stateUser ? "billDetails" : ""}>
                <BillDeatilSpans>
                  <BillDeatilSpan>Delivery Tip</BillDeatilSpan>
                  <BillDeatilSpan>Platform Fee</BillDeatilSpan>
                  <BillDeatilSpan> Gst And Restaurant Charges </BillDeatilSpan>
                </BillDeatilSpans>
                <BillDeatilSpans>
                  <BillDeatilSpan>₹ {deliveryTip}</BillDeatilSpan>
                  <BillDeatilSpan>₹ {platfromFees}</BillDeatilSpan>
                  <BillDeatilSpan>₹ {GST}</BillDeatilSpan>
                </BillDeatilSpans>
              </DeliveryDetails>
            </OverflowScroll>
            {/*  Final Payment */}
            <PaymentSection className={stateUser ? "toPaysection" : ""}>
              <PaymentSpan>To Pay</PaymentSpan>
              <PaymentSpan> ₹{finalAmount}</PaymentSpan>
            </PaymentSection>
          </RightPart>
        ) : (
          stateUser == null && (
            <RightEmptyPart>
              <RightEmptyh3>Cart Empty</RightEmptyh3>
              <RightEmptyImg src="./recart.png" alt="Image not found " />
            </RightEmptyPart>
          )
        )}
      </CartSection>
      {cart !== null && (
        <button
          onClick={(e) => {
            handlePayment(e);
          }}
        >
          Place Your Order{" "}
        </button>
      )}
    </CartBody>
  );
};

export default Cart;
