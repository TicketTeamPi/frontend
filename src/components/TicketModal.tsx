import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  InputLabel,
} from "@material-ui/core";
import { Box, FormControl, MenuItem } from "@mui/material";
import { api } from "../utils/API";
import { useAppSelector } from "../store/hook";

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    sectorId: string;
    columnId?: string;
    position: number;
  }) => void;
  columnId: string;
  position: number;
}

interface Sector {
  id: string;
  name: string;
  color: string | null;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  open,
  onClose,
  onSubmit,
  columnId,
  position,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSectors] = useState<Sector[]>([]);
  const userRef = useAppSelector((state) => state.user)
  const [selectedSectorId, setSelectedSectorId] = useState<string>("");
  const isAdmin = useAppSelector((state) => state.user.isAdmin)

useEffect(() => {
   api.get<{ data: Sector[] }>("/sectors")
        .then((res) => setSectors(res.data.data))
        .catch(() => setSectors([]));
}, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      columnId,
      sectorId: isAdmin ? selectedSectorId : userRef.sector_id!,
      position,
    });
    setTitle("");
    setDescription("");
    onClose();
  };

    const user = useAppSelector((state) => state.user);


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Ticket</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            label="Título"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            fullWidth
            required
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            fullWidth
            multiline
            rows={3}
            style={{ marginTop: 16 }}
          />
          {(isAdmin || user.sector_id === '0197b7c1-dde3-7397-95bd-46b0174750ba') && (
            <Box mb={2}>
           <FormControl fullWidth>
              <InputLabel>Setor</InputLabel>
              <Select
                value={selectedSectorId}
                onChange={(e) =>
                  setSelectedSectorId(e.target.value as string)
                }
                label="Setor"
              >
                {sector.map((s) => (
                  <MenuItem key={s.id} value={s.id} >
                    {s.name} 
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">Cancelar</Button>
          <Button type="submit" color="primary" variant="contained">
            Criar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
