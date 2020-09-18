import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Destination.css";
const Destination = props => {
  const { title, details } = props.Image;
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  return (
    <div className='d-flex destination'>
      <div className='DestinationDetails justify-content-center align-items-center'>
        <h1>{title}</h1>
        <p>{details}</p>
      </div>
      <Card className='bookingForm  ml-auto  p-4'>
        <Form.Label>Origin</Form.Label>
        <Form.Control type='text' placeholder='Origin' readOnly value='Dhaka' />
        <Form.Label>Destination</Form.Label>
        <Form.Control
          type='text'
          placeholder='Destination'
          value={title}
          readOnly
        />
        <div className='d-flex my-2 date'>
          <div className='mr-2'>
            <Form.Label>From</Form.Label>
            <Form.Control type='date' />
          </div>
          <div>
            <Form.Label>To</Form.Label>
            <Form.Control type='date' />
          </div>
        </div>
        <Link to={`/hotel_list/${title}`} className='bookingBtn'>
          <Button className='bookingBtn'>Start Booking</Button>
        </Link>
      </Card>
    </div>
  );
};

export default Destination;
