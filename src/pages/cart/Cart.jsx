import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, products, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  // Calcular el subtotal y redondear a 2 decimales
  const subtotal = getTotalCartAmount().toFixed(2);
  // Calcular la tarifa de entrega (si el subtotal es mayor a 0)
  const deliveryFee = subtotal > 0 ? 2.0 : 0.0;
  // Calcular el monto total y redondearlo a 2 decimales
  const total = (parseFloat(subtotal) + deliveryFee).toFixed(2);

  // Redirigir a la página de órdenes
  const handleProceed = () => {
    navigate("/orders");
  };

  return (
    <div className="cart">
      {/* Cart Items Section */}
      <div className="cart-items">
        {/* Table Header */}
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {/* Render cart items */}
        {products.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <React.Fragment key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="product" />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>${(item.price * cartItems[item.id]).toFixed(2)}</p>
                  <p className="cross" onClick={() => removeFromCart(item.id)}>X</p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Summary Section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            {/* Subtotal */}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            {/* Delivery Fee */}
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            {/* Total Amount */}
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
            {/* Proceed Button */}
            <button onClick={handleProceed}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
