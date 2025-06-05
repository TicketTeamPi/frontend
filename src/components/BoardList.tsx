import React from "react";
import { Grid } from "@material-ui/core";
import { Board } from "./Board";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  boardContent: {
    overflowY: "auto",
    height: "100%",
  },
}));

export const BoardsList = ({ boards }: any) => {
  const classes = useStyles();
  return (
    <Grid className={classes.boardContent}>
      {boards &&
        boards.map((board: any) => (
          <Grid key={board.id} item xs={12}>
            <Board board={board} />
          </Grid>
        ))}
    </Grid>
  );
};
