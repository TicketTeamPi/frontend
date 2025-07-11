import React, { useEffect, useState } from "react";
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import type { BoardColumn, Ticket } from "src/types/type";
import { ColumnHeader } from "../components/ColumnHeader";
import { ColumnList } from "../components/ColumnList";
import { ColumnFooter } from "../components/ColumnFooter";
import { api } from "../utils/API";
import { TicketModal } from "../components/TicketModal";
import { TicketDetailModal } from "../components/TicketDetailModel";
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "100%", scrollbarWidth: "thin", },
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
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [columns, setColumns] = useState<BoardColumn[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string>("");
  const [addingColumn, setAddingColumn] = useState(true);
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) return;
    try {
      await api.post("/columns", { name: newColumnName });
      setNewColumnName("");
      setAddingColumn(false);
      await loadColumns();
    } catch (err) {
      console.error("Erro ao criar coluna:", err);
    }
  };

  const loadColumns = async () => {
    try {
      const res = await api.get<{ data: BoardColumn[] }>("/columns");
      // Ordena os tickets de cada coluna pelo campo position
      const orderedColumns = res.data.data.map((col) => ({
        ...col,
        tickets: [...col.tickets].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
      }));
      setColumns(orderedColumns);
    } catch (err) {
      console.error("Erro ao carregar colunas:", err);
    }
  };

  useEffect(() => {
    api.get<{ data: BoardColumn[] }>("/columns").then((res) => {
      const orderedColumns = res.data.data.map((col) => ({
        ...col,
        tickets: [...col.tickets].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
      }));
      setColumns(orderedColumns);
    });
  }, []);

  const handleTicketClick = async (ticketId: string) => {
    try {
      const res = await api.get(`/tickets/${ticketId}`);
      setSelectedTicket(res.data);
      setDetailModalOpen(true);
    } catch (err) {
      console.error("Erro ao buscar detalhes do ticket:", err);
    }
  };

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
    setColumns((cols) =>
      cols.map((col) => {
        // Movendo dentro da mesma coluna
        if (col.id === fromColumnId && col.id === toColumnId) {
          const oldIndex = col.tickets.findIndex((t) => t.id === ticketId);
          if (oldIndex === -1) return col;
          const updatedTickets = [...col.tickets];
          const [movedTicket] = updatedTickets.splice(oldIndex, 1);
          // Se mover para baixo, o array já está menor, então ajusta o índice
          let insertAt = toIndex;
          if (oldIndex < toIndex) insertAt = toIndex;
          updatedTickets.splice(insertAt, 0, movedTicket);
          // Atualiza as posições
          const ticketsWithPosition = updatedTickets.map((t, idx) => ({
            ...t,
            position: idx,
          }));
          return { ...col, tickets: ticketsWithPosition };
        }
        // Remover da coluna de origem
        if (col.id === fromColumnId) {
          return {
            ...col,
            tickets: col.tickets.filter((t) => t.id !== ticketId).map((t, idx) => ({
              ...t,
              position: idx,
            })),
          };
        }
        // Adicionar na coluna de destino
        if (col.id === toColumnId) {
          // Busca o ticket movido na coluna de origem
          const moved = cols
            .find((c) => c.id === fromColumnId)
            ?.tickets.find((t) => t.id === ticketId);
          if (!moved) return col;
          const newTickets = [...col.tickets];
          newTickets.splice(toIndex, 0, moved);
          // Atualiza as posições
          const ticketsWithPosition = newTickets.map((t, idx) => ({
            ...t,
            position: idx,
          }));
          return { ...col, tickets: ticketsWithPosition };
        }
        return col;
      })
    );

    try {
      await api.put(`/columns/reorganize`, {
        columnIdFrom: fromColumnId,
        columnIdTo: toColumnId === fromColumnId ? null : toColumnId,
        ticketId: ticketId,
        position: toIndex,
      });
      await loadColumns();
    } catch (err) {
      console.error("Erro ao atualizar ticket:", err);
    }
  };

  return (
    <Grid container>
      <Grid container wrap="nowrap" className={classes.callWrap}>
        {columns.map((col) => (
          <Paper key={col.id} elevation={1} className={classes.boardCard}>
            <ColumnHeader title={col.name} id={col.id} onUpdate={loadColumns} />
            <Divider />
            <ColumnList
              calls={col.tickets}
              columnKey={col.id}
              onTicketDrop={handleTicketDrop}
              onTicketClick={handleTicketClick}
            />
            <Divider className={classes.divider} />
            <ColumnFooter onAdd={() => handleAddClick(col.id)} />
          </Paper>
        ))}
      </Grid>
      <Paper
        elevation={3}
        style={{
          minWidth: 250,
          maxWidth: 300,
          margin: "0 8px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)", // leve sombreado
          height: 80,
        }}
      >
        {!addingColumn ? (
          <Button
            startIcon={<AddIcon />}
            onClick={() => setAddingColumn(true)}
            style={{
              color: "#111",
              fontWeight: 500,
              background: "rgba(0,0,0,0.03)",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
              borderRadius: 8,
              padding: "10px 16px",
              textTransform: "none",
            }}
            fullWidth
          >
            Adicionar outra lista
          </Button>
        ) : (
          <Box display="flex" alignItems="center" width="100%" px={2}>
            <TextField
              value={newColumnName}
              onChange={e => setNewColumnName(e.target.value)}
              placeholder="Nome da lista..."
              size="small"
              variant="outlined"
              autoFocus
              style={{ background: "#fff", flex: 1 }}
              InputProps={{
                style: { color: "#111" }
              }}
              onKeyDown={e => {
                if (e.key === "Enter") handleAddColumn();
              }}
            />
            <Button
              onClick={handleAddColumn}
              color="primary"
              variant="contained"
              style={{ marginLeft: 8, minWidth: 40, minHeight: 40 }}
            >
              <AddIcon />
            </Button>
            <Button
              onClick={() => {
                setAddingColumn(false);
                setNewColumnName("");
              }}
              style={{ marginLeft: 4, minWidth: 40, minHeight: 40 }}
            >
              X
            </Button>
          </Box>
        )}
      </Paper>
      <TicketModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        columnId={activeColumn}
        position={
          columns.find((c) => c.id === activeColumn)?.tickets.length || 0
        }
      />
      <TicketDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        ticket={selectedTicket}
        onUpdate={loadColumns}
      />
    </Grid>

  );
};
