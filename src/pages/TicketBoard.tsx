import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Paper } from "@material-ui/core";
import { ColumnList } from "../components/ColumnList";
import { ColumnHeader } from "../components/ColumnHeader";
import { ColumnFooter } from "../components/ColumnFooter";
import defaultTaskList from "../../Tasks";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
  },
  callWrap: {
    display: "flex",
    flex: "1 1 auto",
    overflowX: "auto",
    overflowY: "hidden",
    height: "93.6vh",
    scrollbarWidth: "thin",
  },
  callContent: {
    display: "flex",
    paddingTop: "24px",
    paddingBottom: "24px",
    height: "100%",
    alignItems: "flex-start",
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

const TicketBoard: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid container className={classes.callWrap}>
          <Grid className={classes.callContent}>
            {defaultTaskList &&
              Object.entries(defaultTaskList).map(([title, calls], i) => {
                return (
                  <Paper
                    key={`column -${i} ${[title]}`}
                    elevation={1}
                    className={classes.boardCard}
                  >
                    <ColumnHeader title={title} />
                    <Divider />
                    <ColumnList calls={calls} />
                    <Divider className={classes.divider} />

                    <ColumnFooter />
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
