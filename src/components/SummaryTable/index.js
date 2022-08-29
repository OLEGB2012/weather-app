import React from "react";
import "./index.css";
import SummaryWeatherIcon from "../../assets/Summary_weather.png";

const SummaryTable = (props) => {
  console.log(props);

  // Function to convert Unix date to local date
  const dateConverter = (data) => {
    let localDate = new Date(data * 1000);
    let date = localDate
      .toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .slice(11, 19);
    console.log(date);
    return date;
  };

  const sunriseTime = dateConverter(props.sunData.sunrise);
  const sunsetTime = dateConverter(props.sunData.sunset);
  const new_latitude = parseFloat(props.coords.latitude).toFixed(2);
  const new_longitude = parseFloat(props.coords.longitude).toFixed(2);

  const summary_data = [
    {
      Header: "Wind",
      tableData: `${props.windData.speed} m/sec`,
    },
    {
      Header: "Cloudiness",
      tableData: `${props.cloudData.description}`,
    },
    {
      Header: "Pressure",
      tableData: `${props.mainData.pressure} hpa`,
    },
    {
      Header: "Humidity",
      tableData: `${props.mainData.humidity} %`,
    },
    {
      Header: "Sunrise",
      tableData: `${sunriseTime}`,
    },
    {
      Header: "Sunset",
      tableData: `${sunsetTime}`,
    },
    {
      Header: "Geo coords",
      tableData: `${new_latitude}, ${new_longitude}`,
    },
  ];

  return (
    <div className="summary_table">
      <h2 className="summary_header">Summary weather report</h2>
      <div className="display_Something">
        <div>
          <img
            className="SummaryWeatherIcon"
            src={SummaryWeatherIcon}
            alt="weatherIcon"
          />
          <h2 className="temperature">
            {props.mainData.temp}
            <sup>0</sup>C
          </h2>
          <p>{props.cloudData.description}</p>
        </div>
      </div>
      <table className="table_grid">
        {summary_data.map((data, index) => {
          return (
            <tbody key={index}>
              <tr>
                <th>{data.Header}</th>
                <td className="summary_td">{data.tableData}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
export default SummaryTable;
