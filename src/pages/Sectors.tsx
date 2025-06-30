import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { api } from "../utils/API";

interface Sector {
  id: string;
  name: string;
  description: string;
  color: string | null;
}

const Sectors: React.FC = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Sector | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#000000",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const currentUserJson = localStorage.getItem("currentUser");
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
  const isAdmin = currentUser?.isAdmin === 1;

  useEffect(() => {
    api
      .get<{ data: Sector[] }>("/sectors")
      .then((res) => setSectors(res.data.data))
      .catch((err) => setError(err.message || "Erro ao carregar setores"))
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    api
      .get<{ data: Sector[] }>("/sectors")
      .then((res) => setSectors(res.data.data));
  };

  const openCreateModal = () => {
    setEditing(null);
    setFormData({ name: "", description: "", color: "#000000" });
    setModalOpen(true);
  };

  const openEditModal = (sector: Sector) => {
    setEditing(sector);
    setFormData({
      name: sector.name,
      description: sector.description,
      color: sector.color ?? "#000000",
    });
    setModalOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await api.delete(`/sectors/change-status/${deleteTargetId}`);
      refresh();
    }
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      color: formData.color,
    };
    if (editing) {
      await api.put(`/sectors/${editing.id}`, payload);
    } else {
      await api.post(`/sectors`, payload);
    }
    refresh();
    setModalOpen(false);
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" style={{ padding: 16 }}>
          Setores
        </Typography>
        {
          <Button
            variant="contained"
            color="primary"
            onClick={openCreateModal}
            style={{ margin: 4 }}
          >
            + Novo Setor
          </Button>
        }
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Cor</TableCell>
              {/* isAdmin && */ <TableCell>Ações</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sectors.map((sec) => (
              <TableRow key={sec.id} hover>
                <TableCell>{sec.name}</TableCell>
                <TableCell>{sec.description}</TableCell>
                <TableCell>
                  <Box
                    style={{
                      backgroundColor: sec.color ?? "#000000",
                      height: "14px",
                      width: "14px",
                      borderRadius: 20,
                    }}
                  />
                </TableCell>
                {
                  /* isAdmin && */ <TableCell>
                    <Button size="small" onClick={() => openEditModal(sec)}>
                      Editar
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => openDeleteDialog(sec.id)}
                      style={{ marginLeft: 8 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>Deseja realmente deletar este setor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de criação/edição */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editing ? "Editar Setor" : "Novo Setor"}</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Descrição"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Cor"
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editing ? "Salvar" : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sectors;
