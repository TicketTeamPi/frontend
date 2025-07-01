import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import type { Ticket } from "../types/type";
import { api } from "../utils/API";
import { useAppSelector } from "../store/hook";

interface TicketDetailModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onUpdate?: () => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  open,
  onClose,
  ticket,
  onUpdate,
}) => {
  const user = useAppSelector((state) => state.user);
  const sector_id = user.sector_id

  if (!ticket) return null;

  const handleOnClick = () => {
    if (!ticket.responsibleId) {
      api.put(`/tickets/${ticket.id}/responsible`).then((res) => {
        if (res.status === 204) {
          onClose();
          return;
        }
      });
    } else {
      api.patch(`/ticket/getOutTicket/${ticket.id}`).then((res) => {
        if (res.status === 204) {
          onClose();
          return;
        }
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.patch(`/tickets/change-status/${ticket.id}`);
      onClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Erro ao deletar ticket:", err);
    }
  };

  const isCreator = user.id === ticket.createdBy;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalhes do Ticket</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          {ticket.title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">
            <strong>Prioridade:</strong> {ticket.priority || "Não definida"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Membro:</strong> {ticket.responsibleName || "Não definido"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Aberto por:</strong> {ticket.userCreator}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Setor:</Typography>
          <Chip
            label={ticket.sector?.name || "Sem setor"}
            style={{
              backgroundColor: ticket.sector?.color || "#ccc",
              color: "#fff",
              marginTop: 4,
            }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" gutterBottom>
          Descrição:
        </Typography>
        <Typography variant="body1">
          {ticket.description || "Sem descrição"}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
  {(isCreator || user.sector_id === '0197b7c1-dde3-7397-95bd-46b0174750ba') && (
    <Button
      className="primary-button"
      color="error"
      onClick={handleDelete}
      variant="contained"
      sx={{ mr: "auto" }}
    >
      Excluir
    </Button>
  )}
  <Box>
    <Button onClick={onClose} variant="outlined" className="primary-button">
      Cancelar
    </Button>
    {(user.sector_id === ticket.sector.id || user.sector_id === '0197b7c1-dde3-7397-95bd-46b0174750ba') && (
      <Button
        onClick={handleOnClick}
        color="primary"
        variant="contained"
        sx={{ ml: 1 }}
      >
        {ticket.responsibleId != null ? "Sair" : "Ingressar"}
      </Button>
    )}
  </Box>
</DialogActions>
    </Dialog>
  );
};