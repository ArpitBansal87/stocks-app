import React, { useEffect, useState } from "react";
import "./App.css";
import Stocks from "./components/stocks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  stocks: {
    paddingBottom: 10
  }
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
            ? [...currentValue.history, currentValue.price]
            : [currentValue.price],
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
function App() {
  const [stocksList, setStocksList] = useState(new Map());

  useEffect(() => {
    const updateStocksListing = (updateStocks) => {
      return updateStockMarket(updateStocks, stocksList);
    };

    const ws = new WebSocket(process.env.NODE_ENV === 'production' ? "wss://stocks.mnet.website" : "ws://stocks.mnet.website");
    ws.onopen = () => {
      console.log("connection Established");
    };
    ws.onmessage = (message) => {
      setStocksList(new Map(updateStocksListing(message.data)));
    };

    return function cleanup() {
      ws.close();
      console.log("connection closed");
    };
  }, []);

  const classes = useStyles();

  return (
    <>
      <h2>Stocks App</h2>
      <div>Inside the Stocks</div>
      <div
        style={{ display: "grid", gridTemplateColumns: "25% auto", gap: "20" }}
      >
        <section className={classes.root}>
          {[...stocksList.values()].map((stockData, index) => (
            <Stocks className={classes.stocks} key={"stock-" + index} data={stockData}></Stocks>
          ))}
        </section>
        <section>
          <div>This space is for chart</div>
        </section>
      </div>
    </>
  );
}

export default App;
