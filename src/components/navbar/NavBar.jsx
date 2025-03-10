import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../contexts/StoreContext";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import "./NavBar.css";

const NavBar = ({ setShowSignUp }) => {
  const [selectedOption, setSelectedOption] = useState("Home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const { user, logout } = useContext(AuthenticationContext);
  return (
    <div className="navbar">
      <Link to="/"><img src={assets.logo} alt="logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setSelectedOption("Home")} className={selectedOption === "Home" ? "active" : ""}>Home</Link>
        <a href="#explore" onClick={() => setSelectedOption("Menu")} className={selectedOption === "Menu" ? "active" : ""}>Menu</a>
        <a href="#mobile" onClick={() => setSelectedOption("Mobile")} className={selectedOption === "Mobile" ? "active" : ""}>Mobile</a>
        <a href="#footer" onClick={() => setSelectedOption("Contact")} className={selectedOption === "Contact" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="basket-icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {user ? (
          <button onClick={logout}>Sign Out</button>
        ) : (
          <button onClick={() => setShowSignUp(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
