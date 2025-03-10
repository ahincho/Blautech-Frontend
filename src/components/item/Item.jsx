import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../contexts/StoreContext";
import AuthenticationContext from "../../contexts/AuthenticationContext"; // Importa el contexto de autenticación
import { toast } from "react-toastify";
import "./Item.css";

const Item = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { token } = useContext(AuthenticationContext); // Consumiendo el contexto de autenticación

  // Función para manejar agregar al carrito
  const handleAddToCart = () => {
    if (!token) {
      toast.error("You must be logged in to add items to the cart.");
    } else {
      addToCart(id);
    }
  };

  // Función para manejar quitar del carrito
  const handleRemoveFromCart = () => {
    if (!token) {
      toast.error("You must be logged in to remove items from the cart.");
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="item">
      {/* Image container */}
      <div className="item-img-container">
        <img className="item-img" src={image} alt="item-img" />
        {!cartItems[id] ? (
          <img
            className="item-add"
            onClick={handleAddToCart} // Usamos la función para agregar al carrito
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="item-counter">
            <img
              onClick={handleRemoveFromCart} // Usamos la función para quitar del carrito
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAddToCart} // Usamos la función para agregar al carrito
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>
      {/* Product information */}
      <div key={id} className="item-info">
        <div className="item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="item-description">{description}</p>
        <p className="item-price">${price}</p>
      </div>
    </div>
  );
};

export default Item;
