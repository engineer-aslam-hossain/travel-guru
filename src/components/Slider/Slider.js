import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Parallax, Autoplay } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import fakeImage from "../../fakeData/fakeImage.js";
import Destination from "../Destination/Destination";
SwiperCore.use([Navigation, Parallax, Autoplay]);

const Slider = () => {
  const [Image, SetImage] = useState({});
  const [bookingPlace, SetBookingPlace] = useState({});
  const changeWindow = () => {
    document.querySelector(".body").style.setProperty("display", "none");
    document
      .querySelector(".destination")
      .style.setProperty("visibility", "visible");
  };
  return (
    <>
      <div className='body '>
        <div className='details'>
          <h1>{Image.title} </h1>
          <p>{Image.details}</p>
          <Link to='/' className='text-decoration-none bookingBtn'>
            <Button
              onClick={changeWindow}
              className='d-flex justify-content-around align-items-center booking'>
              Booking <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </div>

        <Swiper
          id='main'
          slidesPerView={3}
          spaceBetween={50}
          loop={true}
          // autoplay
          onClick={swiper => {
            const test = fakeImage.find(
              (data, index) => index === swiper.realIndex
            );
            SetBookingPlace(test);
          }}
          onSlideChange={swiper => {
            const test = fakeImage.find(
              (data, index) => index === swiper.realIndex
            );
            SetImage(test);
          }}
          navigation>
          {fakeImage.map(image => (
            <SwiperSlide className='swiper-slide' key={image.id}>
              <h3>{image.title} </h3>
              <img src={image.img} alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Destination Image={Image} key={Image.id} />
    </>
  );
};

export default Slider;
