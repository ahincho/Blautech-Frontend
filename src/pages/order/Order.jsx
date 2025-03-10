import React, { useContext, useState } from "react";
import { StoreContext } from "../../contexts/StoreContext";
import AuthenticationContext from "../../contexts/AuthenticationContext"; // Importar el contexto de autenticación
import "./Order.css";

const Order = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const { user } = useContext(AuthenticationContext); // Obtener los datos del usuario
  const [address, setAddress] = useState(user ? user.address : ""); // Crear un estado para la dirección
  const handleAddressChange = (e) => {
    setAddress(e.target.value); // Actualizar la dirección cuando el usuario la edite
  };
  return (
    <form className="order">
      <div className="order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Firstname"
            value={user ? user.firstname : ""}
            readOnly
          />
          <input
            type="text"
            placeholder="Lastname"
            value={user ? user.lastname : ""}
            readOnly
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={user ? user.email : ""}
          readOnly
        />
        <input
          type="text"
          placeholder="Address"
          value={address} // Mostrar el valor actualizado de address
          onChange={handleAddressChange} // Permitir edición en Address
        />
        <input type="tel" placeholder="Phone" />
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
            <button>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Order;
