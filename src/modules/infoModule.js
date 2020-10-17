import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";

const InfoModule = (props) => {
  return (
    <section>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={9} sm={8} lg={3}>
          <h1>Stocks App</h1>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            aria-label="play"
            style={{ float: "right" }}
            onClick={props.handlePause}
          >
            {props.isPauseStockUpdate ? (
              <PlayCircleFilledIcon fontSize="large" />
            ) : (
              <PauseCircleFilledIcon fontSize="large" />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </section>
  );
};

export default InfoModule;
