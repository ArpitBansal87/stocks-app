import React, { useEffect, useState } from "react";
import "./App.css";
import Stocks from "./components/stocks";
import Chart from "./components/charts";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  stocks: {
    paddingBottom: 10,
  },
}));

const updateStockMarket = (stockUpdates, stocksListObj) => {
  const currentData = JSON.parse(stockUpdates);
  const currentTime = new Date();
  for (const stock of currentData) {
    if (stocksListObj.has(stock[0])) {
      const currentValue = stocksListObj.get(stock[0]);
      stocksListObj.set(stock[0], {
        updatedTimeStamp: currentTime,
        change: currentValue.price - stock[1],
        price: stock[1],
        history:
          currentValue.history.length !== 0
            ? [...currentValue.history, {price: currentValue.price, time:currentTime}]
            : [{price: currentValue.price, time:currentTime}],
        name: stock[0],
      });
    } else {
      stocksListObj.set(stock[0], {
        updatedTimeStamp: currentTime,
        change: 0,
        price: stock[1],
        history: [],
        name: stock[0],
      });
    }
  }

  console.log(stocksListObj);
  return stocksListObj;
};
const ws = new WebSocket(
  process.env.NODE_ENV === "production"
    ? "wss://stocks.mnet.website"
    : "ws://stocks.mnet.website"
);
function App() {
  const [stocksList, setStocksList] = useState(new Map());
  const [pauseStockUpdate, setPauseStockUpdate] = useState(false);
  const [chartData, setChartData] = useState([{price: 21, time: new Date()}, {price: 11, time: new Date()}])

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
    console.log("pauseStockUpdate");
    ws.onmessage = (message) => {
      if (!pauseStockUpdate) {
        setStocksList(new Map(updateStockMarket(message.data, stocksList)));
      }
    };
  }, [pauseStockUpdate, stocksList]);

  const classes = useStyles();

  const handlePause = () => {
    setPauseStockUpdate(!pauseStockUpdate);
  };

  const reloadlChart =(value) => {
    setChartData(stocksList.get(value).history)
  }

  return (
    <>
      <h2>Stocks App</h2>
      <div>Inside the Stocks</div>
      <button onClick={handlePause}>Pause Stock updates</button>
      <div
        style={{ display: "grid", gridTemplateColumns: "25% auto", gap: "20" }}
      >
        <section className={classes.root}>
          {[...stocksList.values()].map((stockData, index) => (
            <Stocks
              className={classes.stocks}
              key={"stock-" + index}
              data={stockData}
              selectChart={reloadlChart}
            ></Stocks>
          ))}
        </section>
        <section>
          <div>This space is for chart</div>
          <Chart data={chartData}></Chart>
        </section>
      </div>
    </>
  );
}

export default App;
