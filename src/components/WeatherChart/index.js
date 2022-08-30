import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./index.css";
import { api_key } from "../../config";
// https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const styles = {
  graphContainer: {
    padding: "1.2%",
    width: "94.5%",
    height: "100%",
    backgroundColor: "white",
    marginLeft: "1.2%",
    borderRadius: "10px",
  },
};
const WeatherChart = (props) => {
  const { latitude, longitude } = props.coords;
  const [chartData, setchartData] = useState({});
  var apiData = {
    datasets: [],
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=8&appid=${api_key}`
      )
      .then((response) => {
        setchartData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [latitude, longitude]);

  if (chartData.list && chartData.list !== null) {
    apiData = {
      labels: chartData.list.map((data) => {
        let time = data.dt_txt.slice(11, 16);
        let Hours = +time.substr(0, 2);
        let hour = Hours % 12 || 12;
        hour = hour < 10 ? "0" + hour : hour;
        let ampm = Hours < 12 ? " AM" : " PM";
        time = hour + time.substr(2, 3) + ampm;
        return time;
      }),
      datasets: [
        {
          type: "line",
          label: "Temperature for every 3 hours",
          data: chartData.list.map((data) => {
            return data.main.temp;
          }),
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#475eb2",
          pointBackgroundColor: "#475eb2",
        },
        {
          type: "bar",
          label: "Humidity for every 3 hours",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,180,0.4)",
          borderColor: "rgba(75,192,192,1)",
          barPercentage: 0.2,
          data: chartData.list.map((data) => {
            return data.main.humidity;
          }),
        },
      ],
    };
  }
  const options = {
    legend: {
      display: true,
    },
  };
  return (
    <div className="weather_container">
      <div style={styles.graphContainer}>
        <Bar className="weather_chart" data={apiData} options={options} />
      </div>
    </div>
  );
};

export default WeatherChart;
