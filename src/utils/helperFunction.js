const calculateCartSummary = (cartItems) => {
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice =
      item.quantity === "half"
        ? item.halfprice * item.qty
        : item.fullprice * item.qty;
    return acc + itemPrice;
  }, 0);

  const deliveryFees = subtotal > 500 ? 0 : 50;
  const platformFees = Math.round(subtotal * 0.05); // 5%
  const gst = Math.round(subtotal * 0.1); // 10%
  const discount = 0; // You can update this logic

  const finalAmount = subtotal + deliveryFees + platformFees + gst - discount;

  return {
    subtotal,
    deliveryFees,
    platformFees,
    gst,
    discount,
    finalAmount,
  };
};

export default calculateCartSummary;
