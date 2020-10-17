import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import updateStockMarket from "./utils/utils";
import ChartModule  from "./modules/chartModule";
import StockMarket from "./modules/stockMarketmodule";
import InfoModule from "./modules/infoModule";

const ws = new WebSocket(
  process.env.NODE_ENV === "production"
    ? "wss://trades-api.herokuapp.com/stocks"
    : "ws://stocks.mnet.website"
);
function App() {
  const [stocksList, setStocksList] = useState(new Map());
  const [pauseStockUpdate, setPauseStockUpdate] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartName, setChartName] = useState("");

  useEffect(() => {
    ws.onopen = () => {
      console.log("connection Established");
    };

    return function cleanup() {
      ws.close();
      console.log("connection closed");
    };
  }, []);

  useEffect(() => {
    ws.onmessage = (message) => {
      if (!pauseStockUpdate) {
        setStocksList(new Map(updateStockMarket(message.data, stocksList)));
      }
    };
  }, [pauseStockUpdate, stocksList]);

  

  const handlePause = () => {
    setPauseStockUpdate(!pauseStockUpdate);
  };

  const reloadlChart = (value) => {
    setChartData(stocksList.get(value).history);
    setChartName(stocksList.get(value).name);
  };

  return (
    <>
      <InfoModule handlePause={handlePause} isPauseStockUpdate={pauseStockUpdate}></InfoModule>
      <Grid container>
        <StockMarket reloadlChart={reloadlChart} stocksList={stocksList}></StockMarket>
        <ChartModule chartName={chartName} chartData={chartData}></ChartModule>
      </Grid>
    </>
  );
}

export default App;
