import React, { useEffect, useState } from "react";
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import type { BoardColumn, Ticket } from "src/types/type";
import { ColumnHeader } from "../components/ColumnHeader";
import { ColumnList } from "../components/ColumnList";
import { ColumnFooter } from "../components/ColumnFooter";
import { api } from "../utils/API";
import { TicketModal } from "../components/TicketModal";
import defaultTasks from "../../Tasks";

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
  const [columns, setColumns] = useState<BoardColumn[]>([defaultTasks]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string>("");

  // Carrega colunas com tickets embutidos
  const loadColumns = async () => {
    try {
      const res = await api.get<{ data: BoardColumn[] }>("/columns");
      setColumns(res.data.data);
    } catch (err) {
      console.error("Erro ao carregar colunas:", err);
    }
  };

  useEffect(() => {
    loadColumns();
  }, []);

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
      // inclui coluna atual no payload
      await api.post("/tickets", { ...data, columnId: activeColumn });
      await loadColumns();
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
    }
    setModalOpen(false);
  };

  const handleTicketDrop = async (
    ticketId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number
  ) => {
    // Atualiza localmente apenas para resposta visual imediata
    setColumns((cols) =>
      cols.map((col) => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            tickets: col.tickets.filter((t) => t.id !== ticketId),
          };
        }
        if (col.id === toColumnId) {
          const moved = columns
            .find((c) => c.id === fromColumnId)
            ?.tickets.find((t) => t.id === ticketId);
          const newTickets = moved
            ? [...col.tickets.filter((t) => t.id !== ticketId)]
            : col.tickets;
          if (moved) newTickets.splice(toIndex, 0, moved);
          return { ...col, tickets: newTickets };
        }
        return col;
      })
    );

    // Persiste no backend: atualiza columnId e posição
    try {
      await api.patch(`/tickets/${ticketId}`, {
        columnId: toColumnId,
        position: toIndex,
      });
      await loadColumns();
    } catch (err) {
      console.error("Erro ao atualizar ticket:", err);
    }
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
              columnKey={col.id}
              onTicketDrop={handleTicketDrop}
            />
            <Divider className={classes.divider} />
            <ColumnFooter onAdd={() => handleAddClick(col.id)} />
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
