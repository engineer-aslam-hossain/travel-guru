import React from "react";
import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import "./Home.css";
const Home = () => {
  return (
    <div className='home'>
      <Header />
      <Slider />
    </div>
  );
};

export default Home;
