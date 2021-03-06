import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Tooltip, Typography } from "@material-ui/core";
import ShowChartIcon from "@material-ui/icons/ShowChart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  decrease: {
    color: "darkgreen",
  },
  increase: {
    color: "red",
  },
}));

const Stocks = (props) => {
  const classes = useStyles();
  const handleChartToggle = () => {
    props.selectChart(props.data.name);
  };

  const getClassName = () => {
    return props.data.change === 0
      ? classes.noChange
      : props.data.change > 0
      ? classes.increase
      : classes.decrease;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Grid item container direction="column" xs>
                <Grid item>
                  <Typography variant="h5">{props.data.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption" className={getClassName()}>
                    Price: ${Number.parseFloat(props.data.price).toFixed(3)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="caption">Updated On:</Typography>
                <Typography variant="body2">
                  {props.data.updatedTimeStamp.getMonth() +
                    1 +
                    "/" +
                    props.data.updatedTimeStamp.getDate() +
                    "/" +
                    props.data.updatedTimeStamp.getFullYear()}
                </Typography>
                <Typography variant="body2">
                  {props.data.updatedTimeStamp.getUTCHours() +
                    ":" +
                    props.data.updatedTimeStamp.getUTCMinutes() +
                    ":" +
                    props.data.updatedTimeStamp.getUTCSeconds()}
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Show chart">
                  <Button
                    onClick={handleChartToggle}
                    className={getClassName()}
                  >
                    <ShowChartIcon></ShowChartIcon>
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Stocks;
