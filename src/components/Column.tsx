import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import type { TicketResponse } from "src/types/type";

const useStyles = makeStyles((theme) => ({
  callCard: {
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
  callHeader: {
    padding: theme.spacing(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
  callButton: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  cardRoot: {
    margin: theme.spacing(2),
    marginBottom: 20,
    borderLeft: "5px solid red",
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    paddingBottom: theme.spacing(2),
  },
  bottomBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
}));
interface ColumnProps {
  ticket: Partial<TicketResponse>;
}
export const Column: React.FC<ColumnProps> = ({ ticket }) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.cardRoot, {
        waitingBoard: ticket.status === "Waiting",
        successBoard: ticket.status === "Approved",
      })}
      variant="outlined"
      style={{ borderLeft: `5px solid ${ticket.sector?.color}` }}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h6">
            {ticket.title}
          </Typography>
          <Grid item xs={12}>
            <Box component="small" m={1}>
              <Typography variant="body2">{ticket.createdAt}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} className={classes.bottomBox}>
            {ticket.sector?.name && (
              <Chip
                size="small"
                label={ticket.sector.name}
                style={{ backgroundColor: ticket.sector.color, color: "#fff" }}
              />
            )}
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};
