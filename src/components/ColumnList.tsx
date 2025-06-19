import React from "react";
import { Grid } from "@material-ui/core";
import { Column } from "./Column";
import { makeStyles } from "@material-ui/core/styles";
import type { Call, TicketResponse } from "src/types/type";

const useStyles = makeStyles((theme) => ({
  columnContent: {
    overflowY: "auto",
    height: "100%",
  },
}));
interface ColumnlistProps {
  calls: Array<Call>;
}
export const ColumnList: React.FC<ColumnlistProps> = ({ calls }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.columnContent}>
      {calls &&
        calls.map((call, i) => (
          <Grid key={i} item xs={12}>
            <Column ticket={call} />
          </Grid>
        ))}
    </Grid>
  );
};
