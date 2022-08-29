import React from "react";
import "./index.css";
import windIcon from "../../assets/windy.png";
import humidityIcon from "../../assets/Humidity.png";
import pressureIcon from "../../assets/Pressure.png";
import temperature from "../../assets/Temperature.png";

const WeatherCard = (props) => {
  const card_data = [
    {
      Header: "Temperature",
      cardData: `${props.mainData.temp} \xBAC`,
      src: temperature,
    },
    {
      Header: "Pressure",
      cardData: `${props.mainData.pressure} hpa`,
      src: pressureIcon,
    },
    {
      Header: "Humidity",
      cardData: `${props.mainData.humidity} %`,
      src: humidityIcon,
    },
    {
      Header: "Wind",
      cardData: `${props.windData.speed} m/sec`,
      src: windIcon,
    },
  ];
  if (props.WeatherCard !== null) {
    return (
      <div className="card_container">
        <h2 className="cards_header">
          Current weather in {props.weatherData.name}
        </h2>
        <div className="cards">
          {card_data.map((data, i) => {
            return (
              <div className="weather_cards" key={i}>
                <p>Current {data.Header}</p>
                <div className="icon_container">
                  <img
                    className="weather_icon"
                    src={data.src}
                    alt="weatherIcon"
                  />
                </div>
                <h3>{data.cardData}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default WeatherCard;
