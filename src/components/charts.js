import React from "react";
import { Line } from "react-chartjs-2";

const getData = (data) => {
  return (
    data.getUTCHours() +
    ":" +
    data.getUTCMinutes() +
    ":" +
    data.getUTCSeconds()
  );
};

const ChartPage = (props) => {
  const lineData = {
    labels: props.data.map(ele => getData(ele.time)),
    datasets: [
      {
        label: props.name,
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
        pointBorderColor: "blue",
        pointRadius: 2,
        data: props.data.map((ele) => ele.price),
      },
    ],
  };

  return (
    <div>{props.data.length !== 0 ? <Line data={lineData} /> : <></>}</div>
  );
};

export default ChartPage;
