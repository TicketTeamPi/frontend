// src/components/Column.tsx
import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import type { Ticket } from "src/types/type";
import { Avatar, AvatarGroup } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: theme.spacing(1),
    marginBottom: "10px",
    borderLeft: "5px solid red",
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    padding: theme.spacing(2),
  },
}));

interface ColumnProps {
  ticket: Ticket;
  columnKey: string;
  onDragEnd?: (e: React.DragEvent) => void;
  onClick?: () => void;
}
export const Column: React.FC<ColumnProps> = ({
  ticket,
  columnKey,
  onDragEnd,
  onClick,
}) => {
  const classes = useStyles();
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ticketId: ticket.id, fromColumnId: columnKey })
    );
  };
  return (
    <Card
      className={classes.cardRoot}
      variant="outlined"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{ borderLeft: `5px solid ${ticket.sector.color}` }}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h6">{ticket.title}</Typography>
          <Box my={1} style={{ paddingBottom: "5px" }}>
            <Typography variant="body2">
              {ticket.createdAt?.slice(0,10)}
            </Typography>
          </Box>
          <Chip
            label={ticket.sector.name}
            style={{ backgroundColor: ticket.sector.color, color: "#fff" }}
            size="small"
          />
        </CardContent>
      </div>
    </Card>
  );
};
