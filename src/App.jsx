import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import Footer from "./components/footer/Footer";
import SignUp from "./components/signUp/SignUp";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      {
        showSignUp
          ? <SignUp setShowSignUp={setShowSignUp}/>
          : <></>
      }
      <div className="app">
        <NavBar setShowSignUp = {setShowSignUp}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/orders" element={<Order/>}/>
        </Routes>
      </div>
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000}/>
    </>
  )
}

export default App;
