import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Explore from "../../components/explore/Explore";
import Display from "../../components/display/Display";
import Mobile from "../../components/mobile/Mobile";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <Explore category = {category} setCategory = {setCategory}/>
      <Display category = {category}/>
      <Mobile/>
    </div>
  )
}

export default Home;
