import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Hotel from "../Hotel/Hotel";
import fakeHotel from "../../fakeData/fakeHotel";
import GoogleMap from "../GoogleMap/GoogleMap";
import "./HotelList.css";
import Header from "../Header/Header";
const HotelList = () => {
  const { newPlace } = useParams();
  const hotelInfo = fakeHotel.filter(hotel => {
    const hotelplace = hotel.place == newPlace;
    return hotelplace;
  });
  /////////////// on load header style change /////////////////////////////
  const onload = () => {
    document
      .querySelector(".logo img")
      .style.setProperty("filter", "brightness(0)");
    document
      .querySelector(".search")
      .style.setProperty("filter", "brightness(0)");
    document
      .querySelector(".navbar-nav")
      .style.setProperty("filter", "brightness(0)");
  };
  return (
    <div onLoad={onload}>
      <Header />
      <div className='col-md-10'>
        <div className='row'>
          <div className='col-md-5 ml-auto'>
            <h4 className='hotelListHeader mt-2 mb-0 font-weight-bold'>
              Stay in {newPlace}{" "}
            </h4>
            {hotelInfo.map(details => (
              <Hotel key={details.id} details={details} />
            ))}
          </div>
          <div className='col-md-5 ml-auto'>
            <GoogleMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
