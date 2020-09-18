import React from "react";
import "./Hotel.css";
const Hotel = props => {
  const {
    title,
    img,
    roomDetails,
    wifi,
    cancel,
    rating,
    price,
    total,
  } = props.details;
  return (
    <div className='d-flex my-4'>
      <div className='room'>
        <img src={img} alt='' />
      </div>
      <div className='hotelDetails ml-4'>
        <h6>{title} </h6>
        <p>{roomDetails}</p>
        <p>{wifi}</p>
        <p>{cancel}</p>
        <span className='mr-2'>{rating}</span>${price}/
        <span className='total mr-2 text-secondary'>night</span>${total}/
        <span className='text-secondary'>total</span>
      </div>
    </div>
  );
};

export default Hotel;
