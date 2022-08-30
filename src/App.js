import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { geocoding_api_key } from "./config";
import Header from "./components/Header";
import MainData from "./components/MainData";
import TabularData from "./components/TabularData";

class App extends Component {
  newState = {}; // used to update state
  activeCoords = {}; // to handle the current coordinates
  constructor(props) {
    super(props);
    // initiate the state to empty values
    this.state = {
      latitude: "",
      longitude: "",
      searchTerm: "",
    };
    // Get the coordinates of the current user location
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.newState = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
      this.setState(this.newState);
    });
  }
  // The getCoordinates function will be used if the user enters a different search location, to get the corresponding coordinates.
  // Function which converts given address or city name to latitude and longitude on change of the city name.
  getCoordinates = (city) => {
    if (city === "Current location") {
      this.setState(this.newState);
    } else {
      let locality = city,
        countryRegion = "BY"; // Region is set to India
      axios
        .get(
          `http://dev.virtualearth.net/REST/v1/Locations?&countryRegion=${countryRegion}&locality=${locality}&key=${geocoding_api_key}`
        )
        .then((response) => {
          console.log(response);
          response.data.resourceSets.map((data) => {
            return data.resources.map((resourceData) => {
              if (resourceData.confidence === "High") {
                this.activeCoords = {
                  latitude: resourceData.point.coordinates[0],
                  longitude: resourceData.point.coordinates[1],
                };
                console.log(this.activeCoords);
                return this.activeCoords;
              } else {
                console.log("no data");
                return null;
              }
            });
          });
        });
    }
  };
  // Handle the change of input and set it to state
  handleChange = (e) => {
    const newSearch = e.target.value;
    this.setState({
      searchTerm: newSearch,
    });
    console.log(newSearch);
    this.getCoordinates(newSearch);
    e.preventDefault();
  };
  // Update the coordinates in the state so that the child components are rerendered for new coordinates.
  handleSearch = (e) => {
    console.log(this.state.searchTerm);
    let coords = this.activeCoords;
    this.setState(
      {
        ...this.state,
        ...coords,
      },
      () => console.log(this.state)
    );
    e.preventDefault();
  };
  // render method
  render() {
    if (this.state !== null) {
      return (
        <div className="App">
          <Header
            handleSearch={(e) => this.handleSearch(e)}
            handleChange={(e) => {
              this.handleChange(e);
            }}
          />
          <div className="container">
            <MainData coords={this.state} />
          </div>
          <TabularData coords={this.state} />
        </div>
      );
    } else return <div></div>;
  }
}

export default App;
