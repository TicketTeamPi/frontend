"use client";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import defaultTasks from "../../Tasks";
import type { BoardColumn, Ticket } from "src/types/type";
import { ColumnHeader } from "../components/ColumnHeader";
import { ColumnList } from "../components/ColumnList";
import { ColumnFooter } from "../components/ColumnFooter";
import { api } from "../utils/API";
import { TicketModal } from "../components/TicketModal";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "100%" },
  callWrap: {
    display: "flex",
    flex: "1 1 auto",
    flexWrap: "nowrap",
    overflowX: "auto",
    overflowY: "hidden",
    height: "93.6vh",
    scrollbarWidth: "thin",
  },
  boardCard: {
    width: 380,
    margin: "0 8px",
    flexShrink: 0,
    display: "flex",
    height: "99%",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: { width: 300 },
  },
  divider: { marginTop: theme.spacing(2) },
}));
export const TicketBoard: React.FC = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState<BoardColumn[]>(defaultTasks.data);
  useEffect(() => {
    setColumns(defaultTasks.data);
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string>("");
  const handleAddClick = (columnId: string) => {
    setActiveColumn(columnId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async (data: {
    title: string;
    description: string;
    status?: string;
    columnId?: string;
    sectorId?: string;
    eta?: string;
    position: number;
  }) => {
    try {
      await api.post("/tickets", data);
      console.log("Ticket criado:", data);
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
    }
    setModalOpen(false);
  };
  const handleTicketDrop = (
    ticketId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number
  ) => {
    setColumns((cols) => {
      // captura ticket movido antes de alterar qualquer coluna
      const sourceCol = cols.find((c) => c.id === fromColumnId);
      const movedTicket = sourceCol?.tickets.find((t) => t.id === ticketId);

      return cols.map((col) => {
        // mesmo coluna: apenas reordena
        if (col.id === fromColumnId && fromColumnId === toColumnId) {
          const newTickets = [...col.tickets];
          const oldIndex = newTickets.findIndex((t) => t.id === ticketId);
          if (oldIndex > -1) {
            const [removed] = newTickets.splice(oldIndex, 1);
            newTickets.splice(toIndex, 0, removed);
          }
          return { ...col, tickets: newTickets };
        }
        // coluna de origem: remove o ticket
        if (col.id === fromColumnId) {
          return {
            ...col,
            tickets: col.tickets.filter((t) => t.id !== ticketId),
          };
        }
        // coluna de destino: insere na posição desejada
        if (col.id === toColumnId && movedTicket) {
          const newTickets = [...col.tickets];
          newTickets.splice(toIndex, 0, movedTicket);
          return { ...col, tickets: newTickets };
        }
        return col;
      });
    });
  };
  return (
    <Grid container className={classes.root}>
      <Grid container wrap="nowrap" className={classes.callWrap}>
        {columns.map((col) => (
          <Paper key={col.id} elevation={1} className={classes.boardCard}>
            <ColumnHeader title={col.name} />
            <Divider />
            <ColumnList
              calls={col.tickets}
              onTicketDrop={handleTicketDrop}
              columnKey={col.id}
            />
            <Divider className={classes.divider} />
            <ColumnFooter onAdd={() => handleAddClick(col.id)} />{" "}
          </Paper>
        ))}
      </Grid>
      <TicketModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        columnId={activeColumn}
        position={
          columns.find((c) => c.id === activeColumn)?.tickets.length || 0
        }
      />
    </Grid>
  );
};
