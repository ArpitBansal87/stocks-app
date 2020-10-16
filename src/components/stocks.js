import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

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
}));

const Stocks = (props) => {
  const classes = useStyles();
  const handleTradeToggle = () => {
    console.log("test");
  };
  console.log(props);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item container direction="column" xs>
                <Grid item>
                  <Typography variant="h5">{props.data.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">
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
                <Button primary onClick={handleTradeToggle}>
                  See chart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>

    // <div className={classes.root}>
    //   <Grid container spacing={3}>
    //     <Grid item xs={12}>
    //       <Paper className={classes.paper}>
    //         <Typography>{props.data.name}</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classes.paper}>
    //         <div>{props.data.price}</div>
    //         <Typography>{props.data.change}</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Paper className={classes.paper}>
    //         <Typography>{props.data.updatedTimeStamp.toString()}</Typography>
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <Paper className={classes.paper}>
    //         <Button primary onClick={handleTradeToggle}>
    //           See chart
    //         </Button>
    //       </Paper>
    //     </Grid>
    //   </Grid>
    // </div>
  );
};

export default Stocks;
