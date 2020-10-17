import React from "react";
import Chart from "./../components/charts";
import Grid from "@material-ui/core/Grid";

const ChartModule = (props) => {
  return (
    <Grid item xs={12} md={9}>
      <section>
        <Chart data={props.chartData} name={props.chartName}></Chart>
      </section>
    </Grid>
  );
};

export default ChartModule;
