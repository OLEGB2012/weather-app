import React, { useState, useEffect } from "react";
import axios from "axios";
import { api_key } from "../../config";
import "./index.css";

const MainData = (props) => {
  const { latitude, longitude } = props.coords;
  const [weatherData, setWeatherData] = useState({});
  const [mainData, setMainData] = useState({});
  const [windData, setWindData] = useState({});
  const [sunData, setSunData] = useState({});
  const [cloudData, setCloudData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        console.log(response);
        setWeatherData(response.data);
        setMainData(response.data.main);
        setWindData(response.data.wind);
        setSunData(response.data.sys);
        setCloudData(response.data.weather[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [latitude, longitude]);
  if (weatherData && weatherData !== null) {
    return (
      <div className="main_container">
        <div className="card_container_main"></div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default MainData;
