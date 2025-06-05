import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Paper } from "@material-ui/core";
import { BoardsList } from "../components/BoardList";
import { BoardHeader } from "../components/BoardHeader";
import { BoardFooter } from "../components/BoardFooter";
import defaultTaskList from "../../Tasks";
import axios from "axios";
import { Header } from "../components/Header";

const url = "/db.json";
console.log(defaultTaskList);
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
  },
  boardsWrap: {
    display: "flex",
    flex: "1 1 auto",
    overflowX: "auto",
    overflowY: "hidden",
    height: "100%",
  },
  boardsContent: {
    display: "flex",
    paddingTop: "24px",
    paddingBottom: "24px",
    height: "100%",
  },
  boardCard: {
    width: "380px",
    display: "flex",
    maxHeight: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    marginLeft: "8px",
    marginRight: "8px",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  boardButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

const TicketBoard = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Grid container className={classes.root} spacing={3}>
        <Grid container className={classes.boardsWrap}>
          <Grid className={classes.boardsContent}>
            {defaultTaskList.board &&
              defaultTaskList.board.map((board) => {
                return (
                  <Paper
                    key={board.id}
                    elevation={3}
                    className={classes.boardCard}
                  >
                    <BoardHeader title={board.title} />
                    <Divider />
                    <BoardsList boards={board.tasks} />
                    <Divider className={classes.divider} />
                    <BoardFooter />
                  </Paper>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TicketBoard;
