import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../contexts/StoreContext";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import useCreateOrder from "../../hooks/UseCreateOrder";
import "react-toastify/dist/ReactToastify.css";
import "./Order.css";

const Order = () => {
  const { getTotalCartAmount, setCartItems } = useContext(StoreContext);
  const { user } = useContext(AuthenticationContext);
  const { createOrder, loading } = useCreateOrder();
  const [address, setAddress] = useState(user ? user.address : "");
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleProceed = async () => {
    try {
      await createOrder();
      setCartItems({});
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <form className="order">
      <div className="order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="Firstname" value={user?.firstname || ""} readOnly />
          <input type="text" placeholder="Lastname" value={user?.lastname || ""} readOnly />
        </div>
        <input type="email" placeholder="Email" value={user?.email || ""} readOnly />
        <input type="text" placeholder="Address" value={address} onChange={handleAddressChange} />
      </div>
      <div className="order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</b>
            </div>
            <button onClick={handleProceed} disabled={loading}>
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Order;
