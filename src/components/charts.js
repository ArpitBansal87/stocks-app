import React from "react";

//import the desired component from the Chart.js library
import { Line } from "react-chartjs-2";

const getData = (data) => {
  return (data.getUTCHours() + 1 + "/" + data.getUTCMinutes() + "/" + data.getUTCSeconds());
};

const ChartPage = (props) => {
  //construct the data object using the appropriate properties and data set
  const lineData = {
    labels: props.data.map((ele) => getData(ele.time)),
    datasets: [
      {
        label: "Revenue",
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
        pointBorderColor: "blue",
        pointRadius: 1,
        data: props.data.map((ele) => ele.price),
      },
    ],
  };

  return (
    <div>
      <Line data={lineData} />
    </div>
  );
};

export default ChartPage;
