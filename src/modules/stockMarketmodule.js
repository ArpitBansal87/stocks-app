import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Stocks from "./../components/stocks";

const useStyles = makeStyles(() => ({
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

const StockMarket = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={3}>
      <section className={classes.stocksList}>
        {[...props.stocksList.values()].map((stockData, index) => (
          <Stocks
            className={classes.stocks}
            key={"stock-" + index}
            data={stockData}
            selectChart={props.reloadlChart}
          ></Stocks>
        ))}
      </section>
    </Grid>
  );
};

export default StockMarket;
