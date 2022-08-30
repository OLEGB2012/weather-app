import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { api_key } from "../../config";

const TabularData = (props) => {
  const { latitude, longitude } = props.coords;
  const [tabularData, setTabularData] = useState([]);
  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/uvi/forecast?appid=${api_key}&lat=${latitude}&lon=${longitude}&cnt=8`
        )
        .then((response) => {
          setTabularData(response.data);
        });
    }
  }, [latitude, longitude]);
  if (tabularData && tabularData !== {}) {
    return (
      <div>
        <h3 className="header">Forecast UV Index data</h3>
        <div className="table_data">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                {tabularData.map((data, i) => {
                  return <th key={i}>{data.date_iso.slice(0, 10)}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Uv value</td>
                {tabularData.map((data, index) => {
                  return <td key={index}>{data.value}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default TabularData;
