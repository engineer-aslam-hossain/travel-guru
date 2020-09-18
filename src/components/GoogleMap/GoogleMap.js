import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class GoogleMap extends Component {
  render() {
    const mapStyles = {
      width: "80%",
      height: "80%",
    };
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}>
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "TOKEN HERE", ///////// i have no token because google wants money from me
})(GoogleMap);
