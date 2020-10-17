import React, { useEffect, useState } from "react";
import "./App.css";
import Stocks from "./components/stocks";
import Chart from "./components/charts";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  stocksList: {
    flexGrow: 1,
    overflowY: "scroll",
    height: "calc(100vh)",
    padding: "0 10px",
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
            ? [...currentValue.history, { price: stock[1], time: currentTime }]
            : [{ price: currentValue.price, time: currentTime }],
        name: stock[0],
      });
    } else {
      stocksListObj.set(stock[0], {
        updatedTimeStamp: currentTime,
        change: 0,
        price: stock[1],
        history: [{ price: stock[1], time: currentTime }],
        name: stock[0],
      });
    }
  }
  return stocksListObj;
};
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

  const classes = useStyles();

  const handlePause = () => {
    setPauseStockUpdate(!pauseStockUpdate);
  };

  const reloadlChart = (value) => {
    setChartData(stocksList.get(value).history);
    setChartName(stocksList.get(value).name);
  };

  return (
    <>
      <section>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={9} sm={8} lg={3}>
            <h1>Stocks App</h1>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              aria-label="play"
              style={{ float: "right" }}
              onClick={handlePause}
            >
              {pauseStockUpdate ? (
                <PlayCircleFilledIcon fontSize="large" />
              ) : (
                <PauseCircleFilledIcon fontSize="large" />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </section>
      <Grid container>
        <Grid item xs={12} md={3}>
          <section className={classes.stocksList}>
            {[...stocksList.values()].map((stockData, index) => (
              <Stocks
                className={classes.stocks}
                key={"stock-" + index}
                data={stockData}
                selectChart={reloadlChart}
              ></Stocks>
            ))}
          </section>
        </Grid>
        <Grid item xs={12} md={9}>
          <section>
            <Chart data={chartData} name={chartName}></Chart>
          </section>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
