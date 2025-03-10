import React from "react";
import "./Mobile.css";
import { assets } from "../../assets/assets"

const Mobile = () => {
  return (
    <div className="mobile" id="mobile">
      <p>For better experience download <br/> Tomato App</p>
      <div className="mobile-download-platforms">
        <img src={assets.play_store} alt="play-store" />
        <img src={assets.app_store} alt="app-store" />
      </div>
    </div>
  )
};

export default Mobile;
